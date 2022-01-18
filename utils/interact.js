const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.API_URL);

const contract = require("../artifacts/contracts/FeatherTest.sol/FeatherTest.json");
const contractAddress = "0x7f69e0cbf7eA7Ed5f807E599D3404aEBC19B17D7";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const obj = {
        status: "",
        address: addressArray[0],
      };

      return obj;
    } catch (err) {
      return {
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            <a target="_blank" href="https://metamask.io/download.html">
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "",
        };
      } else {
        return {
          address: "",
          status: "",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            <a target="_blank" href="https://metamask.io/download.html">
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

// Contract Methods

export const getMaxMintAmount = async () => {
  const result = await nftContract.methods.maxTokenPurchase().call();
  return result;
};

export const getTotalSupply = async () => {
  const result = await nftContract.methods.totalSupply().call();
  return result;
};

export const getNftPrice = async () => {
  const result = await nftContract.methods.tokenPrice().call();
  const resultEther = web3.utils.fromWei(result, "ether");
  return resultEther;
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

  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    value: parseInt(web3.utils.toWei("0.001", "ether") * mintAmount).toString(
      16
    ), // hex
    gasLimit: "0",
    data: nftContract.methods.mintFeather(mintAmount).encodeABI(), //make call to NFT smart contract
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
