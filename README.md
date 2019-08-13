This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Tupelo ChainTree Explorer

This is based on the tupelo-wasm-sdk and so beware of dragons (as IPFS likes to say). However, this is a great example of how easy it is to fetch data from ChainTrees in the browser.
The entire meat of the application is in the [explorer.tsx file](src/explorer.tsx). The rest is mostly just react UI and boiler plate.

CIDs in a ChainTree are rendered as links and you can navigate through your entire ChainTree.

Currently the app points at the defaultCommunity (which is the Tupelo testnet).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

