import React, { useState, useEffect } from "react";
import Image from "next/image";

import { getTokensOfOwner, getTokenUri } from "../utils/interact";

const owned = () => {
  const [tokensOfOwner, setTokensOfOwner] = useState(['0']);
  const [tokenUri, setTokenUri] = useState("");

  useEffect(async () => {
    setTokensOfOwner(await getTokensOfOwner());
    setTokenUri(await getTokenUri(1));
  });

  return (
    <main id="main" className="h-screen py-16 bg-th-background">
      <div className="container max-w-6xl mx-auto flex flex-col items-center pt-4">
      <span className="text-th-primary-medium">Tokens owned</span>
        <div className="flex flex-col items-center text-th-primary-light">
          if(! tokensOfOwner) return null;
          {tokensOfOwner.map((number) => (
            <li key={number}>{number + tokenUri}</li>
          ))}
        </div>        
      </div>
    </main>
  );
};

export default owned;
