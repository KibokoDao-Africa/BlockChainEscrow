// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GitHubOracle {
    address public admin;
    mapping(uint256 => string) public testResults;

    event TestResultReceived(uint256 projectId, string result);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function fulfill(uint256 projectId, string calldata result) external onlyAdmin {
        testResults[projectId] = result;
        emit TestResultReceived(projectId, result);
    }

    function getTestResult(uint256 projectId) external view returns (string memory) {
        return testResults[projectId];
    }
}
