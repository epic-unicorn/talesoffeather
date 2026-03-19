# Tales of Feather

A React-based NFT collection platform built around Feather, a sweet-looking duck character.

## About the Project

Tales of Feather is a decentralized application built on Ethereum that allows users to mint and collect unique NFTs featuring Feather, an adorable duck character. The project combines a modern web interface with blockchain technology to create a unique digital collectibles experience.

## Features

- NFT minting for the Feather collection
- MetaMask wallet integration for Web3 authentication
- Responsive React interface with Next.js
- Smart contract-based collection management using OpenZeppelin contracts
- Tailwind CSS for styling

## Tech Stack

- **Frontend**: React, Next.js 12
- **Blockchain**: Ethereum, Hardhat, Ethers.js
- **Smart Contracts**: Solidity, OpenZeppelin ERC721
- **Styling**: Tailwind CSS
- **Web3**: Alchemy Web3, MetaMask

## Getting Started

### Prerequisites

- Node.js and npm installed
- MetaMask browser extension (for transaction signing)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with your configuration (if needed for RPC endpoints)

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run start` - Start the production server
- `npm run lint` - Run the linter

## Project Structure

- `/components` - React components (Main, Mint, Meta, etc.)
- `/pages` - Next.js pages and routing
- `/contracts` - Solidity smart contracts
- `/scripts` - Deployment and utility scripts
- `/styles` - CSS and Tailwind configuration
- `/utils` - Utility functions for blockchain interaction

## Contract Information

The project uses ERC-721 (NFT) standard contracts from OpenZeppelin and includes a custom `FeatherTest` contract for the collection.

## License

This is where the story starts...
