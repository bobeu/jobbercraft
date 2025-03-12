// SPDX-License-Identifier: MIT 

pragma solidity 0.8.24;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
    }
}

/**
 * @dev Interface of the ERC165 standard, as defined in the
 * https://eips.ethereum.org/EIPS/eip-165[EIP].
 *
 * Implementers can declare support of contract interfaces, which can then be
 * queried by others ({ERC165Checker}).
 *
 * For an implementation, see {ERC165}.
 */
interface IERC165 {
    /**
     * @dev Returns true if this contract implements the interface defined by
     * `interfaceId`. See the corresponding
     * https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]
     * to learn more about how these ids are created.
     *
     * This function call must use less than 30 000 gas.
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

/**
 * @dev Required interface of an ERC721 compliant contract.
 */
interface IERC721 is IERC165 {
    /**
     * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
     */
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
     */
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
     */
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view returns (uint256 balance);

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view returns (address owner);

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must have been allowed to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(address from, address to, uint256 tokenId) external;

    /**
     * @dev Transfers `tokenId` token from `from` to `to`.
     *
     * WARNING: Note that the caller is responsible to confirm that the recipient is capable of receiving ERC721
     * or else they may be permanently lost. Usage of {safeTransferFrom} prevents loss, though the caller must
     * understand this adds an external call which potentially creates a reentrancy vulnerability.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address from, address to, uint256 tokenId) external;

    /**
     * @dev Gives permission to `to` to transfer `tokenId` token to another account.
     * The approval is cleared when the token is transferred.
     *
     * Only a single account can be approved at a time, so approving the zero address clears previous approvals.
     *
     * Requirements:
     *
     * - The caller must own the token or be an approved operator.
     * - `tokenId` must exist.
     *
     * Emits an {Approval} event.
     */
    function approve(address to, uint256 tokenId) external;

    /**
     * @dev Approve or remove `operator` as an operator for the caller.
     * Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller.
     *
     * Requirements:
     *
     * - The `operator` cannot be the caller.
     *
     * Emits an {ApprovalForAll} event.
     */
    function setApprovalForAll(address operator, bool approved) external;

    /**
     * @dev Returns the account approved for `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function getApproved(uint256 tokenId) external view returns (address operator);

    /**
     * @dev Returns if the `operator` is allowed to manage all of the assets of `owner`.
     *
     * See {setApprovalForAll}
     */
    function isApprovedForAll(address owner, address operator) external view returns (bool);
} 

/**
 * @dev Standard signed math utilities missing in the Solidity language.
 */
library SignedMath {
    /**
     * @dev Returns the largest of two signed numbers.
     */
    function max(int256 a, int256 b) internal pure returns (int256) {
        return a > b ? a : b;
    }

    /**
     * @dev Returns the smallest of two signed numbers.
     */
    function min(int256 a, int256 b) internal pure returns (int256) {
        return a < b ? a : b;
    }

    /**
     * @dev Returns the average of two signed numbers without overflow.
     * The result is rounded towards zero.
     */
    function average(int256 a, int256 b) internal pure returns (int256) {
        // Formula from the book "Hacker's Delight"
        int256 x = (a & b) + ((a ^ b) >> 1);
        return x + (int256(uint256(x) >> 255) & (a ^ b));
    }

    /**
     * @dev Returns the absolute unsigned value of a signed value.
     */
    function abs(int256 n) internal pure returns (uint256) {
        unchecked {
            // must be unchecked in order to support `n = type(int256).min`
            return uint256(n >= 0 ? n : -n);
        }
    }
}

/**
 * @dev Standard math utilities missing in the Solidity language.
 */
library Math {
    enum Rounding {
        Down, // Toward negative infinity
        Up, // Toward infinity
        Zero // Toward zero
    }

    /**
     * @dev Returns the largest of two numbers.
     */
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a : b;
    }

    /**
     * @dev Returns the smallest of two numbers.
     */
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    /**
     * @dev Returns the average of two numbers. The result is rounded towards
     * zero.
     */
    function average(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b) / 2 can overflow.
        return (a & b) + (a ^ b) / 2;
    }

    /**
     * @dev Returns the ceiling of the division of two numbers.
     *
     * This differs from standard division with `/` in that it rounds up instead
     * of rounding down.
     */
    function ceilDiv(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b - 1) / b can overflow on addition, so we distribute.
        return a == 0 ? 0 : (a - 1) / b + 1;
    }

    /**
     * @notice Calculates floor(x * y / denominator) with full precision. Throws if result overflows a uint256 or denominator == 0
     * @dev Original credit to Remco Bloemen under MIT license (https://xn--2-umb.com/21/muldiv)
     * with further edits by Uniswap Labs also under MIT license.
     */
    function mulDiv(uint256 x, uint256 y, uint256 denominator) internal pure returns (uint256 result) {
        unchecked {
            // 512-bit multiply [prod1 prod0] = x * y. Compute the product mod 2^256 and mod 2^256 - 1, then use
            // use the Chinese Remainder Theorem to reconstruct the 512 bit result. The result is stored in two 256
            // variables such that product = prod1 * 2^256 + prod0.
            uint256 prod0; // Least significant 256 bits of the product
            uint256 prod1; // Most significant 256 bits of the product
            assembly {
                let mm := mulmod(x, y, not(0))
                prod0 := mul(x, y)
                prod1 := sub(sub(mm, prod0), lt(mm, prod0))
            }

            // Handle non-overflow cases, 256 by 256 division.
            if (prod1 == 0) {
                // Solidity will revert if denominator == 0, unlike the div opcode on its own.
                // The surrounding unchecked block does not change this fact.
                // See https://docs.soliditylang.org/en/latest/control-structures.html#checked-or-unchecked-arithmetic.
                return prod0 / denominator;
            }

            // Make sure the result is less than 2^256. Also prevents denominator == 0.
            require(denominator > prod1, "Math: mulDiv overflow");

            ///////////////////////////////////////////////
            // 512 by 256 division.
            ///////////////////////////////////////////////

            // Make division exact by subtracting the remainder from [prod1 prod0].
            uint256 remainder;
            assembly {
                // Compute remainder using mulmod.
                remainder := mulmod(x, y, denominator)

                // Subtract 256 bit number from 512 bit number.
                prod1 := sub(prod1, gt(remainder, prod0))
                prod0 := sub(prod0, remainder)
            }

            // Factor powers of two out of denominator and compute largest power of two divisor of denominator. Always >= 1.
            // See https://cs.stackexchange.com/q/138556/92363.

            // Does not overflow because the denominator cannot be zero at this stage in the function.
            uint256 twos = denominator & (~denominator + 1);
            assembly {
                // Divide denominator by twos.
                denominator := div(denominator, twos)

                // Divide [prod1 prod0] by twos.
                prod0 := div(prod0, twos)

                // Flip twos such that it is 2^256 / twos. If twos is zero, then it becomes one.
                twos := add(div(sub(0, twos), twos), 1)
            }

            // Shift in bits from prod1 into prod0.
            prod0 |= prod1 * twos;

            // Invert denominator mod 2^256. Now that denominator is an odd number, it has an inverse modulo 2^256 such
            // that denominator * inv = 1 mod 2^256. Compute the inverse by starting with a seed that is correct for
            // four bits. That is, denominator * inv = 1 mod 2^4.
            uint256 inverse = (3 * denominator) ^ 2;

            // Use the Newton-Raphson iteration to improve the precision. Thanks to Hensel's lifting lemma, this also works
            // in modular arithmetic, doubling the correct bits in each step.
            inverse *= 2 - denominator * inverse; // inverse mod 2^8
            inverse *= 2 - denominator * inverse; // inverse mod 2^16
            inverse *= 2 - denominator * inverse; // inverse mod 2^32
            inverse *= 2 - denominator * inverse; // inverse mod 2^64
            inverse *= 2 - denominator * inverse; // inverse mod 2^128
            inverse *= 2 - denominator * inverse; // inverse mod 2^256

            // Because the division is now exact we can divide by multiplying with the modular inverse of denominator.
            // This will give us the correct result modulo 2^256. Since the preconditions guarantee that the outcome is
            // less than 2^256, this is the final result. We don't need to compute the high bits of the result and prod1
            // is no longer required.
            result = prod0 * inverse;
            return result;
        }
    }

    /**
     * @notice Calculates x * y / denominator with full precision, following the selected rounding direction.
     */
    function mulDiv(uint256 x, uint256 y, uint256 denominator, Rounding rounding) internal pure returns (uint256) {
        uint256 result = mulDiv(x, y, denominator);
        if (rounding == Rounding.Up && mulmod(x, y, denominator) > 0) {
            result += 1;
        }
        return result;
    }

    /**
     * @dev Returns the square root of a number. If the number is not a perfect square, the value is rounded down.
     *
     * Inspired by Henry S. Warren, Jr.'s "Hacker's Delight" (Chapter 11).
     */
    function sqrt(uint256 a) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        // For our first guess, we get the biggest power of 2 which is smaller than the square root of the target.
        //
        // We know that the "msb" (most significant bit) of our target number `a` is a power of 2 such that we have
        // `msb(a) <= a < 2*msb(a)`. This value can be written `msb(a)=2**k` with `k=log2(a)`.
        //
        // This can be rewritten `2**log2(a) <= a < 2**(log2(a) + 1)`
        // → `sqrt(2**k) <= sqrt(a) < sqrt(2**(k+1))`
        // → `2**(k/2) <= sqrt(a) < 2**((k+1)/2) <= 2**(k/2 + 1)`
        //
        // Consequently, `2**(log2(a) / 2)` is a good first approximation of `sqrt(a)` with at least 1 correct bit.
        uint256 result = 1 << (log2(a) >> 1);

        // At this point `result` is an estimation with one bit of precision. We know the true value is a uint128,
        // since it is the square root of a uint256. Newton's method converges quadratically (precision doubles at
        // every iteration). We thus need at most 7 iteration to turn our partial result with one bit of precision
        // into the expected uint128 result.
        unchecked {
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            result = (result + a / result) >> 1;
            return min(result, a / result);
        }
    }

    /**
     * @notice Calculates sqrt(a), following the selected rounding direction.
     */
    function sqrt(uint256 a, Rounding rounding) internal pure returns (uint256) {
        unchecked {
            uint256 result = sqrt(a);
            return result + (rounding == Rounding.Up && result * result < a ? 1 : 0);
        }
    }

    /**
     * @dev Return the log in base 2, rounded down, of a positive value.
     * Returns 0 if given 0.
     */
    function log2(uint256 value) internal pure returns (uint256) {
        uint256 result = 0;
        unchecked {
            if (value >> 128 > 0) {
                value >>= 128;
                result += 128;
            }
            if (value >> 64 > 0) {
                value >>= 64;
                result += 64;
            }
            if (value >> 32 > 0) {
                value >>= 32;
                result += 32;
            }
            if (value >> 16 > 0) {
                value >>= 16;
                result += 16;
            }
            if (value >> 8 > 0) {
                value >>= 8;
                result += 8;
            }
            if (value >> 4 > 0) {
                value >>= 4;
                result += 4;
            }
            if (value >> 2 > 0) {
                value >>= 2;
                result += 2;
            }
            if (value >> 1 > 0) {
                result += 1;
            }
        }
        return result;
    }

    /**
     * @dev Return the log in base 2, following the selected rounding direction, of a positive value.
     * Returns 0 if given 0.
     */
    function log2(uint256 value, Rounding rounding) internal pure returns (uint256) {
        unchecked {
            uint256 result = log2(value);
            return result + (rounding == Rounding.Up && 1 << result < value ? 1 : 0);
        }
    }

    /**
     * @dev Return the log in base 10, rounded down, of a positive value.
     * Returns 0 if given 0.
     */
    function log10(uint256 value) internal pure returns (uint256) {
        uint256 result = 0;
        unchecked {
            if (value >= 10 ** 64) {
                value /= 10 ** 64;
                result += 64;
            }
            if (value >= 10 ** 32) {
                value /= 10 ** 32;
                result += 32;
            }
            if (value >= 10 ** 16) {
                value /= 10 ** 16;
                result += 16;
            }
            if (value >= 10 ** 8) {
                value /= 10 ** 8;
                result += 8;
            }
            if (value >= 10 ** 4) {
                value /= 10 ** 4;
                result += 4;
            }
            if (value >= 10 ** 2) {
                value /= 10 ** 2;
                result += 2;
            }
            if (value >= 10 ** 1) {
                result += 1;
            }
        }
        return result;
    }

    /**
     * @dev Return the log in base 10, following the selected rounding direction, of a positive value.
     * Returns 0 if given 0.
     */
    function log10(uint256 value, Rounding rounding) internal pure returns (uint256) {
        unchecked {
            uint256 result = log10(value);
            return result + (rounding == Rounding.Up && 10 ** result < value ? 1 : 0);
        }
    }

    /**
     * @dev Return the log in base 256, rounded down, of a positive value.
     * Returns 0 if given 0.
     *
     * Adding one to the result gives the number of pairs of hex symbols needed to represent `value` as a hex string.
     */
    function log256(uint256 value) internal pure returns (uint256) {
        uint256 result = 0;
        unchecked {
            if (value >> 128 > 0) {
                value >>= 128;
                result += 16;
            }
            if (value >> 64 > 0) {
                value >>= 64;
                result += 8;
            }
            if (value >> 32 > 0) {
                value >>= 32;
                result += 4;
            }
            if (value >> 16 > 0) {
                value >>= 16;
                result += 2;
            }
            if (value >> 8 > 0) {
                result += 1;
            }
        }
        return result;
    }

    /**
     * @dev Return the log in base 256, following the selected rounding direction, of a positive value.
     * Returns 0 if given 0.
     */
    function log256(uint256 value, Rounding rounding) internal pure returns (uint256) {
        unchecked {
            uint256 result = log256(value);
            return result + (rounding == Rounding.Up && 1 << (result << 3) < value ? 1 : 0);
        }
    }
}


