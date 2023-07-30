import React, { useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import Head from "next/head";
//import { sendUri } from '../components/interact';

export default function Verify() {
  //const uri = sendUri();
  //console.log(uri);
  const [address, setAddress] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const [showNft, setShowNft] = useState<boolean>(false);

  const config = {
    apiKey: "3OGlmNKSI58c0xfNbKDSTGZYRUwv86Jm",
    network: Network.MATIC_MUMBAI,
  };
  const alchemy = new Alchemy(config);

  const handleClick = async () => {
    console.log(address);
    // Get all NFTs
    const nfts = await alchemy.nft.getNftsForOwner(address);
    console.log(nfts);
    setShowNft(true);

    //Print NFTs
    for (let i = 0; i < nfts.totalCount; i++) {
      // console.log(nfts.ownedNfts[i].rawMetadata);
      //
      if ("manufacturer" in nfts.ownedNfts[i].rawMetadata) {
        data.push(nfts.ownedNfts[i].rawMetadata);
      } else {
        console.log("No available Nft");
      }
    }
    console.log(data);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setAddress(e.currentTarget.value);
    //console.log(address)
  };

  return (
    <>
      <Head>
        <title>NFT project | Verify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="my-12 border-2 pt-8 w-2/6 rounded-3xl mx-auto bg-white border-[#16194F] border-solid border-2">
        <div className="flex flex-row justify-center mx-auto font-bold text-xl">
          Verify Your NFT
        </div>
        <input
          className="flex flex-row justify-center w-4/6 px-2 p-2.5 mt-10 mx-auto border-2 rounded-lg bg-[#CAC7FF] text-[#16194F]"
          placeholder="Wallet Address"
          type="text"
          onChange={handleChange}
        />
        <div className="flex w-full justify-center py-10">
          <input
            className="font-semibold bg-[#16194F] rounded-full py-4 px-8 text-gray-50 text-xl mr-2 mb-2 my-5 border-[#16194F] border-solid border-2 hover:bg-[#CAC7FF] hover:text-[#16194F] hover:cursor-pointer"
            type="submit"
            onClick={handleClick}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-8 p-12">
        {showNft &&
          data.map(
            (
              item: {
                name: string;
                image: string;
                description: string;
                manufacturer: string;
              },
              i: React.Key
            ) => (
              <div key={item.name}>
                <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 h-full">
                  <img className="p-8 rounded-t-lg" src={item.image} />
                  <div className="px-5 pb-5">
                    <h5 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {item.name}
                    </h5>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.description}
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.manufacturer}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </>
  );
}

// 167legR0GoM_CxCz8GFnjf7t0H7OmEe-
