const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

import rpcConfig from "../config/rpcConfig";
import projectConfig  from "../config/projectConfig";

const web3 = createAlchemyWeb3(rpcConfig(process.env.NEXT_PUBLIC_ALCHEMY_KEY));
const contract = require("../artifacts/contracts/FeatherTest.sol/FeatherTest.json");
const nftContract = new web3.eth.Contract(contract.abi, projectConfig.contractAddress);

export const getTotalSupply = async () => {
  const result = await nftContract.methods.totalSupply().call();
  return result;
};

export const getSaleState = async () => {
  const result = await nftContract.methods.saleIsActive().call();
  return result;
};

export const getTokensOfOwner = async () => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: (
        <p>
          <span className="px-2">Wallet not connected...</span>
        </p>
      ),
    };
  }
  const result = await nftContract.methods
    .tokensOfOwner(window.ethereum.selectedAddress)
    .call();
  return result;
};

export const getTokenUri = async (tokenId) => {
  const result = await nftContract.methods.tokenURI(tokenId).call();
  return result;
};

export const mintNFT = async (mintAmount) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: (
        <p>
          <span className="px-2">Wallet not connected...</span>
        </p>
      ),
    };
  }

  // set up your Ethereum transaction
  const transactionParameters = {
    to: projectConfig.contractAddress,
    from: window.ethereum.selectedAddress, 
    value: parseInt(web3.utils.toWei(projectConfig.mintCost, "ether") * mintAmount).toString(
      16
    ), // hex
    gasLimit: "0",
    data: nftContract.methods.mintFeather(mintAmount).encodeABI(),
  };
  //sign the transaction via Metamask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    const txHashLink = "https://rinkeby.etherscan.io/tx/" + txHash;
    return {
      success: true,
      status: (
        <a href={txHashLink} target="_blank">
          Transaction link: {txHashLink}
        </a>
      ),
    };
  } catch (error) {
    return {
      success: false,
      status: "Something went wrong: " + error.message,
    };
  }
};
