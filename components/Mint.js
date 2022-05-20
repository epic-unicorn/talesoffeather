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

  const connectWalletPressed = async () => {    
    const walletResponse = await connectWallet();
    setWalletAddress(walletResponse.address);
    setStatus(walletResponse.status);
  };

  useEffect(async () => {
    await getCurrentWallet();

    setMaxMintAmount(await getMaxMintAmount());
    setNftPrice(await getNftPrice());
    setIsSaleActive(await getSaleState());
    setContractAddress(await getContractAddress());
    await updateTotalSupply();
  });

  const getCurrentWallet = async () => {
    const walletResponse = await getCurrentWalletConnected();
    console.log(walletResponse);
    setWalletAddress(walletResponse.address);
    setStatus(walletResponse.status);
    addWalletListener();
  };

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setStatus("");
        } else {
          setWalletAddress("");
          setStatus("Connect to Metamask using Connect Wallet button.");
        }
      });
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
    const { status } = await mintNFT(count);
    setStatus(status);

    // feather minted, update total supply
    updateTotalSupply();
  };

  return (
    <main id="main" className="h-screen py-16 bg-pattern">
        <div className="flex flex-col items-center ">
          <button className="mb-10 p-3 bg-amber-400 rounded-full hover:bg-amber-500 font-medium" id="walletButton" onClick={connectWalletPressed} >
            {walletAddress.length > 0 ? (          
              "Wallet Address: " +
              String(walletAddress).substring(0, 6) +
              "..." +
              String(walletAddress).substring(38)
            ) : (
              <span>Connect wallet</span>
            )}
          </button>
          <a
            className="underline mb-10 hover:text-blue-800"
            target="_blank"
            href={"https://rinkeby.etherscan.io/address/" + contractAddress}
            rel="noopener noreferrer"
          >
            {contractAddress}
          </a>
          
          {isSaleActive ? (
            <>
              {nftPrice} Ξ<span className="text-sm"></span>
              {/* Minted NFT Ratio */}
              <span className="text-xl font-medium">
                {`${totalSupply}`} / 5000
              </span>
              <div className="flex items-center mt-6 text-3xl font-bold bg-amber-400 rounded-full">
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
              {/* Mint Button */}
              <button
                className="mt-10 h-12 w-48 text-center uppercase text-xl font-bold bg-amber-400 hover:bg-amber-500 rounded-full"
                onClick={mintFeather}
              >
                Mint Feather
              </button>
            </>
          ) : (
            <p className="text-2xl mt-8">Sale is not started yet...</p>
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
