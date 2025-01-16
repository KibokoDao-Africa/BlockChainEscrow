// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Importing dependencies for role-based access control and external milestone verification.
import "./RoleManagement.sol";
import "./GitHubOracle.sol";

/**
 * @title Escrow
 * @dev A smart contract for managing projects with milestone-based payments.
 *      Integrates role management and GitHub Oracle for test verification.
 */
contract Escrow {
    // Instance of RoleManagement contract to manage roles.
    RoleManagement public roleManager;

    // Instance of GitHubOracle contract for verifying milestone completion.
    GitHubOracle public gitHubOracle;

    // Struct to represent a single milestone in a project.
    struct Milestone {
        uint256 amount;        // Amount allocated to the milestone.
        bool isCompleted;      // Status of completion.
        bool isApproved;       // Status of approval by the project owner.
        bool isPassed;  
        bool isFailed;       // status for passed or failed test result from github oracle 
    }
    // Struct to represent a project with multiple milestones.
    struct Project {
        address owner;         // Address of the project owner.
        address developer;     // Address of the developer.
        uint256 balance;       // Funds currently held in escrow for the project.
        Milestone[] milestones;// List of milestones for the project.
        bool isActive;         // Whether the project is active.
    }

    // Mapping of project IDs to their details.
    mapping(uint256 => Project) public projects;

    // Counter to keep track of the number of projects.
    uint256 public projectCount;

    // Events for logging key actions in the contract.
    event ProjectCreated(uint256 projectId, address owner, address developer);
    event MilestoneUpdated(uint256 projectId, uint256 milestoneId, bool isCompleted);
    event FundsReleased(uint256 projectId, uint256 milestoneId);

    /**
     * @dev Constructor to initialize the contract with RoleManagement and GitHubOracle contracts.
     * @param roleManagerAddress Address of the RoleManagement contract.
     * @param gitHubOracleAddress Address of the GitHubOracle contract.
     */
    constructor(address roleManagerAddress, address gitHubOracleAddress) {
        roleManager = RoleManagement(roleManagerAddress);
        gitHubOracle = GitHubOracle(gitHubOracleAddress);
    }

    // Modifier to restrict access to the project owner.
    modifier onlyOwner(uint256 projectId) {
        require(projects[projectId].owner == msg.sender, "Not project owner");
        _;
    }

    // Modifier to restrict access to the assigned developer of a project.
    modifier onlyDeveloper(uint256 projectId) {
        require(projects[projectId].developer == msg.sender, "Not project developer");
        _;
    }

    /**
     * @dev Allows a user to create a new project with specified milestones and deposit funds.
     * @param developer Address of the developer assigned to the project.
     * @param milestoneAmounts Array of milestone amounts.
     */
    function createProject(address developer, uint256[] memory milestoneAmounts) external payable {
        require(roleManager.isUser(msg.sender), "Not a registered user");
        require(roleManager.isDeveloper(developer), "Not a registered developer");
        require(milestoneAmounts.length > 0, "No milestones provided");

        // Calculate the total milestone amount and verify the deposit.
        uint256 totalAmount;
        for (uint256 i = 0; i < milestoneAmounts.length; i++) {
            totalAmount += milestoneAmounts[i];
        }
        require(msg.value == totalAmount, "Incorrect fund deposit");

        // Increment project count and create a new project.
        projectCount++;
        Project storage project = projects[projectCount];
        project.owner = msg.sender;
        project.developer = developer;
        project.balance = msg.value;
        project.isActive = true;

        // Initialize milestones for the project.
        for (uint256 i = 0; i < milestoneAmounts.length; i++) {
            project.milestones.push(Milestone(milestoneAmounts[i], false, false, false, false));
        }

        // Emit an event for project creation.
        emit ProjectCreated(projectCount, msg.sender, developer);
    }

     function compareStrings(string memory a, string memory b) internal returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    /**
     * @dev Verifies a milestone's completion using GitHubOracle test results.
     * @param projectId ID of the project.
     * @param milestoneId ID of the milestone to verify.
     */
      function verifyMilestone(uint256 projectId, uint256 milestoneId) external {
        require(projects[projectId].isActive, "Project is not active");

        // Retrieve test results from GitHubOracle.
        string memory result = gitHubOracle.getTestResult(projectId);
            
        Milestone storage milestone = projects[projectId].milestones[milestoneId];
        require(!milestone.isCompleted, "Milestone already completed");
            
        if (compareStrings(result, "passed")) {
            // Mark a milestone as passed.
            milestone.isPassed = true;
        } else { 
            milestone.isFailed=  true;  
        }

        emit MilestoneUpdated(projectId, milestoneId, false);
        }

    /**
     * @dev Approves a completed milestone and releases funds to the developer.
     * @param projectId ID of the project.
     * @param milestoneId ID of the milestone to approve.
     */
    function approveMilestone(uint256 projectId, uint256 milestoneId) external onlyOwner(projectId) {
        Milestone storage milestone = projects[projectId].milestones[milestoneId];
        require(milestone.isCompleted, "Milestone not completed");
        require(!milestone.isApproved, "Milestone already approved");

        // Mark the milestone as approved and transfer funds to the developer.
        milestone.isApproved = true;
        projects[projectId].balance -= milestone.amount;
        payable(projects[projectId].developer).transfer(milestone.amount);

        // Emit an event for fund release.
        emit FundsReleased(projectId, milestoneId);
    }
}
