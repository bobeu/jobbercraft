// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestUSDT is ERC20 {

  constructor(address[] memory testAddrs) ERC20('TestUSDT', 'TESTUSD') {
    /**
     * For testing purposes
     */
    for (uint i = 0; i < testAddrs.length; i++) {
      _mint(testAddrs[i], 10000*(10**18));
    }
  }

  function mint(address to, uint amount) public {
    _mint(to, amount);
  }
} 