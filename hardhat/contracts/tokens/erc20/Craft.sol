/** SPDX-License-Identifier: Unlicense
 Compiled using solc: 0.8.15+commit.e14f2714.Emscripten.clang 
*/
pragma solidity 0.8.24;

import "./ERC20Burnable.sol";
import "../../utils/Lib.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Craft is Ownable, ERC20Burnable, Pausable {
  using Lib for *;

  //Maximum supply
  uint256 public maxSupply;

  constructor(address factory) ERC20("Craft Token", "CRAFT", factory) {
    require(factory != address(0), "Req. factory");
    uint mantissa = 10 ** decimals();
    maxSupply = 100_000_000 * mantissa;
    super._mint(_msgSender(), 50_000_000 * mantissa);
    super._mint(factory, 10_000_000 * mantissa);
  }

  /**@dev mints WORk Token of an 'amount' to 'account' 
   * o Can only mint if totalSupply plus the amount to mint is less than maxSupply
   *    - If caller is not expected owner, then it must be the factory account calling.
   *    - If caller is the owner account, then we allow to mint.
   *    - We check if the contract is not paused to execute the 'mint' instruction.
  */
  function mint(address account, uint256 amount) external returns(bool _ret) {
    if(totalSupply() + amount <= maxSupply) {
      uint actual = 0;
      if(_msgSender() != owner()) {
        require(_msgSender() == _factory, "Not allowed");
        actual = amount;
      }
      if(_msgSender() == owner()) actual = amount;
      if(!paused()){
        super._mint(account, actual);
        _ret = true;
      }
    }
  }

  ///@dev Reset factory contract
  function updateFactory(address newFactory) public onlyOwner {
    _resetFactory(newFactory);
  }

}