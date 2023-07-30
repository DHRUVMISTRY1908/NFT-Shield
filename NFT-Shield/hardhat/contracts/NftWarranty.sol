// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract NftWarranty is
    ERC721URIStorage,
    Ownable,
    AutomationCompatibleInterface
{
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;
    using SafeMath for uint256;

    string public baseTokenURI;

    uint public burn_token;

    address private creator;

    uint public interval;
    uint public lastTimeStamp;

    struct NftInfo {
        string name;
        string description;
        uint256 startTime;
        uint256 EndTime;
        uint256 duration;
        bool soldOnce;
    }

    // 2 conditions : 1 sell ----> resell

    mapping(uint256 => NftInfo) public tokenIdToNftInfo;

    modifier checkForReSell(uint256 tokenId) {
        require(
            tokenIdToNftInfo[tokenId].soldOnce,
            "Product hasn't been sold yet"
        );
        _;
    }

    modifier checkForWarranty(uint256 tokenId) {
        require(
            block.timestamp <= tokenIdToNftInfo[tokenId].EndTime,
            "Warranty Expired"
        );
        _;
    }

    constructor(
        string memory nftName,
        string memory nftShort
    ) ERC721(nftName, nftShort) {
        interval = 5 minutes;

    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function safeMint(address payable to, string memory uri) public payable {
        uint256 tokenId = currentTokenId.current();
        currentTokenId.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        lastTimeStamp = block.timestamp;
        burn_token = tokenId;
        // tokenIdToNftInfo[tokenId].soldOnce = true;

    }

    function receiveEther() public payable {
        
    }

    // function reSell(
    //     uint256 tokenId,
    //     address payable buyer
    // ) public payable checkForReSell(tokenId) {
    //     safeTransferFrom(ownerOf(tokenId), buyer, tokenId);
    //     lastTimeStamp = block.timestamp;
    //     burn_token = tokenId;
    // }

    function burn(uint256 tokenId) public {
        super._burn(tokenId);
    }

    function getWarrantyduration(
        uint256 tokenId
    ) public view checkForWarranty(tokenId) returns (uint256) {
        return tokenIdToNftInfo[tokenId].EndTime - block.timestamp;
    }

    function checkUpkeep(
        bytes calldata //checkData
    ) external view override returns (bool upkeepNeeded, bytes memory /*performData*/) {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
    }

    function performUpkeep(bytes calldata performData) external override {
        if((block.timestamp - lastTimeStamp) > interval) {
            burn(burn_token);
        }
    }
    receive() external payable {}

    fallback() external payable {}
}
