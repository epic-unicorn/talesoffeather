import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

export function useEthereumProvider() {
  const [ethereumProvider, setEthereumProvider] = useState(null);
  const [isMetaMask, setIsMetaMask] = useState(false);

  useEffect(() => {
    async function detectProvider() {
      const provider = await detectEthereumProvider();
      setEthereumProvider(provider);

      if (provider === window.ethereum) {
        setIsMetaMask(!!provider);
      }
    }

    detectProvider();

    // cleanup
    return () => {
      setEthereumProvider(null);
      setIsMetaMask(false);
    };
  }, []);

  return { ethereumProvider, isMetaMask };
}