/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

interface IERC5267 {
    /**
     * @dev MAY be emitted to signal that the domain could have changed.
     */
    event EIP712DomainChanged();

    /**
     * @dev returns the fields and values that describe the domain separator used by this contract for EIP-712
     * signature.
     */
    function eip712Domain()
        external
        view
        returns (
            bytes1 fields,
            string memory name,
            string memory version,
            uint256 chainId,
            address verifyingContract,
            bytes32 salt,
            uint256[] memory extensions
        );
}

/**
 * @title ERC721 token receiver interface
 * @dev Interface for any contract that wants to support safeTransfers
 * from ERC721 asset contracts.
 */
interface IERC721Receiver {
    /**
     * @dev Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}
     * by `operator` from `from`, this function is called.
     *
     * It must return its Solidity selector to confirm the token transfer.
     * If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.
     *
     * The selector can be obtained in Solidity with `IERC721Receiver.onERC721Received.selector`.
     */
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4);
}

/**
 * @title ERC-721 Non-Fungible Token Standard, optional metadata extension
 * @dev See https://eips.ethereum.org/EIPS/eip-721
 */
interface IERC721Metadata is IERC721 {
    /**
     * @dev Returns the token collection name.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the token collection symbol.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
     */
    function tokenURI(uint256 tokenId) external view returns (string memory);
}

/**
 * @dev Library for reading and writing primitive types to specific storage slots.
 *
 * Storage slots are often used to avoid storage conflict when dealing with upgradeable contracts.
 * This library helps with reading and writing to such slots without the need for inline assembly.
 *
 * The functions in this library return Slot structs that contain a `value` member that can be used to read or write.
 *
 * Example usage to set ERC1967 implementation slot:
 * ```solidity
 * contract ERC1967 {
 *     bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;
 *
 *     function _getImplementation() internal view returns (address) {
 *         return StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value;
 *     }
 *
 *     function _setImplementation(address newImplementation) internal {
 *         require(Address.isContract(newImplementation), "ERC1967: new implementation is not a contract");
 *         StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value = newImplementation;
 *     }
 * }
 * ```
 *
 * _Available since v4.1 for `address`, `bool`, `bytes32`, `uint256`._
 * _Available since v4.9 for `string`, `bytes`._
 */
library StorageSlot {
    struct AddressSlot {
        address value;
    }

    struct BooleanSlot {
        bool value;
    }

    struct Bytes32Slot {
        bytes32 value;
    }

    struct Uint256Slot {
        uint256 value;
    }

    struct StringSlot {
        string value;
    }

    struct BytesSlot {
        bytes value;
    }

    /**
     * @dev Returns an `AddressSlot` with member `value` located at `slot`.
     */
    function getAddressSlot(bytes32 slot) internal pure returns (AddressSlot storage r) {
        /// @solidity memory-safe-assembly
        assembly {
            r.slot := slot
        }
    }

    /**
     * @dev Returns an `BooleanSlot` with member `value` located at `slot`.
     */
    function getBooleanSlot(bytes32 slot) internal pure returns (BooleanSlot storage r) {
        /// @solidity memory-safe-assembly
        assembly {
            r.slot := slot
        }
    }

    /**
     * @dev Returns an `Bytes32Slot` with member `value` located at `slot`.
     */
    function getBytes32Slot(bytes32 slot) internal pure returns (Bytes32Slot storage r) {
        /// @solidity memory-safe-assembly
        assembly {
            r.slot := slot
        }
    }

    /**
     * @dev Returns an `Uint256Slot` with member `value` located at `slot`.
     */
    function getUint256Slot(bytes32 slot) internal pure returns (Uint256Slot storage r) {
        /// @solidity memory-safe-assembly
        assembly {
            r.slot := slot
        }
    }

    /**
     * @dev Returns an `StringSlot` with member `value` located at `slot`.
     */
    function getStringSlot(bytes32 slot) internal pure returns (StringSlot storage r) {
        /// @solidity memory-safe-assembly
        assembly {
            r.slot := slot
        }
    }

    /**
     * @dev Returns an `StringSlot` representation of the string storage pointer `store`.
     */
    function getStringSlot(string storage store) internal pure returns (StringSlot storage r) {
        /// @solidity memory-safe-assembly
        assembly {
            r.slot := store.slot
        }
    }

    /**
     * @dev Returns an `BytesSlot` with member `value` located at `slot`.
     */
    function getBytesSlot(bytes32 slot) internal pure returns (BytesSlot storage r) {
        /// @solidity memory-safe-assembly
        assembly {
            r.slot := slot
        }
    }

    /**
     * @dev Returns an `BytesSlot` representation of the bytes storage pointer `store`.
     */
    function getBytesSlot(bytes storage store) internal pure returns (BytesSlot storage r) {
        /// @solidity memory-safe-assembly
        assembly {
            r.slot := store.slot
        }
    }
}


// | string  | 0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA   |
// | length  | 0x                                                              BB |
type ShortString is bytes32;

/**
 * @dev This library provides functions to convert short memory strings
 * into a `ShortString` type that can be used as an immutable variable.
 *
 * Strings of arbitrary length can be optimized using this library if
 * they are short enough (up to 31 bytes) by packing them with their
 * length (1 byte) in a single EVM word (32 bytes). Additionally, a
 * fallback mechanism can be used for every other case.
 *
 * Usage example:
 *
 * ```solidity
 * contract Named {
 *     using ShortStrings for *;
 *
 *     ShortString private immutable _name;
 *     string private _nameFallback;
 *
 *     constructor(string memory contractName) {
 *         _name = contractName.toShortStringWithFallback(_nameFallback);
 *     }
 *
 *     function name() external view returns (string memory) {
 *         return _name.toStringWithFallback(_nameFallback);
 *     }
 * }
 * ```
 */
library ShortStrings {
    // Used as an identifier for strings longer than 31 bytes.
    bytes32 private constant _FALLBACK_SENTINEL = 0x00000000000000000000000000000000000000000000000000000000000000FF;

    error StringTooLong(string str);
    error InvalidShortString();

    /**
     * @dev Encode a string of at most 31 chars into a `ShortString`.
     *
     * This will trigger a `StringTooLong` error is the input string is too long.
     */
    function toShortString(string memory str) internal pure returns (ShortString) {
        bytes memory bstr = bytes(str);
        if (bstr.length > 31) {
            revert StringTooLong(str);
        }
        return ShortString.wrap(bytes32(uint256(bytes32(bstr)) | bstr.length));
    }

    /**
     * @dev Decode a `ShortString` back to a "normal" string.
     */
    function toString(ShortString sstr) internal pure returns (string memory) {
        uint256 len = byteLength(sstr);
        // using `new string(len)` would work locally but is not memory safe.
        string memory str = new string(32);
        /// @solidity memory-safe-assembly
        assembly {
            mstore(str, len)
            mstore(add(str, 0x20), sstr)
        }
        return str;
    }

    /**
     * @dev Return the length of a `ShortString`.
     */
    function byteLength(ShortString sstr) internal pure returns (uint256) {
        uint256 result = uint256(ShortString.unwrap(sstr)) & 0xFF;
        if (result > 31) {
            revert InvalidShortString();
        }
        return result;
    }

    /**
     * @dev Encode a string into a `ShortString`, or write it to storage if it is too long.
     */
    function toShortStringWithFallback(string memory value, string storage store) internal returns (ShortString) {
        if (bytes(value).length < 32) {
            return toShortString(value);
        } else {
            StorageSlot.getStringSlot(store).value = value;
            return ShortString.wrap(_FALLBACK_SENTINEL);
        }
    }

    /**
     * @dev Decode a string that was encoded to `ShortString` or written to storage using {setWithFallback}.
     */
    function toStringWithFallback(ShortString value, string storage store) internal pure returns (string memory) {
        if (ShortString.unwrap(value) != _FALLBACK_SENTINEL) {
            return toString(value);
        } else {
            return store;
        }
    }

    /**
     * @dev Return the length of a string that was encoded to `ShortString` or written to storage using {setWithFallback}.
     *
     * WARNING: This will return the "byte length" of the string. This may not reflect the actual length in terms of
     * actual characters as the UTF-8 encoding of a single character can span over multiple bytes.
     */
    function byteLengthWithFallback(ShortString value, string storage store) internal view returns (uint256) {
        if (ShortString.unwrap(value) != _FALLBACK_SENTINEL) {
            return byteLength(value);
        } else {
            return bytes(store).length;
        }
    }
}

/**
 * @dev String operations.
 */
