import React, { useEffect, useState } from "react";
import Cart from "./cart";
import { useRouter } from "next/router";
import { ProductCard } from "../components/ProductCard";
import { PropertyDeclaration } from "typescript";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db, storage } from "../firebase/firebase";
import axios from "axios";
import { useEffectOnce } from "../hooks/useEffectOnce";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import Head from "next/head";
import Wallet from "../components/wallet";
import { getAuth, deleteUser } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref } from "firebase/storage";
import { getCurrentWalletConnected } from "../components/interact";
import { toast } from "react-toastify";

export default function listedProducts() {
  const tokensCollectionRef = collection(db, "tokens");
  const authCollectionRef = collection(db, "role");
  const [final, setFinal] = useState<any>([]);
  const [final_address, setFinal_address] = useState<any>([]);
  const [wallet, setWallet] = useState<any>("");
  const [fb_name, setFb_name] = useState<any>([]);
  const [showNft, setShowNfts] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [metadataArray, setMetadataArray] = useState<any>([]);
  const [currentAccount, setCurrentAccount] = useState("");
  const [finalArray, setFinalArray] = useState<any>([]);



  const auth = getAuth();

  const checkIfWalletIsConnected = async () => {
    try {
      const ethereum = (window as any).ethereum;
      if (!ethereum) {
        console.log("Make sure you have a metamask wallet!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      //checking whether we are authorized to access the user's wallet
      const accounts = await ethereum.request({ method: "eth_accounts" });
      //searching for authorized wallets
      if (accounts.length !== 0) {
        //if the user's wallet contains multiple accounts then choose the second one
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
      //  }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffectOnce(() => {
  //   checkIfWalletIsConnected();
  // })

  const connectWallet = async () => {
    try {
      const ethereum = (window as any).ethereum;
      if (!ethereum) {
        // alert("Get Metamask!")
        toast.error("Get Metamask!-> https://metamask.io/", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      toast.success("Connected");
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    const q = query(
      tokensCollectionRef,
      where("address", "==", currentAccount)
    );

    const querySnapshot = await getDocs(q);
    const metadataArray = querySnapshot.docs.map((doc) => {
      console.log(doc.id, " => ", doc.data());
      return {
        name: doc.data()["name"],
        description: doc.data()["description"],
        image: doc.data()["image"],
        price: doc.data()["price"],
        manufacturer: doc.data()["manufacturer"],
        address: doc.data()["address"],
      };
    });

    //console.log(metadataArray);
    setMetadataArray(metadataArray);
    setShowNfts(true);
  };

  getData();

  

  return (
    <>
      <Head>
        <title>NFT project | Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-6 pt-6 pb-20 lg:px-8">
        <div>
          <nav
            className="flex h-9 items-center justify-between"
            aria-label="Global"
          >
            <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
              <h1 className="text-2xl">Admin</h1>
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
              <div className="pl-0 pr-0 grid grid-cols-3 gap-3">
                {/* <div> <a href="/listedProducts"> Listed Products </a> </div> */}
                <div>
                  <a href="/addProduct">Add Product</a>
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
                      href="/listedProducts"
                      className="6-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                    >
                      Listed Products
                    </a>
                    <a
                      href="/addProduct"
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      Add Product
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

      <h1 className="text-4xl">
        {" "}
        <b>Listed Products:</b>
      </h1>
      <div className="grid grid-cols-4 gap-8 p-12">
        {showNft &&
          metadataArray.map(
            (
              item: {
                manufacturer: string;
                name: string;
                image: string;
                description: string;
              },
              i: React.Key
            ) => (
              <div key={item.name} className="relative">
                <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 h-full">
                  <img className="p-8 rounded-t-lg" src={item.image} />
                  <div className="px-5 pb-5">
                    <h5 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {item.name}
                    </h5>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.description}
                    </p>
                    <div className="px-5 pb-5"></div>
                    <div className="flex items-center justify-between">
                      {/* <span className="text-3xl font-bold text-gray-900 dark:text-white">{item.price}<div className="text-sm inline-block">eth</div></span>
                <div className="absolute bottom-0 right-0 p-5"> <button onClick={() => handleClick(1)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Buy Now</button> </div> */}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </>
  );
}
