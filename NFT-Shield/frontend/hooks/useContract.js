import { ethers } from "ethers";


export const useContract = (address, abi) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, abi, signer);
    return contract;
  } catch (e) {
    console.log(e);
    return false;
  }
};