import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { createAlchemyWeb3, AlchemyWeb3 } from '@alch/alchemy-web3';
import contractAbi from '../contract-abi.json';
import { ethers } from 'ethers';
import Web3 from 'web3';

type Item = {
    title: string
    imageUrl: string
    price: string
}

declare global {
    interface Window {
        ethereum: any;
        contract: any;
    }
} 
let error: Error;

const Card: React.FC<Item> = ({ title, imageUrl, price }) => {
   
    const alchemyKey = "https://polygon-mumbai.g.alchemy.com/v2/9Qw39CfskaAAg9wjselR3nYSw1OH0xYG";
    const contractABI = require("../NftWarranty.json");
    const contractAddress = "0x24152538Dc63b901392f74D67586fEB7FBB003CF";
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(alchemyKey);

    const buyNft = async() =>{
        const NftCost = price
        console.log("Buying NFT", " with price: ", price);
        try {
          const { ethereum } = window;
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractAbi, signer);
            console.log("Going to pop wallet now to pay gas")
            let tx = await contract.resell();
          		console.log(tx);
          }
          else{
            console.log("Transaction failed")
          }
        } catch (error){
          console.log(error)
        }
    }

  return (
    <>
    <div className="max-w-xs mx-4 mb-2 rounded-lg shadow-lg cursor-pointer hover:scale-105">
      <img className="w-full" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{price}</p>
      </div>
      <div className="px-6 py-4">
        <button  onClick={() => buyNft()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" >
          Buy Now
        </button>
      </div>
    </div>
    </>
  )
}


export default Card

