// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.6.0 <0.9.0;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
contract JoinAirdrop is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _userIds;
    address payable owner;
    uint256 price = 1 ether;

    //Set the owner on contract start
    constructor(){
        owner = payable(msg.sender);
    }
    mapping(uint256 => address )  users;


    event SomeoneJoined(address user, uint256 amount);

    function join() public payable nonReentrant {
        require(msg.value == price, "amount must be equal to 1 ether");

    _userIds.increment();
        uint256 userId = _userIds.current();
        users[userId] = msg.sender;

        payable(owner).transfer(price);

        emit SomeoneJoined(msg.sender, msg.value);
    }

    function AccountBalance()public  view returns(uint256 balance){
        require(msg.sender == owner, "Only the owner is allowed");

        return owner.balance;
    }
}