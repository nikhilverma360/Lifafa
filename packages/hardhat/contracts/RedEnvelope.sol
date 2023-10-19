// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract RedEnvelope is ReentrancyGuard, Pausable {
	using SafeERC20 for IERC20;

	enum EnvelopeType {
		ERC20,
		ERC721
	}

	struct Envelopes {
		EnvelopeType _type;
		address _contractAddress;
		string _name;
		string _messasge;
		uint256 _noOfUsers;
		uint256 _amountPerUsers;
		uint256 _claimsLeft;
		uint256 _expiry;
		bool _gameMode;
		uint256 _ERC20Amount;
		uint256 _ERC721TokenID;
	}
	mapping(address => uint256[]) public myEnvelopes;
	mapping(uint256 => Envelopes) public _Envelopes;

	function createEnvelope(
		EnvelopeType _type,
		address _contractAddress,
		string memory _name,
		string memory _messasge,
		uint256 _noOfUsers,
		uint256 _amountPerUsers,
		uint256 _tokenId,
		uint256 _expiry,
		bool _gameMode
	) public whenNotPaused {
		require(
			_expiry > block.timestamp,
			"Expiry Should be greater than current time"
		);
		uint256 _totalamount = _noOfUsers * _amountPerUsers;
		if (_type == EnvelopeType.ERC20) {
			require(_tokenId == 0, "No NFTs");
			require(
				_totalamount <= IERC20(_contractAddress).balanceOf(msg.sender),
				"Not enough tokens in your wallet, please try lesser amount"
			);
			IERC20(_contractAddress).safeTransferFrom(
				msg.sender,
				address(this),
				_totalamount
			);
		} else if (_type == EnvelopeType.ERC721) {
			require(_noOfUsers == 1, " Only 1 person can claim");
			require(_amountPerUsers == 1, " Only 1 NFT can claim at a time");
			require(
				IERC721(_contractAddress).ownerOf(_tokenId) == msg.sender,
				"You do not own this NFT"
			);
			IERC721(_contractAddress).transferFrom(
				msg.sender,
				address(this),
				_tokenId
			);
		}
		uint256 envelopeID = uint(
			keccak256(
				abi.encodePacked(msg.sender, block.difficulty, block.timestamp)
			)
		);
		myEnvelopes[msg.sender].push(envelopeID);
		_Envelopes[envelopeID] = Envelopes(
			_type,
			_contractAddress,
			_name,
			_messasge,
			_noOfUsers,
			_amountPerUsers,
			_noOfUsers,
			_expiry,
			_gameMode,
			_totalamount,
			_tokenId
		);
	}

	function claimEnvelopeById(uint256 _envelopeId) public nonReentrant {
		require(
			_Envelopes[_envelopeId]._expiry > block.timestamp,
			"The Enveloped has been expired"
		);
		require(_Envelopes[_envelopeId]._claimsLeft > 0, "No Claim Left");
		_Envelopes[_envelopeId]._claimsLeft =
			_Envelopes[_envelopeId]._claimsLeft -
			1;

		if (_Envelopes[_envelopeId]._type == EnvelopeType.ERC20) {
			require(
				_Envelopes[_envelopeId]._ERC20Amount <=
					IERC20(_Envelopes[_envelopeId]._contractAddress).balanceOf(
						address(this)
					),
				"Not enough tokens"
			);
			_Envelopes[_envelopeId]._ERC20Amount =
				_Envelopes[_envelopeId]._ERC20Amount -
				_Envelopes[_envelopeId]._amountPerUsers;
			IERC20(_Envelopes[_envelopeId]._contractAddress).safeTransferFrom(
				address(this),
				msg.sender,
				_Envelopes[_envelopeId]._amountPerUsers
			);
		} else if (_Envelopes[_envelopeId]._type == EnvelopeType.ERC721) {
			require(
				IERC721(_Envelopes[_envelopeId]._contractAddress).ownerOf(
					_Envelopes[_envelopeId]._ERC721TokenID
				) == address(this),
				"do not own this NFT"
			);
			_Envelopes[_envelopeId]._ERC721TokenID = 0;
			IERC721(_Envelopes[_envelopeId]._contractAddress).transferFrom(
				address(this),
				msg.sender,
				_Envelopes[_envelopeId]._ERC721TokenID
			);
		}
	}

	function getMyEnvelopes() public view returns (uint[] memory) {
		return myEnvelopes[msg.sender];
	}
}
