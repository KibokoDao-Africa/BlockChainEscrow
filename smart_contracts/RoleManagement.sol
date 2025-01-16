// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title RoleManagement
/// @notice This contract is used for managing roles (users and developers) within the system.
/// @dev It includes functionality for role assignment and verification, with restricted access for the admin.
contract RoleManagement {
    /// @notice Address of the contract administrator.
    address public admin;

    /// @notice Mapping to track registered users.
    mapping(address => bool) public users;

    /// @notice Mapping to track registered developers.
    mapping(address => bool) public developers;

    /// @notice Event emitted when a new user is registered.
    /// @param user Address of the registered user.
    event UserRegistered(address user);

    /// @notice Event emitted when a new developer is registered.
    /// @param developer Address of the registered developer.
    event DeveloperRegistered(address developer);

    /// @dev Ensures that only the admin can call certain functions.
    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    /// @notice Initializes the contract and sets the deployer as the admin.
    constructor() {
        admin = msg.sender;
    }

    /// @notice Registers a user in the system.
    /// @dev This function can only be called by the admin.
    /// @param user Address of the user to register.
    function registerUser(address user) external onlyAdmin {
        users[user] = true;
        emit UserRegistered(user);
    }

    /// @notice Registers a developer in the system.
    /// @dev This function can only be called by the admin.
    /// @param developer Address of the developer to register.
    function registerDeveloper(address developer) external onlyAdmin {
        developers[developer] = true;
        emit DeveloperRegistered(developer);
    }

    /// @notice Checks if an address is a registered user.
    /// @param user Address to check.
    /// @return True if the address is a registered user, otherwise false.
    function isUser(address user) external view returns (bool) {
        return users[user];
    }

    /// @notice Checks if an address is a registered developer.
    /// @param developer Address to check.
    /// @return True if the address is a registered developer, otherwise false.
    function isDeveloper(address developer) external view returns (bool) {
        return developers[developer];
    }
}
