# Claimabl3
[claimabl3.xyz](www.claimabl3.xyz)
ETHDenver Hackathon. Geo-locked NFTs for mural art.

In oder to provide a geographically constrained minting feature the mint function is only allowed for a single private address. This eliminates the possibility of minting directly from the contract. Once the user has verified location on their device, they send a message that triggers the minting from the single address.

Contract deployed on baseGoerli.

## Getting Started Locally

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`npx create-web3-dapp@latest`](https://github.com/alchemyplatform/create-web3-dapp) which comes from Alchemy.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## [React-Leaflet](https://react-leaflet.js.org/)

A React components for Leaflet maps using OpenStreetMap.
