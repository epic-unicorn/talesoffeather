import React, { useState, useEffect } from "react";
import { useEthereumProvider } from "../hooks/useEthereumProvider";
import { useStatus } from "../context/statusContext";
import projectConfig from "../config/projectConfig";

import { getTotalSupply, mintNFT, getSaleState } from "../utils/interact";

const Mint = () => {
  const {status, setStatus} = useStatus();
  const [mintCount, setCount] = useState(1);
  const [totalSupply, setTotalSupply] = useState(0);
  const [isSaleActive, setIsSaleActive] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [connErrMsg, setConnErrMsg] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [message, setMessage] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const {isMetaMask} = useEthereumProvider();

  function printAppInfo() {
    console.log("VERCEL URL: " + process.env.NEXT_PUBLIC_VERCEL_URL);
    console.log("VERCEL environment: " + process.env.NEXT_PUBLIC_VERCEL_ENV);
  }

  async function connectMetaMask() {
    const { ethereum } = window;    

    if (isMetaMask) {
      setIsConnecting(true);
      setConnErrMsg('');
      await ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((result) => {
          setIsConnecting(false);
          if (result.length !== 0) {
            setCurrentAccount(result[0]);
            ethereum.on("accountsChanged", function (result) {
              console.log("Account changed to: " + result[0]);
              window.location.reload();
            });
          } else {
            setConnErrMsg("Not connected to your wallet.");
          }
        })
        .catch((error) => {
          setIsConnecting(false);
          setConnErrMsg(error.message);
          console.log(error);
        });
    } else {
      setConnErrMsg('Install MetaMask to connect your wallet.')
      const metamaskUrl = `https://metamask.app.link/dapp/${projectConfig.siteDomain}`;
      console.log('Deeplink to MetaMask: ' + metamaskUrl);

      window.open(
        metamaskUrl,
        "_ blank"
      );
    }
  }

  const checkAuthorizedAccount = async () => {
    const { ethereum } = window;
    if (ethereum) {
      await ethereum
        .request({ method: "eth_accounts" })
        .then((result) => {
          console.log('checkAuthAccount: ' + result);
          if (result.length !== 0) {
            setCurrentAccount(result[0]);
            ethereum.on("accountsChanged", function (result) {
              console.log("Account changed to: " + result[0]);
              window.location.reload();
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const checkConnectedChainId = async () => {
    const { ethereum } = window;
    if (ethereum) {
      await ethereum
        .request({ method: "eth_chainId" })
        .then((chainId) => {
          console.log('checkConnectedChain: ' + chainId);
          ethereum.on("chainChanged", (chainId) => {
            console.log("Chain ID changed to: " + chainId);
            window.location.reload();
          });

          if (chainId !== projectConfig.chainId) {
            setConnErrMsg(`Change the network to ${projectConfig.networkName}.`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  
  useEffect(() => {
    printAppInfo();
    checkAuthorizedAccount();
    checkConnectedChainId();
    //setIsSaleActive(await getSaleState());
  }, []);

  useEffect(() => {
    async function fetchTotalSupply() {
      const mintedCount = await getTotalSupply();
      setTotalSupply(mintedCount);
    }

    fetchTotalSupply().catch(console.error);

    // cleanup
    return () => setTotalSupply("?");
  }, []);

  const incrementCount = () => {
    if (mintCount < projectConfig.maxMintAmountPerTxn) {
      setCount(mintCount + 1);
    }
  };

  const decrementCount = () => {
    if (mintCount > 1) {
      setCount(mintCount - 1);
    }
  };

  const mintFeather = async () => {
    setMessage('');
    setIsMinting(true);
    await mintNFT(mintCount)
      .then((result) => {
        setIsMinting(false);
        if (result.success) {
          setMessage("Succesfully minted your Feather! Hash: " + result.hash);
        } else {
          setMessage(result.status);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsMinting(false);
      });
  };

  return (
    <main id="main" className="h-screen py-16 bg-pattern">
      <div className="flex flex-col items-center ">
        {currentAccount === "" ? (
          isConnecting ? (
            <button
              type="button"
              className="flex justify-center items-center m-10 h-12 w-64 text-center uppercase text-xl font-bold bg-amber-500 rounded-full cursor-not-allowed"
              disabled
            >
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Connecting
            </button>
          ) : (
            <button
              type="button"
              className="m-10 h-12 w-64 text-center uppercase text-xl font-bold bg-amber-400 hover:bg-amber-500 rounded-full"
              onClick={connectMetaMask}
            >
              <span>Connect</span>
            </button>
          )
        ) : !connErrMsg ? (
          <div className="flex flex-col items-center">
            <span className="text-sm">{projectConfig.mintCost} Ξ</span>
            <span className="text-xl font-medium">
              {`${totalSupply}`} / {projectConfig.maxSupply}
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

              <h2 className="mx-8">{mintCount}</h2>

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

            {isMinting ? (
              <button
                type="button"
                className="flex justify-center items-center m-4 h-12 w-48 text-center uppercase text-xl font-bold bg-amber-500 rounded-full cursor-not-allowed"
                disabled
              >
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {isMinting && "Minting"}
                {!isMinting && "Processing"}
              </button>
            ) : (
              <button
                className="m-4 h-12 w-48 text-center uppercase text-xl font-bold bg-amber-400 hover:bg-amber-500 rounded-full"
                onClick={mintFeather}
              >
                Mint Feather!
              </button>
            )}
          </div>
        ) : (
          <div></div>
        )}

        {message && <div className="text-center font-bold">{message}</div>}
        {connErrMsg && (
          <div className="text-center font-bold">{connErrMsg}</div>
        )}
      </div>
    </main>
  );
};

export default Mint;