library Strings {
    bytes16 private constant _SYMBOLS = "0123456789abcdef";
    uint8 private constant _ADDRESS_LENGTH = 20;

    /**
     * @dev Converts a `uint256` to its ASCII `string` decimal representation.
     */
    function toString(uint256 value) internal pure returns (string memory) {
        unchecked {
            uint256 length = Math.log10(value) + 1;
            string memory buffer = new string(length);
            uint256 ptr;
            /// @solidity memory-safe-assembly
            assembly {
                ptr := add(buffer, add(32, length))
            }
            while (true) {
                ptr--;
                /// @solidity memory-safe-assembly
                assembly {
                    mstore8(ptr, byte(mod(value, 10), _SYMBOLS))
                }
                value /= 10;
                if (value == 0) break;
            }
            return buffer;
        }
    }

    /**
     * @dev Converts a `int256` to its ASCII `string` decimal representation.
     */
    function toString(int256 value) internal pure returns (string memory) {
        return string(abi.encodePacked(value < 0 ? "-" : "", toString(SignedMath.abs(value))));
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation.
     */
    function toHexString(uint256 value) internal pure returns (string memory) {
        unchecked {
            return toHexString(value, Math.log256(value) + 1);
        }
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.
     */
    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
        bytes memory buffer = new bytes(2 * length + 2);
        buffer[0] = "0";
        buffer[1] = "x";
        for (uint256 i = 2 * length + 1; i > 1; --i) {
            buffer[i] = _SYMBOLS[value & 0xf];
            value >>= 4;
        }
        require(value == 0, "Strings: hex length insufficient");
        return string(buffer);
    }

    /**
     * @dev Converts an `address` with fixed length of 20 bytes to its not checksummed ASCII `string` hexadecimal representation.
     */
    function toHexString(address addr) internal pure returns (string memory) {
        return toHexString(uint256(uint160(addr)), _ADDRESS_LENGTH);
    }

    /**
     * @dev Returns true if the two strings are equal.
     */
    function equal(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }
}

/**
 * @dev Elliptic Curve Digital Signature Algorithm (ECDSA) operations.
 *
 * These functions can be used to verify that a message was signed by the holder
 * of the private keys of a given address.
 */
library ECDSA {
    enum RecoverError {
        NoError,
        InvalidSignature,
        InvalidSignatureLength,
        InvalidSignatureS,
        InvalidSignatureV // Deprecated in v4.8
    }

    function _throwError(RecoverError error) private pure {
        if (error == RecoverError.NoError) {
            return; // no error: do nothing
        } else if (error == RecoverError.InvalidSignature) {
            revert("ECDSA: invalid signature");
        } else if (error == RecoverError.InvalidSignatureLength) {
            revert("ECDSA: invalid signature length");
        } else if (error == RecoverError.InvalidSignatureS) {
            revert("ECDSA: invalid signature 's' value");
        }
    }

    /**
     * @dev Returns the address that signed a hashed message (`hash`) with
     * `signature` or error string. This address can then be used for verification purposes.
     *
     * The `ecrecover` EVM opcode allows for malleable (non-unique) signatures:
     * this function rejects them by requiring the `s` value to be in the lower
     * half order, and the `v` value to be either 27 or 28.
     *
     * IMPORTANT: `hash` _must_ be the result of a hash operation for the
     * verification to be secure: it is possible to craft signatures that
     * recover to arbitrary addresses for non-hashed data. A safe way to ensure
     * this is by receiving a hash of the original message (which may otherwise
     * be too long), and then calling {toEthSignedMessageHash} on it.
     *
     * Documentation for signature generation:
     * - with https://web3js.readthedocs.io/en/v1.3.4/web3-eth-accounts.html#sign[Web3.js]
     * - with https://docs.ethers.io/v5/api/signer/#Signer-signMessage[ethers]
     *
     * _Available since v4.3._
     */
    function tryRecover(bytes32 hash, bytes memory signature) internal pure returns (address, RecoverError) {
        if (signature.length == 65) {
            bytes32 r;
            bytes32 s;
            uint8 v;
            // ecrecover takes the signature parameters, and the only way to get them
            // currently is to use assembly.
            /// @solidity memory-safe-assembly
            assembly {
                r := mload(add(signature, 0x20))
                s := mload(add(signature, 0x40))
                v := byte(0, mload(add(signature, 0x60)))
            }
            return tryRecover(hash, v, r, s);
        } else {
            return (address(0), RecoverError.InvalidSignatureLength);
        }
    }

    /**
     * @dev Returns the address that signed a hashed message (`hash`) with
     * `signature`. This address can then be used for verification purposes.
     *
     * The `ecrecover` EVM opcode allows for malleable (non-unique) signatures:
     * this function rejects them by requiring the `s` value to be in the lower
     * half order, and the `v` value to be either 27 or 28.
     *
     * IMPORTANT: `hash` _must_ be the result of a hash operation for the
     * verification to be secure: it is possible to craft signatures that
     * recover to arbitrary addresses for non-hashed data. A safe way to ensure
     * this is by receiving a hash of the original message (which may otherwise
     * be too long), and then calling {toEthSignedMessageHash} on it.
     */
    function recover(bytes32 hash, bytes memory signature) internal pure returns (address) {
        (address recovered, RecoverError error) = tryRecover(hash, signature);
        _throwError(error);
        return recovered;
    }

    /**
     * @dev Overload of {ECDSA-tryRecover} that receives the `r` and `vs` short-signature fields separately.
     *
     * See https://eips.ethereum.org/EIPS/eip-2098[EIP-2098 short signatures]
     *
     * _Available since v4.3._
     */
    function tryRecover(bytes32 hash, bytes32 r, bytes32 vs) internal pure returns (address, RecoverError) {
        bytes32 s = vs & bytes32(0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
        uint8 v = uint8((uint256(vs) >> 255) + 27);
        return tryRecover(hash, v, r, s);
    }

    /**
     * @dev Overload of {ECDSA-recover} that receives the `r and `vs` short-signature fields separately.
     *
     * _Available since v4.2._
     */
    function recover(bytes32 hash, bytes32 r, bytes32 vs) internal pure returns (address) {
        (address recovered, RecoverError error) = tryRecover(hash, r, vs);
        _throwError(error);
        return recovered;
    }

    /**
     * @dev Overload of {ECDSA-tryRecover} that receives the `v`,
     * `r` and `s` signature fields separately.
     *
     * _Available since v4.3._
     */
    function tryRecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) internal pure returns (address, RecoverError) {
        // EIP-2 still allows signature malleability for ecrecover(). Remove this possibility and make the signature
        // unique. Appendix F in the Ethereum Yellow paper (https://ethereum.github.io/yellowpaper/paper.pdf), defines
        // the valid range for s in (301): 0 < s < secp256k1n ÷ 2 + 1, and for v in (302): v ∈ {27, 28}. Most
        // signatures from current libraries generate a unique signature with an s-value in the lower half order.
        //
        // If your library generates malleable signatures, such as s-values in the upper range, calculate a new s-value
        // with 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141 - s1 and flip v from 27 to 28 or
        // vice versa. If your library also generates signatures with 0/1 for v instead 27/28, add 27 to v to accept
        // these malleable signatures as well.
        if (uint256(s) > 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0) {
            return (address(0), RecoverError.InvalidSignatureS);
        }

        // If the signature is valid (and not malleable), return the signer address
        address signer = ecrecover(hash, v, r, s);
        if (signer == address(0)) {
            return (address(0), RecoverError.InvalidSignature);
        }

        return (signer, RecoverError.NoError);
    }

    /**
     * @dev Overload of {ECDSA-recover} that receives the `v`,
     * `r` and `s` signature fields separately.
     */
    function recover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) internal pure returns (address) {
        (address recovered, RecoverError error) = tryRecover(hash, v, r, s);
        _throwError(error);
        return recovered;
    }

    /**
     * @dev Returns an Ethereum Signed Message, created from a `hash`. This
     * produces hash corresponding to the one signed with the
     * https://eth.wiki/json-rpc/API#eth_sign[`eth_sign`]
     * JSON-RPC method as part of EIP-191.
     *
     * See {recover}.
     */
    function toEthSignedMessageHash(bytes32 hash) internal pure returns (bytes32 message) {
        // 32 is the length in bytes of hash,
        // enforced by the type signature above
        /// @solidity memory-safe-assembly
        assembly {
            mstore(0x00, "\x19Ethereum Signed Message:\n32")
            mstore(0x1c, hash)
            message := keccak256(0x00, 0x3c)
        }
    }

    /**
     * @dev Returns an Ethereum Signed Message, created from `s`. This
     * produces hash corresponding to the one signed with the
     * https://eth.wiki/json-rpc/API#eth_sign[`eth_sign`]
     * JSON-RPC method as part of EIP-191.
     *
     * See {recover}.
     */
    function toEthSignedMessageHash(bytes memory s) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", Strings.toString(s.length), s));
    }

    /**
     * @dev Returns an Ethereum Signed Typed Data, created from a
     * `domainSeparator` and a `structHash`. This produces hash corresponding
     * to the one signed with the
     * https://eips.ethereum.org/EIPS/eip-712[`eth_signTypedData`]
     * JSON-RPC method as part of EIP-712.
     *
     * See {recover}.
     */
    function toTypedDataHash(bytes32 domainSeparator, bytes32 structHash) internal pure returns (bytes32 data) {
        /// @solidity memory-safe-assembly
        assembly {
            let ptr := mload(0x40)
            mstore(ptr, "\x19\x01")
            mstore(add(ptr, 0x02), domainSeparator)
            mstore(add(ptr, 0x22), structHash)
            data := keccak256(ptr, 0x42)
        }
    }

    /**
     * @dev Returns an Ethereum Signed Data with intended validator, created from a
     * `validator` and `data` according to the version 0 of EIP-191.
     *
     * See {recover}.
     */
    function toDataWithIntendedValidatorHash(address validator, bytes memory data) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19\x00", validator, data));
    }
}

/**
 * @dev https://eips.ethereum.org/EIPS/eip-712[EIP 712] is a standard for hashing and signing of typed structured data.
 *
 * The encoding specified in the EIP is very generic, and such a generic implementation in Solidity is not feasible,
 * thus this contract does not implement the encoding itself. Protocols need to implement the type-specific encoding
 * they need in their contracts using a combination of `abi.encode` and `keccak256`.
 *
 * This contract implements the EIP 712 domain separator ({_domainSeparatorV4}) that is used as part of the encoding
 * scheme, and the final step of the encoding to obtain the message digest that is then signed via ECDSA
 * ({_hashTypedDataV4}).
 *
 * The implementation of the domain separator was designed to be as efficient as possible while still properly updating
 * the chain id to protect against replay attacks on an eventual fork of the chain.
 *
 * NOTE: This contract implements the version of the encoding known as "v4", as implemented by the JSON RPC method
 * https://docs.metamask.io/guide/signing-data.html[`eth_signTypedDataV4` in MetaMask].
 *
 * NOTE: In the upgradeable version of this contract, the cached values will correspond to the address, and the domain
 * separator of the implementation contract. This will cause the `_domainSeparatorV4` function to always rebuild the
 * separator from the immutable values, which is cheaper than accessing a cached version in cold storage.
 *
 * _Available since v3.4._
 *
 * @custom:oz-upgrades-unsafe-allow state-variable-immutable state-variable-assignment
 */
