import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected } from "./interact.js";
import { pinJSONToIPFS } from "./pinata.js";
import { db, storage } from "../firebase/firebase.ts";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants.ts";
import { v4 } from "uuid";

const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [fbImageUrl, setFbImageUrl] = useState("");
  const axios = require("axios");
  const contractABI = CONTRACT_ABI;
  const contractAddress = CONTRACT_ADDRESS;
  // const mongo_url = "mongodb+srv://krishicoc:<krishi1234>@cluster0.3xrp8qm.mongodb.net/?retryWrites=true&w=majority";
  // const dbName = 'nft_warranty';
  // mongo.connect(mongo_url, {useNewUrlParser: true }, (err, client) => {
  //   if (err) {
  //    console.error(err)
  //    return
  //  }
  //   console.log('Connected successfully to server')
  //   const db = client.db(dbName)
  //  })
  //  const collection = db.collection('tokens')

  useEffect(() => {
    const { address, status } = getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const mintNFT = async (name, description, price, manufacturer, url) => {
    // const [data, setData] = useState([])
    const data = [];
    //error handling
    if (name.trim() == "" || description.trim() == "") {
      return {
        success: false,
        status: "❗Please make sure all fields are completed before minting.",
      };
    }

    //make metadata
    const metadata = new Object();
    metadata.name = name;
    metadata.image = url;
    metadata.description = description;
    metadata.price = price;
    metadata.manufacturer = manufacturer;
    // setResult(metadata);
    //make pinata call
    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
      return {
        success: false,
        status: "😢 Something went wrong while uploading your tokenURI.",
      };
    }
    const tokenURI = pinataResponse.pinataUrl;
    console.log(tokenURI);

    const tokenCollectionRef = collection(db, "tokens");
    addDoc(tokenCollectionRef, {
      name: name,
      description: description,
      price: price,
      manufacturer: manufacturer,
      address: (await getCurrentWalletConnected()).address,
      image: url,
      uri: tokenURI,
    });
    //  data.push(tokenURI)
    //  console.log(data);
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/",
    };
  };

  //  collection.insertOne(tokenURI, ((error, item) => {
  //   if(error) {
  //    console.error(error)
  //    return
  //   }
  //    console.log(item)
  //  }));

  const onMintPressed = async () => {
    // const resFile = await axios({
    //   method: "post",
    //   url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    //   data: formData,
    //   headers: {
    //     pinata_api_key: `f0b240f130620f92c1a5`,
    //     pinata_secret_api_key: `a26e1298db68a4cfc157a22f64278a51bfe8a9bff9c177a125cd92be07ad06b1`,
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    //  const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
    //  console.log(ImgHash);
    // const url = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
    let temp_url = "";
    const upload = async () => {
      const formData = new FormData();
      formData.append("file", image);

      const imageRef = ref(storage, `images/${image.name + v4()}`);
      await uploadBytes(imageRef, image).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          temp_url = url;
          console.log(temp_url);
        });
      });
    };
    await upload();

    const { success, status } = await mintNFT(
      name,
      description,
      price,
      manufacturer,
      temp_url
    );
    setStatus(status);
    if (success) {
      setName("");
      setDescription("");
      setPrice(0);
    }

    // console.log(url);
  };

  //   return (
  //     <div className="Minter">
  //       <button id="walletButton" onClick={connectWalletPressed}>
  //         {String(walletAddress).length > 0 ? (
  //           "Connected: " +
  //           String(walletAddress).substring(0, 6) +
  //           "..." +
  //           String(walletAddress).substring(38)
  //         ) : (
  //           <span>Connect Wallet</span>
  //         )}
  //       </button>

  //       <br></br>
  //       <h1 id="title">Create Your Product</h1>
  //       <p>
  //         Simply add your asset's link, name, and description, then press "Mint."
  //       </p>
  //       <form>
  //         {/* <h2>🖼 Link to asset: </h2>
  //         <input
  //           type="text"
  //           placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
  //           onChange={(event) => setURL(event.target.value)}
  //         /> */}
  //         <h2>🤔 Name: </h2>
  //         <input
  //           type="text"
  //           placeholder="e.g. My first NFT!"
  //           onChange={(event) => setName(event.target.value)}
  //         />
  //         <h2>✍️ Description: </h2>
  //         <input
  //           type="text"
  //           placeholder="e.g. Even cooler than cryptokitties ;)"
  //           onChange={(event) => setDescription(event.target.value)}
  //         />
  //         <h2> Price : </h2>
  //         <input
  //           type="number"
  //           placeholder="Enter Price"
  //           onChange={(event) => setPrice(event.target.value)}
  //         />
  //         <h2 class="text-lg font-bold mb-2" required>
  //           🖼 Image:{" "}
  //         </h2>
  //         <input
  //           type="file"
  //           accept="image/*"
  //           onChange={(event) => setImage(event.target.files[0])}
  //         />
  //       </form>
  //       <input
  //         type="text"
  //         placeholder="e.g. Even cooler than cryptokitties ;)"
  //         onChange={(event) => setManufacturer(event.target.value)}
  //       />
  //       <button id="mintButton" onClick={onMintPressed}>
  //         Mint NFT
  //       </button>
  //       <p id="status" style={{ color: "red" }}>
  //         {status}
  //       </p>
  //     </div>
  //   );
  // };
  const renderInputForm = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:white dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-gray">
            <h1 id="title" className="text-2xl font-bold mt-1">
              Create Your Product
            </h1>

            <form className="space-y-4 md:space-y-6 ">
              <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-800 pt-1">
                {" "}
                Name:{" "}
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="e.g. My first NFT!"
                onChange={(event) => setName(event.target.value)}
              />
              <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-800 pt-1">
                {" "}
                Description:{" "}
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="e.g. Even cooler than cryptokitties ;)"
                onChange={(event) => setDescription(event.target.value)}
              />
              <label
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-800 pt-1"
                required
              >
                {" "}
                Price :{" "}
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                placeholder="Enter Price"
                onChange={(event) => setPrice(event.target.value)}
              />
              <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-800 pt-1">
                {" "}
                Manufacturer:{" "}
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Enter Manufacturer"
                onChange={(event) => setManufacturer(event.target.value)}
              />
              <label
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-gray-800 pt-1"
                required
              >
                {" "}
                Image:{" "}
              </label>
              {/* <input 
      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
      type="file" accept="image/*" onChange={(event) => setImage(event.target.files[0])}
    /> */}
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#16194F] border-dashed rounded-lg cursor-pointer bg-gray-50"
                >
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      className="bg-gray-100 h-40 flex justify-center items-center rounded-md overflow-hidden"
                      alt="Preview"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <input
                        id="dropzone-file"
                        type="file"
                        accept="image/*"
                        onChange={(event) => setImage(event.target.files[0])}
                        className="hidden"
                      />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </form>
            <button
              id="mintButton"
              onClick={onMintPressed}
              className="text-white bg-[#16194F] cursor-pointer border-[#16194F] border-solid border hover:drop-shadow-2xl hover:bg-[#CAC7FF] hover:text-[#16194F] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add
            </button>
            <p id="status" className="text-red-500 mt-4">
              {status}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div class="flex flex-col items-center justify-center">
        <button
          id="walletButton"
          onClick={connectWalletPressed}
          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          {String(walletAddress).length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>

        <br></br>
        {walletAddress && renderInputForm()}
      </div>
    </>
  );
};

export default Minter;
