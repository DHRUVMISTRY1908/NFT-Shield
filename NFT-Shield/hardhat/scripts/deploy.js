const { ethers } = require("hardhat");

async function main() {

  const NftWarrantyContract = await ethers.getContractFactory("NftWarranty");

  const deployedNftWarrantyContract = await NftWarrantyContract.deploy("Product", "prd");

  await deployedNftWarrantyContract.deployed();

  console.log("Contract Address:", deployedNftWarrantyContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