abstract contract EIP712 is IERC5267 {
    using ShortStrings for *;

    bytes32 private constant _TYPE_HASH =
        keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");

    // Cache the domain separator as an immutable value, but also store the chain id that it corresponds to, in order to
    // invalidate the cached domain separator if the chain id changes.
    bytes32 private immutable _cachedDomainSeparator;
    uint256 private immutable _cachedChainId;
    address private immutable _cachedThis;

    bytes32 private immutable _hashedName;
    bytes32 private immutable _hashedVersion;

    ShortString private immutable _name;
    ShortString private immutable _version;
    string private _nameFallback;
    string private _versionFallback;

    /**
     * @dev Initializes the domain separator and parameter caches.
     *
     * The meaning of `name` and `version` is specified in
     * https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator[EIP 712]:
     *
     * - `name`: the user readable name of the signing domain, i.e. the name of the DApp or the protocol.
     * - `version`: the current major version of the signing domain.
     *
     * NOTE: These parameters cannot be changed except through a xref:learn::upgrading-smart-contracts.adoc[smart
     * contract upgrade].
     */
    constructor(string memory name, string memory version) {
        _name = name.toShortStringWithFallback(_nameFallback);
        _version = version.toShortStringWithFallback(_versionFallback);
        _hashedName = keccak256(bytes(name));
        _hashedVersion = keccak256(bytes(version));

        _cachedChainId = block.chainid;
        _cachedDomainSeparator = _buildDomainSeparator();
        _cachedThis = address(this);
    }

    /**
     * @dev Returns the domain separator for the current chain.
     */
    function _domainSeparatorV4() internal view returns (bytes32) {
        if (address(this) == _cachedThis && block.chainid == _cachedChainId) {
            return _cachedDomainSeparator;
        } else {
            return _buildDomainSeparator();
        }
    }

    function _buildDomainSeparator() private view returns (bytes32) {
        return keccak256(abi.encode(_TYPE_HASH, _hashedName, _hashedVersion, block.chainid, address(this)));
    }

    /**
     * @dev Given an already https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct[hashed struct], this
     * function returns the hash of the fully encoded EIP712 message for this domain.
     *
     * This hash can be used together with {ECDSA-recover} to obtain the signer of a message. For example:
     *
     * ```solidity
     * bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
     *     keccak256("Mail(address to,string contents)"),
     *     mailTo,
     *     keccak256(bytes(mailContents))
     * )));
     * address signer = ECDSA.recover(digest, signature);
     * ```
     */
    function _hashTypedDataV4(bytes32 structHash) internal view virtual returns (bytes32) {
        return ECDSA.toTypedDataHash(_domainSeparatorV4(), structHash);
    }

    /**
     * @dev See {EIP-5267}.
     *
     * _Available since v4.9._
     */
    function eip712Domain()
        public
        view
        virtual
        override
        returns (
            bytes1 fields,
            string memory name,
            string memory version,
            uint256 chainId,
            address verifyingContract,
            bytes32 salt,
            uint256[] memory extensions
        )
    {
        return (
            hex"0f", // 01111
            _name.toStringWithFallback(_nameFallback),
            _version.toStringWithFallback(_versionFallback),
            block.chainid,
            address(this),
            bytes32(0),
            new uint256[](0)
        );
    }
}

/**
 * @title Counters
 * @author Matt Condon (@shrugs)
 * @dev Provides counters that can only be incremented, decremented or reset. This can be used e.g. to track the number
 * of elements in a mapping, issuing ERC721 ids, or counting request ids.
 *
 * Include with `using Counters for Counters.Counter;`
 */
library Counters {
    struct Counter {
        // This variable should never be directly accessed by users of the library: interactions must be restricted to
        // the library's function. As of Solidity v0.5.2, this cannot be enforced, though there is a proposal to add
        // this feature: see https://github.com/ethereum/solidity/issues/4637
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        unchecked {
            counter._value += 1;
        }
    }

    function decrement(Counter storage counter) internal {
        uint256 value = counter._value;
        require(value > 0, "Counter: decrement overflow");
        unchecked {
            counter._value = value - 1;
        }
    }

    function reset(Counter storage counter) internal {
        counter._value = 0;
    }
}

/**
 * @dev Interface for the optional metadata functions from the ERC20 standard.
 *
 * _Available since v4.1._
 */
interface IERC20Metadata is IERC20 {
    /**
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the decimals places of the token.
     */
    function decimals() external view returns (uint8);
}

/**
 * @dev Interface of the ERC20 Permit extension allowing approvals to be made via signatures, as defined in
 * https://eips.ethereum.org/EIPS/eip-2612[EIP-2612].
 *
 * Adds the {permit} method, which can be used to change an account's ERC20 allowance (see {IERC20-allowance}) by
 * presenting a message signed by the account. By not relying on {IERC20-approve}, the token holder account doesn't
 * need to send a transaction, and thus is not required to hold Ether at all.
 *
 * ==== Security Considerations
 *
 * There are two important considerations concerning the use of `permit`. The first is that a valid permit signature
 * expresses an allowance, and it should not be assumed to convey additional meaning. In particular, it should not be
 * considered as an intention to spend the allowance in any specific way. The second is that because permits have
 * built-in replay protection and can be submitted by anyone, they can be frontrun. A protocol that uses permits should
 * take this into consideration and allow a `permit` call to fail. Combining these two aspects, a pattern that may be
 * generally recommended is:
 *
 * ```solidity
 * function doThingWithPermit(..., uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) public {
 *     try token.permit(msg.sender, address(this), value, deadline, v, r, s) {} catch {}
 *     doThing(..., value);
 * }
 *
 * function doThing(..., uint256 value) public {
 *     token.safeTransferFrom(msg.sender, address(this), value);
 *     ...
 * }
 * ```
 *
 * Observe that: 1) `msg.sender` is used as the owner, leaving no ambiguity as to the signer intent, and 2) the use of
 * `try/catch` allows the permit to fail and makes the code tolerant to frontrunning. (See also
 * {SafeERC20-safeTransferFrom}).
 *
 * Additionally, note that smart contract wallets (such as Argent or Safe) are not able to produce permit signatures, so
 * contracts should have entry points that don't rely on permit.
 */
interface IERC20Permit {
    /**
     * @dev Sets `value` as the allowance of `spender` over ``owner``'s tokens,
     * given ``owner``'s signed approval.
     *
     * IMPORTANT: The same issues {IERC20-approve} has related to transaction
     * ordering also apply here.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `deadline` must be a timestamp in the future.
     * - `v`, `r` and `s` must be a valid `secp256k1` signature from `owner`
     * over the EIP712-formatted function arguments.
     * - the signature must use ``owner``'s current nonce (see {nonces}).
     *
     * For more information on the signature format, see the
     * https://eips.ethereum.org/EIPS/eip-2612#specification[relevant EIP
     * section].
     *
     * CAUTION: See Security Considerations above.
     */
    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    /**
     * @dev Returns the current nonce for `owner`. This value must be
     * included whenever a signature is generated for {permit}.
     *
     * Every successful call to {permit} increases ``owner``'s nonce by one. This
     * prevents a signature from being used multiple times.
     */
    function nonces(address owner) external view returns (uint256);

    /**
     * @dev Returns the domain separator used in the encoding of the signature for {permit}, as defined by {EIP712}.
     */
    // solhint-disable-next-line func-name-mixedcase
    function DOMAIN_SEPARATOR() external view returns (bytes32);
}

/**
 * @dev Implementation of the {IERC20} interface.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using {_mint}.
 * For a generic mechanism see {ERC20PresetMinterPauser}.
 *
 * TIP: For a detailed writeup see our guide
 * https://forum.openzeppelin.com/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * The default value of {decimals} is 18. To change this, you should override
 * this function so it returns a different value.
 *
 * We have followed general OpenZeppelin Contracts guidelines: functions revert
 * instead returning `false` on failure. This behavior is nonetheless
 * conventional and does not conflict with the expectations of ERC20
 * applications.
 *
 * Additionally, an {Approval} event is emitted on calls to {transferFrom}.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 *
 * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
 * functions have been added to mitigate the well-known issues around setting
 * allowances. See {IERC20-approve}.
 */
contract ERC20 is Context, IERC20 {
    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    /**
     * @dev Sets the values for {name} and {symbol}.
     *
     * All two of these values are immutable: they can only be set once during
     * construction.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view virtual returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5.05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the default value returned by this function, unless
     * it's overridden.
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view virtual returns (uint8) {
        return 18;
    }

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev See {IERC20-approve}.
     *
     * NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on
     * `transferFrom`. This is semantically equivalent to an infinite approval.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * NOTE: Does not update the allowance if the current allowance
     * is the maximum `uint256`.
     *
     * Requirements:
     *
     * - `from` and `to` cannot be the zero address.
     * - `from` must have a balance of at least `amount`.
     * - the caller must have allowance for ``from``'s tokens of at least
     * `amount`.
     */
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        address owner = _msgSender();
        uint256 currentAllowance = allowance(owner, spender);
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }

        return true;
    }

    /**
     * @dev Moves `amount` of tokens from `from` to `to`.
     *
     * This internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `from` must have a balance of at least `amount`.
     */
    function _transfer(address from, address to, uint256 amount) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(from, to, amount);

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance - amount;
            // Overflow not possible: the sum of all balances is capped by totalSupply, and the sum is preserved by
            // decrementing then incrementing.
            _balances[to] += amount;
        }

        emit Transfer(from, to, amount);

        _afterTokenTransfer(from, to, amount);
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        unchecked {
            // Overflow not possible: balance + amount is at most totalSupply + amount, which is checked above.
            _balances[account] += amount;
        }
        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
            // Overflow not possible: amount <= accountBalance <= totalSupply.
            _totalSupply -= amount;
        }

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /**
     * @dev Updates `owner` s allowance for `spender` based on spent `amount`.
     *
     * Does not update the allowance amount in case of infinite allowance.
     * Revert if not enough allowance is available.
     *
     * Might emit an {Approval} event.
     */
    function _spendAllowance(address owner, address spender, uint256 amount) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual {}

    /**
     * @dev Hook that is called after any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * has been transferred to `to`.
     * - when `from` is zero, `amount` tokens have been minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens have been burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(address from, address to, uint256 amount) internal virtual {}
}

/**
 * @dev Implementation of the ERC20 Permit extension allowing approvals to be made via signatures, as defined in
 * https://eips.ethereum.org/EIPS/eip-2612[EIP-2612].
 *
 * Adds the {permit} method, which can be used to change an account's ERC20 allowance (see {IERC20-allowance}) by
 * presenting a message signed by the account. By not relying on `{IERC20-approve}`, the token holder account doesn't
 * need to send a transaction, and thus is not required to hold Ether at all.
 *
 * _Available since v3.4._
 */
abstract contract ERC20Permit is ERC20, IERC20Permit, EIP712 {
    using Counters for Counters.Counter;

    mapping(address => Counters.Counter) private _nonces;

    // solhint-disable-next-line var-name-mixedcase
    bytes32 private constant _PERMIT_TYPEHASH =
        keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    /**
     * @dev In previous versions `_PERMIT_TYPEHASH` was declared as `immutable`.
     * However, to ensure consistency with the upgradeable transpiler, we will continue
     * to reserve a slot.
     * @custom:oz-renamed-from _PERMIT_TYPEHASH
     */
    // solhint-disable-next-line var-name-mixedcase
    bytes32 private _PERMIT_TYPEHASH_DEPRECATED_SLOT;

    /**
     * @dev Initializes the {EIP712} domain separator using the `name` parameter, and setting `version` to `"1"`.
     *
     * It's a good idea to use the same `name` that is defined as the ERC20 token name.
     */
    constructor(string memory name) EIP712(name, "1") {}

    /**
     * @inheritdoc IERC20Permit
     */
    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public virtual override {
        require(block.timestamp <= deadline, "ERC20Permit: expired deadline");

        bytes32 structHash = keccak256(abi.encode(_PERMIT_TYPEHASH, owner, spender, value, _useNonce(owner), deadline));

        bytes32 hash = _hashTypedDataV4(structHash);

        address signer = ECDSA.recover(hash, v, r, s);
        require(signer == owner, "ERC20Permit: invalid signature");

        _approve(owner, spender, value);
    }

    /**
     * @inheritdoc IERC20Permit
     */
    function nonces(address owner) public view virtual override returns (uint256) {
        return _nonces[owner].current();
    }

    /**
     * @inheritdoc IERC20Permit
     */
    // solhint-disable-next-line func-name-mixedcase
    function DOMAIN_SEPARATOR() external view override returns (bytes32) {
        return _domainSeparatorV4();
    }

    /**
     * @dev "Consume a nonce": return the current value and increment.
     *
     * _Available since v4.1._
     */
    function _useNonce(address owner) internal virtual returns (uint256 current) {
        Counters.Counter storage nonce = _nonces[owner];
        current = nonce.current();
        nonce.increment();
    }
}

