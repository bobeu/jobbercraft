// SPDX-License-Identifier: Unlicense

pragma solidity  0.8.24;

import "./ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/** HiWork Probationary Membership Token
    @author : Bobeu
            Github: https://github.com/bobeu
*/
contract Probation is Ownable, ERC721Pausable {
  error HPMZeroAddress(address);
  
  /**
    @dev Enforces that @param target - must not be empty
          address.
   */
  modifier notZeroAddress(address target) {
    if(target == address(0)) revert HPMZeroAddress(target);
    _;
  }

  //Initialize state vars
  constructor (address factory) ERC721("HiWork Probation Member", "HPM") {
    transferOwnership(factory);
    // _pause();
  }

  /**
    Fallback: Alternative/Inplicit method of minting HPM
   */
  receive() external payable {
    revert();
  }

  /**
    @notice Mint HiWork Probationary Membership NFT
           Owner's privilege.
            o 'TokenId' must not have been approved before now.
              o No user can have more than one approved membership NFT.
   */
  function mint(address to, uint256 tokenId) public onlyOwner returns(bool) {
    _safeMint(to, tokenId);
    _approve(_msgSender(), tokenId);

    return true;
  }

  ///@dev Burns 'tokenId' Note - Owner's privilege
  function burn(uint tokenId) external onlyOwner returns(bool) {
    // address who = ownerOf(tokenId);
    // isMember[who] = false;
    _burn(tokenId);

    return true;
  } 

  /** See ERC721 _transfer. HPM is not transferable*/
  function _transfer(address from, address to, uint256 tokenId ) internal override
  {
    require(paused(), "Not allowed");
    super._transfer(from, to, tokenId);
  }


  /** @dev Halts contract execution */
  function pause() public onlyOwner 
  {
    _pause();
  }

  /** @dev Continues contract execution */
  function unpause() public onlyOwner 
  {
    _unpause();
  }

  function onERC721Received(
      address operator,
      address from,
      uint256 tokenId,
      bytes calldata data
  ) external override returns (bytes4) {}
}