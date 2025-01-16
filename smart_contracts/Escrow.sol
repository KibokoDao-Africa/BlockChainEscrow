// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./RoleManagement.sol";
import "./GitHubOracle.sol";

contract Escrow {
    RoleManagement public roleManager;
    GitHubOracle public gitHubOracle;

    struct Milestone {
        uint256 amount;
        bool isCompleted;
        bool isApproved;
    }

    struct Project {
        address owner;
        address developer;
        uint256 balance;
        Milestone[] milestones;
        bool isActive;
    }

    mapping(uint256 => Project) public projects;
    uint256 public projectCount;

    event ProjectCreated(uint256 projectId, address owner, address developer);
    event MilestoneUpdated(uint256 projectId, uint256 milestoneId, bool isCompleted);
    event FundsReleased(uint256 projectId, uint256 milestoneId);

    constructor(address roleManagerAddress, address gitHubOracleAddress) {
        roleManager = RoleManagement(roleManagerAddress);
        gitHubOracle = GitHubOracle(gitHubOracleAddress);
    }

    modifier onlyOwner(uint256 projectId) {
        require(projects[projectId].owner == msg.sender, "Not project owner");
        _;
    }

    modifier onlyDeveloper(uint256 projectId) {
        require(projects[projectId].developer == msg.sender, "Not project developer");
        _;
    }

    function createProject(address developer, uint256[] memory milestoneAmounts) external payable {
        require(roleManager.isUser(msg.sender), "Not a registered user");
        require(roleManager.isDeveloper(developer), "Not a registered developer");
        require(milestoneAmounts.length > 0, "No milestones provided");

        uint256 totalAmount;
        for (uint256 i = 0; i < milestoneAmounts.length; i++) {
            totalAmount += milestoneAmounts[i];
        }
        require(msg.value == totalAmount, "Incorrect fund deposit");

        projectCount++;
        Project storage project = projects[projectCount];
        project.owner = msg.sender;
        project.developer = developer;
        project.balance = msg.value;
        project.isActive = true;

        for (uint256 i = 0; i < milestoneAmounts.length; i++) {
            project.milestones.push(Milestone(milestoneAmounts[i], false, false));
        }

        emit ProjectCreated(projectCount, msg.sender, developer);
    }

   function verifyMilestone(uint256 projectId, uint256 milestoneId) external {
    require(projects[projectId].isActive, "Project is not active");

    string memory testResult = gitHubOracle.getTestResult(projectId);
    
    // logic to interpret the test result and update milestone status
    Milestone storage milestone = projects[projectId].milestones[milestoneId];
    require(!milestone.isCompleted, "Milestone already completed");
    
    if (keccak256(abi.encode(testResult)) == keccak256("passed")) {
        milestone.isCompleted = true;
    } else {
       
    }
    
    emit MilestoneUpdated(projectId, milestoneId, milestone.isCompleted);
}

    function approveMilestone(uint256 projectId, uint256 milestoneId) external onlyOwner(projectId) {
        Milestone storage milestone = projects[projectId].milestones[milestoneId];
        require(milestone.isCompleted, "Milestone not completed");
        require(!milestone.isApproved, "Milestone already approved");

        milestone.isApproved = true;
        projects[projectId].balance -= milestone.amount;
        payable(projects[projectId].developer).transfer(milestone.amount);

        emit FundsReleased(projectId, milestoneId);
    }
}