/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     *
     * Furthermore, `isContract` will also return true if the target contract within
     * the same transaction is already scheduled for destruction by `SELFDESTRUCT`,
     * which only has an effect at the end of a transaction.
     * ====
     *
     * [IMPORTANT]
     * ====
     * You shouldn't rely on `isContract` to protect against flash loan attacks!
     *
     * Preventing calls from contracts is highly discouraged. It breaks composability, breaks support for smart wallets
     * like Gnosis Safe, and does not provide security since it can be circumvented by calling from a contract
     * constructor.
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies on extcodesize/address.code.length, which returns 0
        // for contracts in construction, since the code is only stored at the end
        // of the constructor execution.

        return account.code.length > 0;
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://consensys.net/diligence/blog/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.8.0/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain `call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        (bool success, bytes memory returndata) = target.call{value: value}(data);
        return verifyCallResultFromTarget(target, success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {
        return functionStaticCall(target, data, "Address: low-level static call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        (bool success, bytes memory returndata) = target.staticcall(data);
        return verifyCallResultFromTarget(target, success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionDelegateCall(target, data, "Address: low-level delegate call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        (bool success, bytes memory returndata) = target.delegatecall(data);
        return verifyCallResultFromTarget(target, success, returndata, errorMessage);
    }

    /**
     * @dev Tool to verify that a low level call to smart-contract was successful, and revert (either by bubbling
     * the revert reason or using the provided one) in case of unsuccessful call or if target was not a contract.
     *
     * _Available since v4.8._
     */
    function verifyCallResultFromTarget(
        address target,
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        if (success) {
            if (returndata.length == 0) {
                // only check isContract if the call was successful and the return data is empty
                // otherwise we already know that it was a contract
                require(isContract(target), "Address: call to non-contract");
            }
            return returndata;
        } else {
            _revert(returndata, errorMessage);
        }
    }

    /**
     * @dev Tool to verify that a low level call was successful, and revert if it wasn't, either by bubbling the
     * revert reason or using the provided one.
     *
     * _Available since v4.3._
     */
    function verifyCallResult(
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal pure returns (bytes memory) {
        if (success) {
            return returndata;
        } else {
            _revert(returndata, errorMessage);
        }
    }

    function _revert(bytes memory returndata, string memory errorMessage) private pure {
        // Look for revert reason and bubble it up if present
        if (returndata.length > 0) {
            // The easiest way to bubble the revert reason is using memory via assembly
            /// @solidity memory-safe-assembly
            assembly {
                let returndata_size := mload(returndata)
                revert(add(32, returndata), returndata_size)
            }
        } else {
            revert(errorMessage);
        }
    }
}

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

/**
 * @dev Contract module which allows children to implement an emergency stop
 * mechanism that can be triggered by an authorized account.
 *
 * This module is used through inheritance. It will make available the
 * modifiers `whenNotPaused` and `whenPaused`, which can be applied to
 * the functions of your contract. Note that they will not be pausable by
 * simply including this module, only once the modifiers are put in place.
 */
abstract contract Pausable is Context {
    /**
     * @dev Emitted when the pause is triggered by `account`.
     */
    event Paused(address account);

    /**
     * @dev Emitted when the pause is lifted by `account`.
     */
    event Unpaused(address account);

    bool private _paused;

    /**
     * @dev Initializes the contract in unpaused state.
     */
    constructor() {
        _paused = false;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    modifier whenNotPaused() {
        _requireNotPaused();
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    modifier whenPaused() {
        _requirePaused();
        _;
    }

    /**
     * @dev Returns true if the contract is paused, and false otherwise.
     */
    function paused() public view virtual returns (bool) {
        return _paused;
    }

    /**
     * @dev Throws if the contract is paused.
     */
    function _requireNotPaused() internal view virtual {
        require(!paused(), "Pausable: paused");
    }

    /**
     * @dev Throws if the contract is not paused.
     */
    function _requirePaused() internal view virtual {
        require(paused(), "Pausable: not paused");
    }

    /**
     * @dev Triggers stopped state.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    function _pause() internal virtual whenNotPaused {
        _paused = true;
        emit Paused(_msgSender());
    }

    /**
     * @dev Returns to normal state.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    function _unpause() internal virtual whenPaused {
        _paused = false;
        emit Unpaused(_msgSender());
    }
}


/** @title Curator

    ERROR CODE
    ---------
    "21" : Out of bound error
    "22" : Registered
    "23" : Not a curator

 */
abstract contract Curators is Ownable {
  enum Status { NONE, REGISTERED, WHITELISTED }
  struct Curator {
    Status status;
    uint id;
    address addr;
  }

  // Curators
  Curator[] public curators;

  // Curators curatorsId
  mapping(address => uint) public curatorsId;

  // Mapping of curators to jobId
  mapping(address => mapping(uint => bool)) private isCurator;

  // Validate permissions
  modifier checkEligibility(uint8 selector, string memory errorMessage) {
    if(selector > 2) revert('21');
    require(_curatorStatus(_msgSender()) == Status(selector), errorMessage);
    _;
  }

  /**@dev We initialize the curators array with an empty element. This helps 
      us properly track valid curators easily. Approved Curators cannot have 
      zero id.
   */
  constructor() {
    curators.push();
  }

  // Return the current status of a curator
  function _curatorStatus(address target) internal view returns(Status status) {
    uint id = curatorsId[target];
    status = curators[id].status;
  }

  // Registers a new curator. Such address must not have been registered
  function becomeACurator() public checkEligibility(0, "22") {
    address caller = _msgSender();
    uint id = curators.length;
    curatorsId[caller] = id; 
    curators.push(Curator(Status.REGISTERED, id, caller));
  }

  // Curators are free to remove themselves
  function deleteMe() public {
    address caller = _msgSender();
    uint id = curatorsId[caller];
    require(id > 0, '23');
    delete curators[id];
    curatorsId[caller] = 0;
  }

  /**@dev Only Owner can whitelist curators.
    Such address must have been registered before the invocation can be 
    successful.
  */ 
  function whitelistCurators(address[] memory targets) public onlyOwner {
    for(uint i = 0; i < targets.length; i++) {
      address target = targets[i];
      uint id = curatorsId[target];
      if(_curatorStatus(target) == Status.REGISTERED) {
        curators[id].status = Status.WHITELISTED;
      }
    }
  }

  // Return curators status to none
  function blacklistCurators(address[] memory targets) public onlyOwner {
    for(uint i = 0; i < targets.length; i++) {
      curators[curatorsId[targets[i]]].status = Status.NONE;
    }
  }

  // Return curator's address.
  function _getCuratorAddr(uint curatorId) internal view returns(address _curator) {
    require(curatorId < curators.length, "21");
    _curator = curators[curatorId].addr;
  }

}

/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and making it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }

    function _nonReentrantBefore() private {
        // On the first call to nonReentrant, _status will be _NOT_ENTERED
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;
    }

    function _nonReentrantAfter() private {
        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Returns true if the reentrancy guard is currently set to "entered", which indicates there is a
     * `nonReentrant` function in the call stack.
     */
    function _reentrancyGuardEntered() internal view returns (bool) {
        return _status == _ENTERED;
    }
}

interface ITrustee {
  error NothingToWithdraw();

  function splitPayment(
    IJob.Jobber[] memory tos, 
    uint netPay,
    uint fee,
    uint refundable,
    address feeTo
  ) external returns(bool);

  function withdraw() external payable returns(bool);
}

/**
  @title Trustee: Manages payment for parties to job i.e hirer and jobber.
  @author Bobeu : https://github.com/bobeu 

  ERROR CODE
  ----------
  "18" : Withdrawal failed
  "19" : Bal < netPay
  "20" : NothingToWithdraw
 */
contract Trustee is ITrustee, Ownable, ReentrancyGuard {
  // Amount withdrawable by hirer from this contract at any time.
  uint256 public withdrawable;

  // Amount engaged at any time
  uint256 public engaged;

  //Job owner
  address public hirer;

  // tESTUSDT address
  address public tESTUSDT;

  //Payment ledger
  mapping(address => uint256) public payment;

  constructor (address hirer_, address _tESTUSDT) {
    hirer = hirer_;
    tESTUSDT = _tESTUSDT;
  }

  receive() external payable {}

  /**
    @dev Splits payment for jobbers on this hirer's request.
    Note hirer is able to withdraw available balances in this contract, but 
        we ensure withdrawables does not affect the position of currently 
        engaged jobbers.
  */
  
  function splitPayment(
    IJob.Jobber[] memory tos, 
    uint netPay,
    uint fee,
    uint refundable,
    address feeTo
  ) external onlyOwner returns(bool) {
    // require(feeTo != address(0), "W");
    uint _balances = _getBalances();
    uint size = tos.length;
    uint eachPay = netPay / size;

    if(_balances < (netPay + fee)) revert('Trustee: Balances too low');
    if(fee > 0) { _withdraw(feeTo, fee); }
    if(netPay > 0) {
      for(uint i = 0; i < size; i++ ){
        address to = tos[i].identifier;
        payment[to] += eachPay;
      }
    }
    if(refundable > 0) {
      payment[_hirer()] += refundable;
    }

    return true;
  }
  
  function _getTUSDAddr() private view returns(address _token) {
    _token = tESTUSDT;
  }

  /**
    @dev Withdraw payment.
        Only preselected address are allowed.
   */
  function withdraw() external payable nonReentrant returns(bool) { 
    address to = _msgSender();
    uint pay = payment[to];
    require(pay > 0, "Trustee: Nothing to withdraw");
    payment[to] = 0;
    _withdraw(to, pay); 
    return true; 
  }

  function _withdraw(address to, uint amount) private {
    require(IERC20(_getTUSDAddr()).transfer(to, amount), 'Trustee: Withdrawal failed');
  
  }

  function _getBalances() internal view returns(uint _balances) {
    address token = _getTUSDAddr();
    _balances = IERC20(token).balanceOf(address(this));
  } 

  function _hirer() internal view returns(address) { return hirer ; }
}                                                     

interface IERC721Extended is IERC721, IERC721Receiver, IERC721Metadata {
  function pause() external;
  function unpause() external;
  function burn(uint256 tokenId) external returns(bool);
  function mint(address to, uint256 tokenId) external returns(bool);
}

interface IERC20Extended {

    /**
     * @dev Mints `amount` tokens from `from` to `to` 
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Mint} event.
     */
    function mint(
        address to,
        uint256 amount
    ) external returns (bool);
}

/**
 * @title SafeCall
 * @dev Wrappers around ERC20 operations that throw on failure (when the token
 * contract returns false). Tokens that return no value (and instead revert or
 * throw on failure) are also supported, non-reverting calls are assumed to be
 * successful.
 * To use this library you can add a `using SafeCall for IERC20 or ITrustee;` statement to your contract,
 * which allows you to call the safe operations as `token.safeTransfer(...)`, etc.
 */
library SafeCall {
    using Address for address;

    function safeTransfer(
        IERC20 token,
        address to,
        uint256 value
    ) internal {
        _callOptionalReturn(token, abi.encodeWithSelector(token.transfer.selector, to, value));
    }

    function safeTransferFrom(
        IERC20 token,
        address from,
        address to,
        uint256 value
    ) internal {
        _callOptionalReturn(token, abi.encodeWithSelector(token.transferFrom.selector, from, to, value));
    }

    function safeSplit(
        ITrustee trustee,
        IJob.Jobber[] memory tos, 
        uint netPay,
        uint fee,
        uint refund,
        address feeTo
    ) internal {
        _callTrusteeOptionalReturn(
            trustee, 
            abi.encodeWithSelector(
                    trustee.splitPayment.selector, 
                    tos,
                    netPay,
                    fee,
                    refund,
                    feeTo
                )
            );
    }

    function safeMint(
        IERC20Extended token,
        address to,
        uint256 value
    ) internal {
        _callOptionalReturnExt(token, abi.encodeWithSelector(token.mint.selector, to, value));
    }

    /**
     * @dev Deprecated. This function has issues similar to the ones found in
     * {IERC20-approve}, and its usage is discouraged.
     *
     * Whenever possible, use {safeIncreaseAllowance} and
     * {safeDecreaseAllowance} instead.
     */
    function safeApprove(
        IERC20 token,
        address spender,
        uint256 value
    ) internal {
        // safeApprove should only be called when setting an initial allowance,
        // or when resetting it to zero. To increase and decrease it, use
        // 'safeIncreaseAllowance' and 'safeDecreaseAllowance'
        require(
            (value == 0) || (token.allowance(address(this), spender) == 0),
            "SafeCall: approve from non-zero to non-zero allowance"
        );
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, value));
    }

    function safeIncreaseAllowance(
        IERC20 token,
        address spender,
        uint256 value
    ) internal {
        uint256 newAllowance = token.allowance(address(this), spender) + value;
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
    }

    function safeDecreaseAllowance(
        IERC20 token,
        address spender,
        uint256 value
    ) internal {
        unchecked {
            uint256 oldAllowance = token.allowance(address(this), spender);
            require(oldAllowance >= value, "SafeCall: decreased allowance below zero");
            uint256 newAllowance = oldAllowance - value;
            _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
        }
    }

    function safePermit(
        IERC20Permit token,
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal {
        uint256 nonceBefore = token.nonces(owner);
        token.permit(owner, spender, value, deadline, v, r, s);
        uint256 nonceAfter = token.nonces(owner);
        require(nonceAfter == nonceBefore + 1, "SafeCall: permit did not succeed");
    }

    /**
     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
     * on the return value: the return value is optional (but if data is returned, it must not be false).
     * @param token The token targeted by the call.
     * @param data The call data (encoded using abi.encode or one of its variants).
     */
    function _callOptionalReturn(IERC20 token, bytes memory data) private {
        // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since
        // we're implementing it ourselves. We use {Address.functionCall} to perform this call, which verifies that
        // the target address contains contract code and also asserts for success in the low-level call.

        bytes memory returndata = address(token).functionCall(data, "SafeCall: low-level call failed");
        if (returndata.length > 0) {
            // Return data is optional
            require(abi.decode(returndata, (bool)), "SafeCall: ERC20 operation did not succeed");
        }
    }
    /**
     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
     * on the return value: the return value is optional (but if data is returned, it must not be false).
     * @param token The token targeted by the call.
     * @param data The call data (encoded using abi.encode or one of its variants).
     */
    function _callOptionalReturnExt(IERC20Extended token, bytes memory data) private {
        // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since
        // we're implementing it ourselves. We use {Address.functionCall} to perform this call, which verifies that
        // the target address contains contract code and also asserts for success in the low-level call.

        bytes memory returndata = address(token).functionCall(data, "SafeCall: low-level call failed");
        if (returndata.length > 0) {
            // Return data is optional
            require(abi.decode(returndata, (bool)), "SafeCall: ERC20 operation did not succeed");
        }
    }

    /**
     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
     * on the return value: the return value is optional (but if data is returned, it must not be false).
     * @param trustee The trustee targeted by the call.
     * @param data The call data (encoded using abi.encode or one of its variants).
     */
    function _callTrusteeOptionalReturn(ITrustee trustee, bytes memory data) private {
        // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since
        // we're implementing it ourselves. We use {Address.functionCall} to perform this call, which verifies that
        // the target address contains contract code and also asserts for success in the low-level call.

        bytes memory returndata = address(trustee).functionCall(data, "SafeCall: low-level call failed");
        if (returndata.length > 0) {
            // Return data is optional
            require(abi.decode(returndata, (bool)), "SafeCall: ERC20 operation did not succeed");
        }
    }
}

library Lib {
  /**@dev PPerform boolean equality operation */
  function boolEq(bool actual, bool expected, string memory errorMessage) internal pure 
  {
    _compare(actual == expected, errorMessage);
  }

  /**@dev Perform equality operation on uint256 typed data*/
  function uint8Eq(uint8 actual, uint8 expected, string memory errorMessage) internal pure
  {
    _compare(actual == expected, errorMessage);
  }

  /**@dev Perform greater than or equals-to operation on uint8 typed data*/
  function uint8Ge(uint8 actual, uint8 expected, string memory errorMessage) internal pure
  {
    _compare(actual >= expected, errorMessage);
  }

  /**@dev Perform greater-than operation on uint8 typed data*/
  // function uint8G(uint8 actual, uint8 expected, string memory errorMessage) internal pure
  // {
  //   _compare(actual > expected, errorMessage);
  // }

  /**@dev Perform less-than operation on uint8 typed data*/
  function uint8L(uint8 actual, uint8 expected, string memory errorMessage) internal pure 
  {
    _compare(actual < expected, errorMessage);
  }

  /**@dev Perform equality operation on address typed data*/
  function addressEq(address actual, address expected, string memory errorMessage) internal pure 
  {
    _compare(actual == expected, errorMessage);
  }

  /**@dev Perform not-equals-to operation on address typed data*/
  function addressNE(address actual, address expected, string memory errorMessage) internal pure 
  {
    _compare(actual != expected, errorMessage);
  }

  /**@dev Perform equality operation on uint256 typed data*/
  function uint256Eq(uint256 actual, uint256 expected, string memory errorMessage) internal pure 
  {
    _compare(actual == expected, errorMessage);
  }

  /**@dev Perform greater than or equals-to operation on uint256 typed data*/
  function uint256GE(uint256 actual, uint256 expected, string memory errorMessage, uint8 toReturn) internal pure returns(uint256 _return)
  {
    _compare(actual >= expected, errorMessage);
    _return = toReturn == 0? actual : expected;
  }

  /**@dev Perform greater than operation on uint256 typed data*/
  function uint256G(uint256 actual, uint256 expected, string memory errorMessage, uint8 toReturn) internal pure returns(uint256 _return) {
    _compare(actual > expected, errorMessage);
    _return = toReturn == 0? actual : expected;
  }

  /**@dev Performs a single check with returned error messsage*/
  function uint256L(uint256 actual, uint256 expected, string memory errorMessage) internal pure 
  {
    _compare(actual < expected, errorMessage);
  }

  /**@dev Perform less than or equals-to operation on uint256 typed data*/
  function uint256LE(uint256 actual, uint256 expected, string memory errorMessage) internal pure 
  {
    _compare(actual <= expected, errorMessage);
  }

  /**@dev Performs a single check with returned error messsage*/
  function _compare(bool value, string memory errorMessage) internal pure 
  {
    require(value, errorMessage);
  }

  /**@dev Performs a single check with returned error messsage*/
  function getNetPay(uint256 grossPay) internal pure returns(uint256 _netPay, uint256 fee) {
    require(grossPay >= 1 ether, "Invalid gross amount" );
    fee = (grossPay * 5) / 100;
    _netPay = grossPay - fee;
  }

  function getAllowance(address token, address owner, address beneficiary) internal view returns(uint allowance) {
    allowance = IERC20(token).allowance(owner, beneficiary);
  }

  function spendAllowance(uint allowance, address token, address owner, address receiver) internal returns(uint _return) {
    if(allowance > 0) {
      require(IERC20(token).transferFrom(owner, receiver, allowance));
    }
    _return = allowance;
  }

  function encode(string memory arg) internal pure returns(bytes memory _return) {
    _return = abi.encode(arg);
  }

}

interface IJobber {
  event MembershipUpgraded(address indexed who);
  event MembershipDowngraded(address indexed who);

  function becomeAJobber(
    string memory name,
    string memory aka,
    string memory field,
    string memory profileURI,
    string memory avatar
  ) external payable returns(bool);
  function queryStatus(address target) external view returns(uint8);
  function getAvatarInfo(address jobber) external view returns(uint);
  function updateProfileInfo(string memory field, string memory profileURI, string memory avatar) external payable returns(bool);
}

interface ICommon {
    /**@dev Categories of jobber.  */
  enum Tier { NONE, PROBATION, APPROVED }

  struct Membership {
    Tier status;
    uint avatarId;
    JobberData other;
  }

  // membership
  struct MembershipBase {
    uint probFee;
    address upgrader;
  }

  struct JobberData {
    bytes name;
    bytes aka;
    bytes field;
    bytes profileURI;
    bytes avatar;
    uint8 ratings;
    uint8 level;
  }
  
}

interface IJob {
  error InvalidSelector(uint8);

  event CompletedJob(uint jobId, uint newSpotId, address indexed _trustee, address indexed hirer);
  event JobCanceled(uint jobId, uint amountRefundToHirer, uint amountPaidToJobbers);
  event JobCreated(uint jobId, uint offer, address trustee, string detail);
  event WorkRequested(
    uint jobId, 
    address indexed jobber, 
    uint actualOffer, 
    uint negotiatedPrice, 
    uint proposedCompletionDateInDays
  );
  event RequestApproved(uint jobId, uint8[] jobbers);
  event Submission(uint jobId, address indexed jobber);
  event JobCompleted(uint jobId);

  /**@dev Steps of jobs. Each job inherits the {JobStatus.CLOSED} status by default which is 
    synchronous, and can only be in one step at any given time.  
   */
  enum JobStatus { NULL, OPEN, TAKEN, COMPLETED, CLOSED }

  // Job type
  enum JobType { ONEOFF, PARTTIME, FULLTIME }

  /**
    @dev Camp all kinds of fees applicable.
      o PROBATION: By jobbers on sign up.
      o APPROVED: By jobbers while upgrading.
      o CANCELLATION: Paid by Hirer for cancelling jobs that are already engaged.
      o PLATFORMONCANCEL: Fee charged in favor of the platform, computed on gross value of CANCELLATION.
      o WITHDRAWAL: BY Jobbers as % of earning.
  */
  enum Fees { PROBATION, APPROVED, CANCELLATION, PLATFORMONCANCEL, WITHDRAWAL}

  /**
    @dev Post a new job. 
    @param jobRef - Link or any reference of type string to the job.
    @param proposedEndDateInDays - Proposed/preferred assigned time to execute the job.
    Note - Should be in days.
  */

  function postJob(
    uint8 jobType,
    string memory title,
    string[] memory tags,
    string memory jobRef, 
    uint16 proposedEndDateInDays, 
    uint offerPrice, 
    uint curatorId
  ) external payable returns(uint jobId);
  function requestToWork(uint256 jobId, uint16 proposedCompletionDateInDays, uint256 myBestPrice) external returns(bool);
  function approveRequests(uint jobId, uint8[] memory selectedPositions) external returns(bool);
  function submitAndSignCompletion(uint jobId) external returns(bool);
  function approveCompletion(uint jobId) external returns(bool);
  function cancelJob(uint jobId) external returns(bool);
  // function becomeAJobber() external payable returns(bool);
  function getJobInfo(uint jobId) external view returns(JobMetadata memory);

  //Job's subdata type
  struct Metadata {
    JobType jobType;
    bytes title;
    bytes jobRef;
    uint8 signature;
    uint64 datePosted;
    uint64 proposeEnd;
    uint256 offerPrice;
    address hirer;
    JobStatus jStatus;
  
  }

  //Job data type
  struct JobMetadata {
    Metadata job;
    Jobber[] requests;
    bytes[] tags;
    address curator;
  }

  //Jobber's data type
  struct Jobber {
    uint64 proposedJobEnd;
    uint256 myBestPrice;
    address identifier;
    bool signed;
    bool acceptance;
  }

}

abstract contract Storage is IJob {
  using Lib for *;

  ///@dev Minimum threshold for all job offers.
  uint256 public minimMumOffer;

  address public jobberContract;

  //Account to receive fee
  address public feeTo;

  // Stablecoin address
  address public paymentCurrency;

  ///@dev Cancellation rate
  uint8 public cancellationRate;

  ///@dev Limits the offer probationary members can accept.
  uint public probationOfferLimit;

  // Array of jobs
  JobMetadata[] private jobs;

  /**@dev Mapping of addresses in Jobs to position 
    i.e Jobber's position in the list of collaborators
    for each posted jobs.
  */ 
  mapping(address => mapping(uint => uint8)) private positions;

  //Mapping of Jobbers to compliance
  mapping(address => uint64) private compliance;

  /**@dev Guards against error accessing non-exisitng item in the job array.
            Job must be in an acceptable status.
  */
  modifier enforceJobStatus(uint256 jobId, JobStatus _jobStat)
  {
    uint8 jStatus = uint8(jobs[jobId].job.jStatus);
    jStatus.uint8Eq(uint8(_jobStat), "12");
    _;
  }

  modifier isJobIdValid(uint jobId) {
    uint jobIndex = jobs.length;
    jobId.uint256LE(jobIndex, "7");
    _;
  }

  constructor(address _feeTo, address token, address _jobberContract) {
    feeTo = _feeTo;
    paymentCurrency = token;
    jobberContract = _jobberContract;
  }

  function _initialize (
    uint8 _cancellationRate, 
    uint _minimMumOffer, 
    address _paymentCurrency,
    address _jobbersContract
  )
    internal 
  {
    minimMumOffer = _minimMumOffer;
    cancellationRate = _cancellationRate;
    paymentCurrency = _paymentCurrency;
    jobberContract = _jobbersContract;
  }

  function _now() internal view returns(uint64 _return) {
    _return = uint64(block.timestamp);
  }

  /**@dev Cancels job @param jobId - {job index}
    Note : Hirer is at liberty to cancel job anytime if:
        - Deadline has elapsed, or
        - Job in states other than completed.
      o Cannot cancel completed jobs.
    They're surcharged if wish to cancel when it is opened or taken and interest already shown.
    Cancellation fee (less platform fee) is splitted among collaborators.
  
   */
  function _removeJob(uint jobId) internal virtual isJobIdValid(jobId) returns (uint refund, uint platformFee, uint splittable, Jobber[] memory requests) {
    JobMetadata memory j = _getJobData(jobId);
    requests = j.requests;
    refund = j.job.offerPrice;
    msg.sender.addressEq(j.job.hirer, "3");
    require(uint8(j.job.jStatus) < uint8(JobStatus.COMPLETED), "16");

    if(j.job.jStatus == JobStatus.TAKEN || _now() > (j.job.datePosted + 24 hours)) {
      uint8 rate = _getCancellationRate();
      if(rate > 0) {
        uint cancellationFee = (refund * rate) / 100;
        unchecked {
          refund = refund - cancellationFee;
          platformFee = (cancellationFee * 15) / 100;
          splittable = cancellationFee - platformFee;
        }
      }
    }
    
    delete jobs[jobId];
  }

  //Returns cancellation rate: #Gas saving
  function _getCancellationRate() internal view returns (uint8 cRate) {
    cRate = cancellationRate;
  }

  /**
    @dev Returns job at jobId in storage 
      @param jobId - Job index/position.
  */
  function _getJobData(uint jobId) internal view virtual returns (JobMetadata memory _jobD ){ 
    _jobD = jobs[jobId]; 
  }

  /**
    @dev Populates job in job array in storage 
      @param jobRef - Job link or can be any string or byte;
      @param proposeEnd - Expected time to complete job;
      @param offerPrice - Price offer for this job;
        Note - We explicitly initialize 5 empty interest slots for 
                each job created.
    
      @notice 
  */
  function _postJob( 
    uint8 jobType,
    string memory title,
    string[] memory tags,
    string memory jobRef, 
    uint256 proposeEnd, 
    uint256 offerPrice,
    address hirer,
    address curator
  ) internal virtual returns(uint jobId) {
    require(jobType < 3, "19");
    jobId = jobs.length;
    jobs.push();
    jobs[jobId].job = Metadata(
                                JobType(jobType),
                                title.encode(),
                                jobRef.encode(), 
                                0, 
                                _now(), 
                                uint64(proposeEnd), 
                                offerPrice, 
                                hirer, 
                                JobStatus.OPEN
                              );
    jobs[jobId].curator = curator;
    for(uint8 i = 0; i < tags.length; i++) {
      jobs[jobId].tags.push(tags[i].encode());
    }
  }

  /**
    @dev Returns position for jobber on job at jobId in storage 
      @param jobber - Subject.
      @param jobId - Job index/position.
  */
  function _getPosition(address jobber, uint jobId) internal view virtual returns (uint8) 
  { return positions[jobber][jobId]; }

  /**
     @dev Returns updates position for jobber 
      @param jobber - Subject.
      @param jobId - Job index/position.
  */
  function _assignAndUpdateIndex(address jobber, uint jobId) internal virtual returns (uint8)
  {
    uint8 newPos = _createNewIndex(jobId);
    positions[jobber][jobId] = newPos;
    return newPos;
  }

  /**
    @dev Returns interests for job at jobId in storage 
      @param jobId - Job index/position.
  */
  function _getJobRequests(uint jobId) internal virtual view returns (Jobber[] memory req) 
  {
    req = jobs[jobId].requests;
  }

  /**
     @dev Returns updates position for jobber 
      @param jobber - Subject.
      @param jobId - Job index/position.
      @param proposedCompletionDateInDays - Jobber's proposed completion 
            time (in days),
      @param proposedOffer - Jobber's preferred price.
  */
  function _createAndUpdateNewRequest(
    address jobber, 
    uint jobId,
    uint64 proposedCompletionDateInDays,
    uint proposedOffer
  ) internal virtual 
  {
    _assignAndUpdateIndex(jobber, jobId);
    jobs[jobId].requests.push(
      Jobber(
        proposedCompletionDateInDays,
        proposedOffer,
        jobber,
        false,
        false
      )
    );
  }

  /**
    @dev Returns all jobs in storage 
  */
  function _getAllJobs() internal virtual view returns (JobMetadata[] memory _jobs) 
  {
    _jobs = jobs;
    return _jobs;
  }

  /**
    @dev Returns job at jobId from storage 
      @param jobber - Subject
  */
  function _getCompliance(address jobber) internal virtual view returns (uint64) 
  {
    return compliance[jobber];
  }

  /**
    @dev Returns job at jobId from storage 
      @param jobber - Subject
      @param value - Value to update for subject
  */
  function _postComplianceFor(address jobber, uint value) internal virtual 
  {
    compliance[jobber] = uint32(value);
  }

  /**@dev Generates new interest position for @param jobId - {Job index} */
  function _createNewIndex(uint jobId) private view returns (uint8) 
  {
    return uint8(jobs[jobId].requests.length);
  }

  function _queryJobberStatus(address target) internal virtual view returns(uint8 _return) {
    _return = IJobber(jobberContract).queryStatus(target);
  }

  /**@dev Enforces compliance. Jobbers with HiWork Probationary Membership
        are expected to upgrade within 60 days by undergoing compentency 
        test to upgrade by interacting with the probationer contract. 

      @notice - If jobber already passed test, they're encouraged to explicitly upgrade
        by calling designated function.
  */
  function _enforceCompliance(address caller) 
    internal
    virtual 
  {
    uint8 _status = _queryJobberStatus(caller);
    if(_status == 1) //i.e "Member on probation. 
    {
      uint64 startProbation = _getCompliance(caller);
      if(startProbation == 0) compliance[caller] = uint64(block.timestamp);
      else require(block.timestamp < startProbation + (60 * 1 days), "10");
    }

    if(_status == 0) revert ("1");
  }

  /**@dev Internal: Updates Job completion status. */
  function _setStatus(uint jobId, JobStatus status) internal virtual returns (bool) 
  {
    jobs[jobId].job.jStatus = status;
    return true;
  }

  /**@dev Updates signature for job 
        @param jobId {Job index} with 
        @param value - {New signature}
  */
  function _updateSignature(uint jobId, uint8 value) internal virtual 
  {
    jobs[jobId].job.signature = value;
  }

  /**@dev Updates signature for specific job 
        @param jobId {Job index} with 
        @param pos - Jobber's position
  */
  function _updateSignedFlag(uint jobId, uint8 pos) internal virtual 
  {
    jobs[jobId].requests[pos].signed = true;
  }

  /**@dev Updates request for Jobber at pos 
      @param jobId - job Index
      @param pos - Position of jobber for whom to update request
  */
  function _updateRequest(uint jobId, uint8 pos) internal virtual 
  {
    jobs[jobId].requests[pos].acceptance = true;
  }

  ///@dev Sets cancellatioon rate
  function _setCancellationRate(uint8 newFeeRate) internal virtual 
  {
    _beforeInvocation();
    cancellationRate = newFeeRate;
  }

  function _updateProposeEndDate(uint jobId, uint64 newDate) internal {
    jobs[jobId].job.proposeEnd = newDate; 
  }

  function setOfferLimit(uint _newLimit) public {
    _beforeInvocation();
    minimMumOffer = _newLimit;
  }

  function setProbationOfferLimit(uint _newLimit) public {
    _beforeInvocation();
    probationOfferLimit = _newLimit;
  }
  
  function _beforeInvocation() internal virtual {}
  function getLastJobId() public view returns(uint) {
    return jobs.length;
  }

}


abstract contract ReadOnly is Storage {
  constructor(address _feeTo, address token, address _jobberContract) Storage(_feeTo, token, _jobberContract) {}

  /**@dev Returns list of interested participants for a job 
          @param jobId - {job index} */
  function getRequests(uint jobId) public view isJobIdValid(jobId) returns(Jobber[] memory) 
  {
    return _getJobRequests(jobId);
  }

  /**@dev Read single job from storage.
      @param jobId - Job index
  */
  function getJobInfo(uint jobId) external view isJobIdValid(jobId) returns(JobMetadata memory) {
    return _getJobData(jobId);
  }

  /**@dev Read all jobs from storage.
  */
  function viewJobs() public view returns(JobMetadata[] memory all) {
    return _getAllJobs();
  }

  /**
    @dev See { Storage - _getPosition} 
      @param jobId - Job index/position.
  */
  function getPosition(address jobber, uint jobId) public view isJobIdValid(jobId) returns (uint8) 
  {
    return uint8(_getPosition(jobber, jobId));
  }

}

contract JobberCraft_Flat is ReadOnly, Pausable, Curators {
  using Lib for *;

  error TestError(address pay, uint offer, address caller);

  // Contract initializer. Useful in testing and minor upgrade
  uint8 private initializer;

  //Mapping of hirer to trustee
  mapping (address => address) public trustees;

  // Caller must be a valid member of JobberCraft
  modifier isValidMember() {
    require(_queryJobberStatus(_msgSender()) > 0, "1");
    _;
  }

  /**@dev Initialized storage vars 
   * @param _initializer : Used to set initial parameters. 
   *  The parameters can only be altered the number of times the _initializer was set.
  */
  constructor (uint8 _initializer, address _feeTo, address token, address _jobberContract) ReadOnly(_feeTo, token, _jobberContract) { 
    initializer = _initializer; 
  }

  function initialize (
    uint8 _cancellationRate,
    uint256 _minimMumOffer, 
    address _paymentCurrency,
    address _jobbersContract
  ) public onlyOwner {
      require(initializer > 0, "13");
      initializer --;
    _initialize (
      _cancellationRate, 
      _minimMumOffer, 
      _paymentCurrency,
      _jobbersContract 
    );
  }

  //Fallback/Receive func
  receive () external payable {
    Address.sendValue(payable(feeTo), msg.value);
  }

  /**@dev Posts new Job
          @param jobRef - Can be Job URL or any reference to the current job.
          @param proposedEndDateInDays - Expected duration to complete the job.
          @param curatorId : On the frontend, curators are mapped to their respective ids,
                  Hirers may add curator service or not.
          @param offerPrice : The amount in stable coin the hirer is willing to pay for this job.
          Note - Hirer must have given approval to withdraw the offerPrice in uSDT, which
                  must also be greater than minimum offer.
                  Note : Payment currency is in uSDT. 
  */
  function postJob(
    uint8 jobType,
    string memory title,
    string[] memory tags,
    string memory jobRef, 
    uint16 proposedEndDateInDays, 
    uint offerPrice, 
    uint curatorId
  ) external payable whenNotPaused returns(uint jobId) {
    address _trustee = trustees[_msgSender()];
    if(_trustee == address(0)) {
      _trustee = address(new Trustee(_msgSender(), paymentCurrency));
      trustees[_msgSender()] = _trustee;
    }
    paymentCurrency
      .getAllowance(_msgSender(), address(this))
        .uint256GE(minimMumOffer, '14', 0)
          .uint256GE(offerPrice, '14', 1)
            .spendAllowance(paymentCurrency, _msgSender(), _trustee);
            // .uint256G(1e18, '14', 0)

    unchecked {
      offerPrice = offerPrice - 1e18;
    }
    jobId = _postJob(jobType, title, tags, jobRef,  uint64(proposedEndDateInDays * 1 days),  offerPrice,  _msgSender(),  _getCuratorAddr(curatorId));
    emit JobCreated(jobId, offerPrice, _trustee, jobRef);
    
    return jobId;
  }

  /**
    @dev Jobbers show interest to work on a particular job
        @param jobId - The Job id Jobber is applying for. An id not greater than the job array 
          length is expected.
        @param proposedCompletionDateInDays - Jobbers can propose completion date.
          This however should not be confused for that of the hirer. Hirer will eventually
          accept or reject the proposal date. 
        Note: The parameter "proposedCompletionDateInDays" should be in days e.g 7
        @param myBestPrice - Best price jobber will accept the job. This enables better negotiation
          thereby protecting the interests and rights of both parties.
        
        Note: Intending Jobber applying for this job must either be on probation or approved member.  
   */
  function requestToWork(
    uint256 jobId, 
    uint16 proposedCompletionDateInDays, 
    uint256 myBestPrice
  ) external whenNotPaused isValidMember isJobIdValid(jobId) enforceJobStatus(jobId, JobStatus.OPEN) returns(bool) {
    JobMetadata memory j = _getJobData(jobId);
    address caller = _msgSender();
    uint bestRate = myBestPrice == 0 ? j.job.offerPrice : myBestPrice;
    uint64 completionDate = proposedCompletionDateInDays == 0 ? j.job.proposeEnd : proposedCompletionDateInDays * 1 days;
    
    _enforceJobOfferLimit(j.job.offerPrice, caller);
    _enforceCompliance(caller);
    require(proposedCompletionDateInDays > 0 && proposedCompletionDateInDays < 365 days, "7");
    _createAndUpdateNewRequest(
      caller, 
      jobId,
      completionDate,
      bestRate
    );

    _postComplianceFor(caller, block.timestamp);

    emit WorkRequested(jobId, caller, j.job.offerPrice, myBestPrice, completionDate);
    return true;
  }

  /**@dev Hirer accepts request (s) to work on job.
        @param jobId - Job index
        @param selectedPositions - List of jobbers hirer accepts 
                            to collaborate on the job.
                            It should contain jobbers' 
                            position Id.
        Note - Caller be the creator of job at jobId
              - Job must be open.
              - There must be requests greater than 0.
              It is assumed Hirer has scrutinized properly, the interests shown in job at 
                jobId, hence, proposed completion time of each collaborator is 
                evaluated, and that best satisfy the hirer's interest.
  */
  function approveRequests(
    uint jobId, 
    uint8[] memory selectedPositions
  ) 
    external 
    whenNotPaused 
    isJobIdValid(jobId) 
    enforceJobStatus(jobId, JobStatus.OPEN)
    returns(bool)
  {
    JobMetadata memory j = _getJobData(jobId);
    _onlyHirerOrCurator(j.job.hirer, _msgSender(), j.curator, true);
    j.requests.length.uint256GE(1, "2", 0);
    for(uint8 i = 0; i < selectedPositions.length; i++) {
      uint8 sel = uint8(selectedPositions[i]);
      j.requests[sel].identifier.addressNE(address(0), "8");
      uint64 jobbersProposedJobEnd = j.requests[sel].proposedJobEnd;
      _updateRequest(jobId, sel);
      if(jobbersProposedJobEnd > j.job.proposeEnd) {
        _updateProposeEndDate(jobId, jobbersProposedJobEnd);
      }
    }
    _setStatus(jobId, JobStatus.TAKEN);

    emit RequestApproved(jobId, selectedPositions);
    return true;
  }

   /**@dev Utility to submit completed jobs.
        Note: We enforce strict rules that ensure caller is a 
                valid collaborator since position of any valid
                collaborator will always be greater than zero. 
          - If there is only one collaborator, we simply set 
              completion and exit the program.
          - If collaborator is more than one, we check that caller's 
              signature is not appended before now, otherwise the program reverts.

        Note If collaborator is more than one, then minimum of 2 signatures
              are required to  set job state to `completed`.
      @param jobId - Job index/position.
   */
  function submitAndSignCompletion(uint jobId) 
    public 
    isValidMember 
    isJobIdValid(jobId) 
    whenNotPaused
    enforceJobStatus(jobId, JobStatus.TAKEN) 
    returns(bool _return)
  {
    JobMetadata memory j = _getJobData(jobId);
    address caller = _msgSender();
    uint8 pos = _getPosition(caller, jobId);
    j.requests[pos].signed.boolEq(false, "9");
    if(j.requests.length == 1) return _setStatus(jobId, JobStatus.COMPLETED);
    uint8 sig;
    //If there was at least one signature
    if((j.job.signature + 1) == 2) {
      sig = 2;
      _return = _setStatus(jobId, JobStatus.COMPLETED);
    }

    //If there was no previous signature
    if((j.job.signature + 1) < 2) {
      sig = 1;
      _return = true;
    }
    _updateSignature(jobId, sig);
    _updateSignedFlag(jobId, pos);
    emit Submission(jobId, caller);

    return _return;
  }

  /**Hirer confirms and approve that job at jobId was completed and final.
        Note - Payment (less fee) is splitted among the jobbers.
              o Jobbers are able to withdraw payment from the trustee.
              o Rewards are minted to jobbers.
               Function is able to handle if there was collaboration or not.
        @param jobId - Job index.
  
  */
  function approveCompletion(uint jobId) 
    external 
    whenNotPaused
    enforceJobStatus(jobId, JobStatus.COMPLETED) 
    isJobIdValid(jobId) returns(bool) 
  {
    JobMetadata memory j = _getJobData(jobId);
    _onlyHirerOrCurator(j.job.hirer, _msgSender(), j.curator, true);
    _setStatus(jobId, JobStatus.CLOSED);
    (uint256 netPay, uint256 fee) = j.job.offerPrice.getNetPay();
    address _trustee = trustees[j.job.hirer];
    // uint len = j.requests.length;
    // require(_trustee != address(0), 'd');
    unchecked {
      SafeCall.safeSplit(ITrustee(_trustee), j.requests, netPay, fee + 1e18, 0, feeTo);
    }

    emit JobCompleted(jobId);
    return true;
  }

  /**@dev Internal: Enforces that Probationary members cannot accept jobs with 
      offer above certain limit e.g $500
      @param offerPrice - Actual price Hirer is willing to pay for
                            the job offer.
      Note :  We enquire from HPM NFT contract if caller owns a 
                balance. We can be sure that each jobber cannot hold
                more than 1 NFT collection at any time.
            o NFT membership is not transferable.
   */
  function _enforceJobOfferLimit(uint256 offerPrice, address jobber) internal view {
    uint256 c1 = IJobber(jobberContract).getAvatarInfo(jobber);
    // if(c1 == 1) revert("Here");
    if(c1 == 1) {
      if(probationOfferLimit > 0) {
        offerPrice.uint256LE(probationOfferLimit, "4");
      }
    }
  }

  ///@dev Checks if caller is the hirer with jobId
  function _onlyHirerOrCurator(address hirer, address caller, address curator, bool doubleCheck) internal virtual {
    bool pass;
    if(caller == hirer) pass = true;
    if(!pass && doubleCheck) {
      if(curator != address(0)) {
        if(caller == curator) pass = true;
      }
    }
    require(pass, "15");
  }

  /**@dev Cancels job offer @param jobId - {Job index}
      Note 
        - Caller must be the hirer of Job with valid JobId.
        - Caller must not be a contract address.
        For more info, see { Storage.sol - _removeJob }
  
   */
  function cancelJob(uint jobId) external whenNotPaused isJobIdValid(jobId) returns(bool) {
    (uint refund, uint platformFee, uint splittable, Jobber[] memory requests) = _removeJob(jobId);
    address _trustee = trustees[_msgSender()];
    SafeCall.safeSplit(ITrustee(_trustee), requests, splittable, platformFee, refund, feeTo);

    emit JobCanceled(jobId, refund, splittable);
    return true;
  }

  /**
    @dev Withdraws from this contract if any.
        Note - Owner's privilege.
        @param to - Address to send funds to.
        @param amount - Amount to withdraw.
   */
  function withdraw(address to, uint amount) public onlyOwner{
    if(address(this).balance < amount) revert();
    (bool s,) = to.call{value: amount}("");
    if(!s) revert();
  }

  /** 
    @dev Halts contract execution 
      Note: Owner's privilege
  */
  function pause() public onlyOwner { _pause(); }

  /** 
    @dev Continues contract execution 
      Note: Owner's privilege
  */
  function unpause() public onlyOwner { _unpause(); }

    /**
    @dev Update cancellation fee.
        Note - Owner's privilege.
        @param newRate - Cancellation rate.
         Rate should not be greater than 100%.
   */
  function setCancellationRate(uint8 newRate) public onlyOwner {
    newRate.uint8L(100, "7");
    _setCancellationRate(newRate);
  }

  function _beforeInvocation() internal view override {
    require(_msgSender() == owner(), "17");
  }
}


    