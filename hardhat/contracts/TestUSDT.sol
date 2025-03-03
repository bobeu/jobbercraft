// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestUSDT is ERC20 {

  constructor() ERC20('TestUSDT', 'TESTUSD') {}

  function mint(address to, uint amount) public {
    _mint(to, amount);
  }
} 