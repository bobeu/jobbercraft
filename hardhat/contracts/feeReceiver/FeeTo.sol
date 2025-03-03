// SPDX-License-Identifier: MIT 

pragma solidity 0.8.24;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract FeeTo is Ownable{

  constructor() Ownable() {}

  receive() external payable {}

  function withdraw(address to, uint amount) public onlyOwner returns(bool _return) {
    // require(owner != address(0) && msg.sender == owner, "Only owner");
    // require(IERC20(cUSD).transfer(to, amount), "Transfer failed");
    uint nBalance = address(this).balance;
    if(nBalance > amount) {
      (bool success,) = to.call{value: amount}('');
      _return = success;
    }
  }
}