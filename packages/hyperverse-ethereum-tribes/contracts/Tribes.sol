//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./hyperverse/IHyperverseModule.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Tribes is IHyperverseModule {
    using Counters for Counters.Counter;

    address public owner;
    Counters.Counter public tenantCount;

    struct Tenant {
        mapping(uint256 => TribeData) tribes;
        mapping(address => uint256) participants;
        Counters.Counter tribeIds;
    }

    struct TribeData {
        string metadata;
        mapping(address => bool) members;
        uint256 numOfMembers;
        uint256 tribeId;
    }

    mapping(address => Tenant) public tenants;
    mapping(address => bool) public instance;

    modifier hasAnInstance(address tenant) {
        require(instance[tenant], "Tenant does not have an instance");
        _;
    }

    event NewTenantInstance(address tenant);
    event JoinedTribe(uint256 tribeId, address newMember);
    event LeftTribe(uint256 tribeId, address member);
    event NewTribeCreated(string metadata);

    constructor() {
        metadata = ModuleMetadata(
            "Tribes",
            Author(msg.sender, "https://externallink.net"),
            "0.0.1",
            3479831479814,
            "https://externalLink.net"
        );
        owner = msg.sender;
    }

    function createInstance() public virtual {
        require(instance[msg.sender] == false, "You already have an instance");
        tenants[msg.sender];
        instance[msg.sender] = true;
        tenantCount.increment();
        emit NewTenantInstance(msg.sender);
    }

    function getState(address tenant) private view hasAnInstance(tenant) returns (Tenant storage) {
        return tenants[tenant];
    }

    function addNewTribe(string memory metadata) public virtual hasAnInstance(msg.sender) {
        Tenant storage state = getState(msg.sender);

        state.tribeIds.increment();
        uint256 newTribeId = state.tribeIds.current();

        TribeData storage newTribe = state.tribes[newTribeId];
        newTribe.metadata = metadata;
        newTribe.tribeId = newTribeId;
        emit NewTribeCreated(metadata);
    }

    function joinTribe(address tenant, uint256 tribeId) public virtual {
        address user = msg.sender;
        Tenant storage state = getState(tenant);
        require(state.participants[user] == 0, "User is already in a Tribe!");
        require(state.tribeIds.current() >= tribeId, "Tribe does not exist");

        state.participants[user] = tribeId;
        TribeData storage tribeData = state.tribes[tribeId];
        tribeData.members[user] = true;
        tribeData.numOfMembers += 1;

        emit JoinedTribe(tribeId, user);
    }

    function leaveTribe(address tenant) public virtual {
        address user = msg.sender;
        Tenant storage state = getState(tenant);
        require(state.participants[user] != 0, "This member is not in a Tribe!");

        TribeData storage tribeData = state.tribes[state.participants[user]];
        uint256 tribeId = state.participants[user];
        state.participants[user] = 0;
        tribeData.members[user] = false;
        tribeData.numOfMembers -= 1;

        emit LeftTribe(tribeId, user);
    }

    function getUserTribe(address tenant, address user) public view virtual returns (uint256) {
        Tenant storage state = getState(tenant);

        require(state.participants[user] != 0, "This member is not in a Tribe!");

        uint256 tribeId = state.participants[user];
        return tribeId;
    }

    function getTribeData(address tenant, uint256 tribeId) public view virtual returns (string memory) {
        Tenant storage state = getState(tenant);
        TribeData storage tribeData = state.tribes[tribeId];
        return (tribeData.metadata);
    }

    function totalTribes(address tenant) public view virtual returns (uint256) {
        return getState(tenant).tribeIds.current();
    }
}
