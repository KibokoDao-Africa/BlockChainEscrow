// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title GitHubOracle
/// @notice This contract acts as an off-chain oracle for receiving and storing test results 
///         for projects deployed in a blockchain environment. The test results are mapped 
///         to specific project IDs and can be queried by other smart contracts.
/// @dev Designed to be used in conjunction with other smart contracts such as Escrow.

contract GitHubOracle {
    /// @notice Address of the admin authorized to fulfill oracle requests.
    address public admin;

    /// @notice Mapping of project IDs to their corresponding test results.
    mapping(uint256 => string) public testResults;

    /// @notice Event emitted when a new test result is received for a project.
    /// @param projectId The ID of the project for which the test result is provided.
    /// @param result The test result associated with the project.
    event TestResultReceived(uint256 projectId, string result);

    /// @dev Ensures that only the admin can execute specific functions.
    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    /// @notice Initializes the contract and sets the deployer as the admin.
    constructor() {
        admin = msg.sender;
    }

    /// @notice Allows the admin to provide test results for a specific project.
    /// @dev This function can only be called by the admin.
    /// @param projectId The ID of the project for which the test result is being submitted.
    /// @param result The test result string to be stored for the project.
    function fulfill(uint256 projectId, string calldata result) external onlyAdmin {
        // Store the test result for the specified project ID.
        testResults[projectId] = result;

        // Emit an event to notify other systems that a test result has been received.
        emit TestResultReceived(projectId, result);
    }

    /// @notice Retrieves the test result for a given project.
    /// @param projectId The ID of the project for which the test result is requested.
    /// @return The test result string associated with the project ID.
    function getTestResult(uint256 projectId) external view returns (string memory) {
        return testResults[projectId];
    }
}
