// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract RoleManagement {
    address public admin;

    mapping(address => bool) public users;
    mapping(address => bool) public developers;

    event UserRegistered(address user);
    event DeveloperRegistered(address developer);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerUser(address user) external onlyAdmin {
        users[user] = true;
        emit UserRegistered(user);
    }

    function registerDeveloper(address developer) external onlyAdmin {
        developers[developer] = true;
        emit DeveloperRegistered(developer);
    }

    function isUser(address user) external view returns (bool) {
        return users[user];
    }

    function isDeveloper(address developer) external view returns (bool) {
        return developers[developer];
    }
}
