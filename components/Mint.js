import React, { useState, useEffect } from "react";
import { useStatus } from "../context/statusContext";

import {
  getContractAddress,
  getMaxMintAmount,
  getTotalSupply,
  getNftPrice,
  mintNFT,
  getSaleState,
  connectWallet,
  getCurrentWalletConnected,
} from "../utils/interact";

const Mint = () => {
  const { status, setStatus } = useStatus();

  const [count, setCount] = useState(1);
  const [maxMintAmount, setMaxMintAmount] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [nftPrice, setNftPrice] = useState("0.001");
  const [isSaleActive, setIsSaleActive] = useState(false);
  const [contractAddress, setContractAddress] = useState("0x");
  const [walletAddress, setWalletAddress] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [loadingState, setLoadingState] = useState(0);

  useEffect(async () => {
    checkIfWalletIsConnected();
    checkCorrectNetwork();

    setMaxMintAmount(await getMaxMintAmount());
    setNftPrice(await getNftPrice());
    setIsSaleActive(await getSaleState());
    setContractAddress(await getContractAddress());
    await updateTotalSupply();
  });

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

      ethereum.on('accountsChanged', function (accounts) {
        console.log('Account changed to: ' + accounts[0])
        window.location.reload();
      })

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

    ethereum.on('chainChanged', (chainId) => {
      console.log('Chain ID changed to: ' + chainId);
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
        alert("Metamask not detected!");
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

  const updateTotalSupply = async () => {
    const mintedCount = await getTotalSupply();
    setTotalSupply(mintedCount);
  };

  const incrementCount = () => {
    if (count < maxMintAmount) {
      setCount(count + 1);
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const mintFeather = async () => {
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
          <button
            className="m-10 h-12 w-64 text-center uppercase text-xl font-bold bg-amber-400 hover:bg-amber-500 rounded-full"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        ) : correctNetwork ? (
          <div className="flex flex-col items-center ">
            <div className="mb-4">Your wallet: {walletAddress}</div>
            {isSaleActive ? (
              <div className="flex flex-col items-center">
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
                <span className="text-sm">{nftPrice} Ξ</span>
                <span className="text-xl font-medium">
                  {`${totalSupply}`} / 5000
                </span>
              </div>
            ) : (
              <span>Sale is not started</span>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3">
            You are not connected to Rinkeby Testnet.
          </div>
        )}

        {loadingState === 1 ? (
          <div className="text-lg font-bold">Processing your transaction</div>
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
