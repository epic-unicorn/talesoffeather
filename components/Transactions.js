import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.API_URL);

const contract = require("../artifacts/contracts/FeatherTest.sol/FeatherTest.json");
const contractAddress = "0xC0a19730710dc95A90B03376a0C5455A71912c19";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

const Transactions = () => {
  const [mintAmount, setCount] = useState(1);
  const [mintedNFT, setMintedNFT] = useState(null);
  const [miningStatus, setMiningStatus] = useState(null);
  const [loadingState, setLoadingState] = useState(0);
  const [txError, setTxError] = useState(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);

  // Checks if wallet is connected
  const checkIfWalletIsConnected = async () => {
    console.log(process.env.NODE_ENV);

    const { ethereum } = window;
    if (ethereum) {
      console.log("Got the ethereum object: ", ethereum);
    } else {
      console.log("No Wallet found. Connect Wallet");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      console.log("Found authorized Account: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No authorized account found");
    }
  };

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain:" + chainId);

      const rinkebyChainId = "0x4";

      if (chainId !== rinkebyChainId) {
        alert("You are not connected to the Rinkeby Testnet!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Found account", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  // Checks if wallet is connected to the correct network
  const checkCorrectNetwork = async () => {
    const { ethereum } = window;
    let chainId = await ethereum.request({ method: "eth_chainId" });
    console.log("Connected to chain:" + chainId);

    const rinkebyChainId = "0x4";

    if (chainId !== rinkebyChainId) {
      setCorrectNetwork(false);
    } else {
      setCorrectNetwork(true);
    }
  };

  const incrementCount = () => {
      setCount(mintAmount + 1);    
  };

  const decrementCount = () => {
    if (mintAmount > 1) {
      setCount(mintAmount - 1);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkCorrectNetwork();
  }, []);

  // Creates transaction to mint NFT on clicking Mint button
  const mintFeather = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        //set up your Ethereum transaction
        const transactionParameters = {
          to: contractAddress,
          from: ethereum.selectedAddress,
          value: parseInt(
            ethers.utils.parseEther("0.001") * mintAmount
          ).toString(16), // hex
          gasLimit: "0",
          data: nftContract.methods.mintFeather(mintAmount).encodeABI(),
        };

        let nftTx = await ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });        
    
        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTx}`
        );
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("Error minting", error);
      setTxError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center pt-32 min-h-screen">
      {currentAccount === "" ? (
        <button
          className="text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-200 ease-in-out"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      ) : correctNetwork ? (
        <div>
          <div className="flex items-center mt-6 text-3xl font-bold">
            <button
              className="flex items-center justify-center w-12 h-12 bg-gray-400 hover:bg-gray-500 rounded-md text-center"
              onClick={incrementCount}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            <h2 className="mx-8">{mintAmount}</h2>

            <button
              className="flex items-center justify-center w-12 h-12 bg-gray-400 hover:bg-gray-500 rounded-md text-center"
              onClick={decrementCount}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12H4"
                />
              </svg>
            </button>
          </div>
          <button
            className="text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-200 ease-in-out"
            onClick={mintFeather}
          >
            Mint
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3">
          <div>----------------------------------------</div>
          <div>Please connect to the Rinkeby Testnet</div>
          <div>and reload the page</div>
          <div>----------------------------------------</div>
        </div>
      )}
      {loadingState === 0 ? (
        miningStatus === 0 ? (
          txError === null ? (
            <div className="flex flex-col justify-center items-center">
              <div className="text-lg font-bold">
                Processing your transaction
              </div>
            </div>
          ) : (
            <div className="text-lg text-red-600 font-semibold">{txError}</div>
          )
        ) : (
          <div></div>
        )
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="font-semibold text-lg text-center mb-4">
            Your Feather
          </div>
          <img
            src={mintedNFT}
            alt=""
            className="h-60 w-60 rounded-lg shadow-2xl shadow-[#6FFFE9] hover:scale-105 transition duration-500 ease-in-out"
          />
        </div>
      )}
    </div>
  );
};

export default Transactions;
