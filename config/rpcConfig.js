export default function rpcConfig(alchemyKey) {
    return process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
      ? `https://eth-mainnet.alchemyapi.io/v2/${alchemyKey}`
      : `https://eth-rinkeby.alchemyapi.io/v2/${alchemyKey}`
  }