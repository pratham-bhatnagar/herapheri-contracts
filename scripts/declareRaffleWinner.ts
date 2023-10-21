import { ethers } from 'ethers';

// Initialize your Ethereum provider and ERC20 contract
const provider = new ethers.providers.JsonRpcProvider('YOUR_JSON_RPC_URL');
const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider); // Replace with your private key
const erc20ContractAddress = 'YOUR_ERC20_CONTRACT_ADDRESS'; // Replace with the actual contract address
const erc20Contract = new ethers.Contract(erc20ContractAddress, ['function mint(address to, uint256 amount)'], wallet);

// Define the data containing the address and token amount
const data = {
  '0xexample': 23,
  '0xafjdfj2': 32,
  // Add more address and token amount pairs as needed
};

// Mint tokens for each address
async function mintTokens() {
  for (const address in data) {
    const amount = data[address];
    try {
      // Mint tokens for the current address
      const tx = await erc20Contract.mint(address, amount);
      await tx.wait();
      console.log(`Minted ${amount} tokens to address ${address}`);
    } catch (error) {
      console.error(`Error minting tokens to address ${address}: ${error.message}`);
    }
  }
}

mintTokens();
