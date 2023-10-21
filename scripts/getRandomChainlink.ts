import ethers from "ethers"; // You need to install ethers.js if you haven't already
import abi from "./abi.json";
// Set up your Ethereum provider and wallet
const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/kLrhq7FAdNkwiMLloECx1vC2XTFYHHGg"
);
const privateKey =
  "7b9e90cf80b84e95ccc81b7d816c7449df565cd47fce89a96baebc43847a92ad";
const wallet = new ethers.Wallet(privateKey, provider);

// Set up contract interface and contract address
const contractAddress = "0xD1e9eb6fC606aa91E47df6EA6f906D0B75B2F2Ed";

const contract = new ethers.Contract(contractAddress, abi, wallet);

// Function to request random words
async function requestRandomWords() {
  try {
    const tx = await contract.requestRandomWords({ gasLimit: 3000000 });
    const receipt = await tx.wait();
    console.log("Request sent. Transaction hash:", receipt.transactionHash);
  } catch (error) {
    console.error("Error requesting random words:", error);
  }
}

// Function to get the last request ID
async function getLastRequestId() {
  try {
    const lastRequestId = await contract.lastRequestId();
    return lastRequestId;
  } catch (error) {
    console.error("Error getting last request ID:", error);
  }
}

// Function to check if a request is fulfilled and get random words
async function checkRequestStatus(requestId) {
  try {
    const [fulfilled, randomWords] = await contract.getRequestStatus(requestId);
    if (fulfilled) {
      const random1 = ethers.BigNumber.from(randomWords[0]);
      const random2 = ethers.BigNumber.from(randomWords[1]);
      const randomNum = (random1.add(random2) % 100) + 1;
      return randomNum
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error checking request status:", error);
    return null;
  }
}

// Main function to request random words and wait for fulfillment
async function main() {
  await requestRandomWords();

  let requestId;
  while (true) {
    requestId = await getLastRequestId();
    if (requestId) {
      const random = await checkRequestStatus(requestId);
      if (random) {
        console.log(random);
        break;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
  }
}

// Call the main function to start the process
main();



