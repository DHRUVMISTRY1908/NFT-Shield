// Setup: npm install alchemy-sdk
import { ConstructionOutlined } from "@mui/icons-material";
import { Alchemy, Network } from "alchemy-sdk";
export default function test() {

const config = {
  apiKey: "rcBG6P4ZncpudOqWHHfVcE4eJHQ_7Gaz",
  network: Network.MATIC_MUMBAI,
};
const alchemy = new Alchemy(config);

const main = async () => {
  // Contract address
  const address = "0x8d958A5CDE9Ae64ca4c827744E9c2322f27Aa947";

  // Flag to omit metadata
  const omitMetadata = false;

  // Get all NFTs
  const response = await alchemy.nft.getNftsForContract(address, {
    omitMetadata: omitMetadata,
  });
  console.log(JSON.stringify(response, null, 2));
  console.log("yoyoyo")
};

// const runMain = async () => {
//   try {
//     await main();
//     process.exit(0);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };
return (
    <div>
        <h1>hellooo</h1>
        <button onClick={main}>Click Me</button>
    </div>
)
}