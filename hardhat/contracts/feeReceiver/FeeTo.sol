// SPDX-License-Identifier: MIT 

pragma solidity 0.8.24;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract FeeTo is Ownable{

  constructor() Ownable() {}

  receive() external payable {}

  function withdraw(address to, uint amount) public onlyOwner returns(bool _return) {
    uint nBalance = address(this).balance;
    if(nBalance > amount) {
      (bool success,) = to.call{value: amount}('');
      _return = success;
    }
  }
}