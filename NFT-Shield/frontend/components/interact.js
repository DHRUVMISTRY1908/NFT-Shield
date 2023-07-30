import { useState } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants.ts";
import { pinJSONToIPFS } from "./pinata.js";
//require("dotenv").config();
//require("dotenv").config({ path: "../env" });
const alchemyKey = "https://polygon-mumbai.g.alchemy.com/v2/3OGlmNKSI58c0xfNbKDSTGZYRUwv86Jm";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
//const [uri, setUri] = useState([])
const web3 = createAlchemyWeb3(alchemyKey);
const contractABI = CONTRACT_ABI;
const contractAddress = CONTRACT_ADDRESS;
const fs = require('fs');

// export const mintNFT = async(url, name, description, price) => {
//  // const [data, setData] = useState([])
//  const data = []
//   //error handling
//   if (name.trim() == "" || description.trim() == "") {
//     return {
//      success: false,
//      status: "❗Please make sure all fields are completed before minting.",
//     }
//    }

//    //make metadata
//   const metadata = new Object();
//   metadata.name = name;
//   metadata.image = url;
//   metadata.description = description;
//   metadata.price = price;
//  // setResult(metadata);
//   //make pinata call
//   const pinataResponse = await pinJSONToIPFS(metadata);
//   if (!pinataResponse.success) {
//       return {
//           success: false,
//           status: "😢 Something went wrong while uploading your tokenURI.",
//       }
//   }
//   const tokenURI = pinataResponse.pinataUrl;
//   console.log(tokenURI);
//   data.push(tokenURI)
//   fs.writeFile("test.txt", data, function(err) {
//     if (err) {
//         console.log(err);
//     }
// });
  //setUri(uri => [...uri, tokenURI]);
  //uri.push(tokenURI)

// http://gateway.pinata.com/CID ---> TOKEN URI

  //load smart contract
  // window.contract = await new web3.eth.Contract(contractABI, contractAddress);//loadContract();

  // //set up your Ethereum transaction
  // const transactionParameters = {
  //     to: contractAddress, // Required except during contract publications.
  //     from: window.ethereum.selectedAddress, // must match user's active address.
  //     'data': window.contract.methods.safeMint(window.ethereum.selectedAddress, tokenURI).encodeABI() //make call to NFT smart contract 
  // };

  // //sign transaction via Metamask
  // try {
  //     const txHash = await window.ethereum
  //         .request({
  //             method: 'eth_sendTransaction',
  //             params: [transactionParameters],
  //         });
  //     return {
  //         success: true,
  //         status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash
  //     }
  // } catch (error) {
  //     return {
  //         success: false,
  //         status: "😥 Something went wrong: " + error.message
  //     }
  // }
  //}

// export const sendUri = async(uri) => {
//   const final_uri = uri;
//   return final_uri;
// }

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};
