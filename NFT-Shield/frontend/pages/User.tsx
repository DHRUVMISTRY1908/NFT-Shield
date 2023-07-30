import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useRef,
  useState,
} from "react";
import { Slider } from "../components/Slider";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import { ConstructionOutlined, Description } from "@mui/icons-material";
import { Contract, ethers, Signer } from "ethers";
import { userAgent } from "next/server";
import { getCurrentWalletConnected } from "../components/interact";
import { providers } from "ethers";
import Web3Modal from "@web3modal/react";
import { useContract } from "../hooks/useContract";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";
import { BigNumber } from "ethers";
import { db, storage } from "../firebase/firebase";
import { getDocs, collection, query, where } from "@firebase/firestore";
import { async } from "@firebase/util";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffectOnce } from "../hooks/useEffectOnce";
import Head from "next/head";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import Wallet from "../components/wallet";
import { Dialog } from "@headlessui/react";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { ImageList } from "@mui/material";
const axios = require("axios");
const alchemyKey =
  "https://polygon-mumbai.g.alchemy.com/v2/3OGlmNKSI58c0xfNbKDSTGZYRUwv86Jm";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
//const [uri, setUri] = useState([])
const web3 = createAlchemyWeb3(alchemyKey);

export default function test() {
  const [data, setData] = useState<any>([]);
  const [showbtn, setShowbtn] = useState<boolean>(true);
  const [tokenId, setTokenId] = useState<any>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const tokensCollectionRef = collection(db, "tokens");
  const [final, setFinal] = useState<any>([]);
  const [new_data, setNewData] = useState<any>([]);
  const [new_address, setNew_address] = useState<any>([]);
  const auth = getAuth();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState<any>([]);
  const [image, setImage] = useState<any>([]);
  const [description, setDescription] = useState<any>([]);
  const [price, setPrice] = useState<any>([]);
  const [metadataArray, setMetadataArray] = useState<any>([]);
  const [imageList, setImageList] = useState<any>([]);
  const [finalArray, setFinalArray] = useState<any>([]);
  let new_list: (string | undefined)[] = [];

  // const web3ModalRef = useRef();
  //  const[name, setName] = useState<any>([]);
  const abi = CONTRACT_ABI;

  const address = CONTRACT_ADDRESS;

  //const omitMetadata = false;
  const main = async () => {
    const getMetadata = async () => {
      const querySnapshot = await getDocs(tokensCollectionRef);
      const imageListRef = ref(storage, "images/");
      querySnapshot.forEach((doc) => {
        metadataArray.push({
          name: doc.data()["name"],
          description: doc.data()["description"],
          image: doc.data()["image"],
          price: doc.data()["price"],
          manufacturer: doc.data()["manufacturer"],
          address: doc.data()["address"],
        });
      });
      await listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList((prev: any) => [...prev, url]);
          });
        });

        console.log(imageList);
      });
    };
    await getMetadata();
    // console.log(final);
    async function getData() {
      for (let i = 0; i < metadataArray.length; i++) {
        finalArray.push({
          Id: i,
          name: metadataArray[i].name,
          image: metadataArray[i].image,
          description: metadataArray[i].description,
          price: metadataArray[i].price,
          manufacturer: metadataArray[i].manufacturer,
          address: metadataArray[i].address,
        });
        //   console.log(finalArray);
      }
      setShowbtn(false);
    }

    await getData();
  };
  useEffectOnce(() => {
    main();
  });

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!user) {
    router.push("/");
    return <div> Please Sign in to Continue</div>;
  }

  const handleClick = async (Id: number, price: string) => {
    const querySnapshot = await getDocs(tokensCollectionRef);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      new_data.push(doc.data()["uri"]);
      new_address.push(doc.data()["address"]);
      // console.log(doc.id, " => ", doc.data());
    });

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, abi, signer);
      console.log("Going to pop wallet now to pay gas");
      console.log(price);
      window.contract = await new web3.eth.Contract(
        CONTRACT_ABI,
        CONTRACT_ADDRESS
      ); //loadContract();
      
      const transaction = await signer.sendTransaction({
        to: CONTRACT_ADDRESS,
        value: ethers.utils.parseEther("0.01"),
        gasLimit: 500000,
      });
      await transaction.wait();

      const contractBalance = await provider.getBalance(CONTRACT_ADDRESS);
      const transaction2 = await contract.transfer(new_address[Id], contractBalance);
      await transaction2.wait();

      console.log(provider.getBalance(CONTRACT_ADDRESS))

      const transactionParameters1 = {
        to: CONTRACT_ADDRESS,
        from: window.ethereum.selectedAddress,
        data: window.contract.methods
          .safeMint(window.ethereum.selectedAddress, new_data[Id])
          .encodeABI(), //make call to NFT smart contract,
      };
      //sign transaction via Metamask
      try {
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters1],
        });
        // txHash.wait();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        return {
          success: true,
          status:
            "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" +
            txHash,
        };

 
      } catch (error: any) {
        return {
          success: false,
          status: "😥 Something went wrong: " + error.message,
        };
      }
    }
  };

  // TODO : Pass manufacturer and display listed products --> DONE
  // TODO : Store admin address from add products to firebase and then transfer eth amount --> DONE
  return (
    <>
      <Head>
        <title>NFT project | User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="px-6 pt-6 pb-20 lg:px-8">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div>
          <nav
            className="flex h-9 items-center justify-between"
            aria-label="Global"
          >
            <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
              <h1 className="text-2xl">User</h1>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end bottom-0">
              <div className="pl-0 pr-0 grid grid-cols-3 gap-4">
                <div>
                  {" "}
                  <a href="/ownedProducts"> Owned Products </a>{" "}
                </div>
                <div>
                  {" "}
                  <Wallet />{" "}
                </div>
                <div>
                  <button
                    onClick={() => auth.signOut()}
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
              <div className="flex h-9 items-center justify-between">
                <div className="flex">
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                  </a>
                </div>
                <div className="flex">
                  <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="py-6">
                    <a
                      href="/ownedProducts"
                      className="6-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                    >
                      Owned Products
                    </a>
                    <div>
                      <button
                        onClick={() => auth.signOut()}
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                      >
                        Sign Out
                      </button>
                    </div>
                    <Wallet />
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </div>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex min-h-screen flex-col py-2 pr-8 pl-8">
        <h1 className="text-4xl">
          {" "}
          <b>Browse Products:</b>
        </h1>
        {/* {showbtn && (
          <button
            className="border-2 p-3 rounded-xl bg-black text-white"
            onClick={main}
          >
            Show Products
          </button>
        )} */}

        <div className="grid grid-cols-4 gap-8 p-12">
          {!showbtn &&
            finalArray.map(
              (item: {
                Id: number;
                name: string;
                image: string;
                description: string;
                price: string;
                manufacturer: string;
              }) => (
                <div key={item.Id} className="relative">
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
                      <div className="px-5 pb-5"></div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          {item.price}
                          <div className="text-sm inline-block">eth</div>
                        </span>
                        <div className="absolute bottom-0 right-0 p-5">
                          {" "}
                          <button
                            onClick={() => handleClick(item.Id, item.price)}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                          >
                            Buy Now
                          </button>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </>
  );
}
