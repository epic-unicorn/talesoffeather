import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useStatus } from "../context/statusContext";
import projectConfig  from "../config/projectConfig";

import {
  getTotalSupply,
  mintNFT,
  getSaleState,
} from "../utils/interact";

const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + projectConfig.siteDomain;

const Mint = () => {
  const {status, setStatus} = useStatus();
  const [count, setCount] = useState(1);
  const [totalSupply, setTotalSupply] = useState(0);
  const [isSaleActive, setIsSaleActive] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [loadingState, setLoadingState] = useState(0);

  useEffect(async () => {  
    printAppInfo();
    checkIfWalletIsConnected();
    checkCorrectNetwork();
    setIsSaleActive(await getSaleState());
    await updateTotalSupply();
  });

  function printAppInfo()
  {      
      console.log("VERCEL URL: " + process.env.NEXT_PUBLIC_VERCEL_URL);
      console.log("VERCEL environment: " + process.env.NEXT_PUBLIC_VERCEL_ENV);
  }

  // Checks if wallet is connected
  const checkIfWalletIsConnected = async () => {
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
      setWalletAddress(accounts[0]);

      ethereum.on("accountsChanged", function (accounts) {
        console.log("Account changed to: " + accounts[0]);
        window.location.reload();
      });
    } else {
      console.log("No authorized account found");
    }
  };

  // Checks if wallet is connected to the correct network
  const checkCorrectNetwork = async () => {
    const { ethereum } = window;
    let chainId = await ethereum.request({ method: "eth_chainId" });
    console.log("Connected to chain:" + chainId);

    const rinkebyChainId = "0x4";

    ethereum.on("chainChanged", (chainId) => {
      console.log("Chain ID changed to: " + chainId);
      window.location.reload();
    });

    if (chainId !== rinkebyChainId) {
      setCorrectNetwork(false);
    } else {
      setCorrectNetwork(true);
    }
  };

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        setStatus("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain:" + chainId);

      const rinkebyChainId = "0x4";

      if (chainId !== rinkebyChainId) {
        console.log("You are not connected to the Rinkeby Testnet!");
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

  const updateTotalSupply = async () => {
    const mintedCount = await getTotalSupply();
    setTotalSupply(mintedCount);
  };

  const incrementCount = () => {
    if (count < projectConfig.maxMintAmountPerTxn) {
      setCount(count + 1);
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const mintFeather = async () => {
    setStatus(null);
    setLoadingState(1);
    await mintNFT(count)
      .then((result) => {
        setLoadingState(0);
        setStatus(result.status);
      })
      .catch((error) => {
        console.error(error.status);
        setStatus(error.status);
      });

    // feather minted, update total supply
    updateTotalSupply();
  };

  return (
    <main id="main" className="h-screen py-16 bg-pattern">
      <div className="flex flex-col items-center ">
        {currentAccount === "" ? (          
          isMobile ? (
            <a href={metamaskAppDeepLink}>
              <button className="m-10 h-12 w-64 text-center uppercase text-xl font-bold bg-amber-400 hover:bg-amber-500 rounded-full">
                connect wallet
              </button>
            </a>
          ) : (
            <button
            className="m-10 h-12 w-64 text-center uppercase text-xl font-bold bg-amber-400 hover:bg-amber-500 rounded-full"
            onClick={connectWallet}
          >
            connect Wallet
          </button>
          )
        ) : correctNetwork ? (
          <div className="flex flex-col items-center ">
            <span className="mb-4">{walletAddress.substring(0, 5)}…{walletAddress.substring(walletAddress.length - 4)}</span>
            {isSaleActive ? (
              <div className="flex flex-col items-center">
                <span className="text-sm">{projectConfig.mintCost} Ξ</span>
                <span className="text-xl font-medium">
                  {`${totalSupply}`} / 5000
                </span>        
                <div className="flex items-center m-4 text-3xl font-bold bg-amber-400 rounded-full">
                  <button
                    className="flex items-center justify-center h-12 w-12 hover:bg-amber-500 text-center rounded-full"
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

                  <h2 className="mx-8">{count}</h2>

                  <button
                    className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-amber-500 text-center"
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
                  className="m-4 h-12 w-48 text-center uppercase text-xl font-bold bg-amber-400 hover:bg-amber-500 rounded-full"
                  onClick={mintFeather}
                >
                  Mint Feather!
                </button>                
              </div>
            ) : (
              <span>Sale is not started</span>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center font-bold text-2xl gap-y-3">
            You are not connected to Rinkeby Testnet.
          </div>
        )}

        {loadingState === 1 ? (
          <div className="flex flex-row items-center m-4">
            <svg
              role="status"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-amber-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span>Processing transaction...</span>
          </div>
        ) : (
          <div></div>
        )}

        {/* Status */}
        <span className="text-black">
          {status && (
            <div className="flex items-center justify-center px-4 py-4 mt-8 font-semibold text-black ">
              {status}
            </div>
          )}
        </span>
      </div>
    </main>
  );
};

export default Mint;
