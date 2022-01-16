import React, { useState, useEffect } from "react";
import { useStatus } from "../context/statusContext";
import Image from "next/image";

import {
  getMaxMintAmount,
  getTotalSupply,
  getNftPrice,
  mintNFT,
  getSaleState,
} from "../utils/interact";

const mint = () => {
  const { status, setStatus } = useStatus();

  const [count, setCount] = useState(1);
  const [maxMintAmount, setMaxMintAmount] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [nftPrice, setNftPrice] = useState("0.001");
  const [isSaleActive, setIsSaleActive] = useState(false);

  useEffect(async () => {
    setMaxMintAmount(await getMaxMintAmount());
    setNftPrice(await getNftPrice());
    setIsSaleActive(await getSaleState());
    await updateTotalSupply();
  });

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

    // We minted a new Feather, so we need to update the total supply
    updateTotalSupply();
  };

  return (
    <main id="main" className="h-screen py-16 bg-pattern">
      <div className="container max-w-6xl mx-auto flex flex-col items-center pt-4">
        <div className="flex flex-col items-center">

          
          <span className="text-th-accent-dark text-4xl">Mint your Feather</span>

          {isSaleActive ? (
            <>
              {/* Minted NFT Ratio */}
              <span className="text-th-accent-medium">
                Already minted: {`${totalSupply}`} of 5K
              </span>
              <h4 className="mt-2 font-semibold text-center text-th-accent-light">
                {nftPrice} ETH{" "}
                <span className="text-sm text-th-accent-light"> + GAS</span>
              </h4>

              <div className="flex items-center mt-6 text-3xl font-bold text-th-primary-light">
                <button
                  className="flex items-center justify-center w-12 h-12 bg-th-background rounded-md text-th-accent-light hover:bg-th-accent-dark text-center"
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
                  className="flex items-center justify-center w-12 h-12 bg-th-background rounded-md hover:bg-th-accent-dark text-th-accent-light text-center"
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
                className="mt-6 py-2 px-4 text-center uppercase hover:bg-th-accent-dark bg-th-background text-th-accent-light rounded"
                onClick={mintFeather}
              >
                Mint now!
              </button>
            </>
          ) : (
            <p className="text-white text-2xl mt-8">
              Sale is not started yet...
            </p>
          )}

          {/* Status */}

          <span className="text-th-accent-medium">
          {status && (
            <div className="flex items-center justify-center px-4 py-4 mt-8 font-semibold text-black rounded-md ">
              {status}
            </div>
          )}</span>
        </div>
      </div>
    </main>
  );
};

export default mint;
