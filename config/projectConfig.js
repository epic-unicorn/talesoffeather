const projectConfig = {
    nftName: 'FeatherTest',
  
    nftSymbol: 'FET',
  
    maxSupply: 5000,
  
    maxMintAmountPerTxn: 3,
  
    mintCost: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? "0.06" : "0.001",
  
    networkName:
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? 'Ethereum Mainnet' 
        : 'Rinkeby Testnet', 
  
    chainName: 'ETH',
  
    chainId: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 1 : 4, // Main (1), Rinkeby (4)
  
    siteDomain: 'www.yourdomain.com',
  
    siteUrl:
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? 'https://your_site_domain'
        : 'http://localhost:3000',
  
    twitterUsername: '@your_twitter_handle',
  
    twitterUrl: 'https://twitter.com/your_twitter_handle',
  
    discordUrl: 'https://discord.gg/your_discord_invite_code',
  
    openseaCollectionUrl:
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? 'https://opensea.io/collection/your_opensea_collection_name'
        : 'https://testnets.opensea.io/collection/feathertest-v3',
  
    contractAddress:
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? '0x'
        : '0xC0a19730710dc95A90B03376a0C5455A71912c19',
  
    etherScanUrl:
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? 'https://etherscan.io/address/0xC0a19730710dc95A90B03376a0C5455A71912c19'
        : 'https://rinkeby.etherscan.io/address/0xC0a19730710dc95A90B03376a0C5455A71912c19',
  };
  
  export default projectConfig;