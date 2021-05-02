# Expanded [Pet Shop](https://www.trufflesuite.com/boxes/pet-shop) Tutorial

The goal of this project is to learn DApp development by expanding upon the widely-known Pet Shop tutorial using Truffle.

Although the concept of a Pet Shop is basic, the goal for me is to first get a thorough understanding of how to build, test, and deploy basic smart contracts before tackling more ambitious projects.

## Prerequisites

- [Truffle](https://www.trufflesuite.com)
- [Ganache](https://www.trufflesuite.com/ganache)
- [py-solc-x](https://pypi.org/project/py-solc-x/)
- [OpenZepellin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Metamask](https://metamask.io)
- [Google Chrome](https://www.google.com/chrome/) or [Firefox](https://www.mozilla.org/firefox)

> 🦊 This application does not work on Safari, most likely because Safari lacks a MetaMask extension 🦊

## Setup

### Open Ganache
### Run `yarn start`

- Compiles contracts
- Performs migrations
- Runs tests

> Serves the front-end on http://localhost:3000

### Run tests

    yarn test

- Runs Solidity Tests
- Runs Unit Tests
## Things TODO

### Product Improvements

- ~~Add a `returnAnimal` function, allowing animals to be un-adopted~~
- ~~Add `Return` button~~
- Add `Claim` button, only for owner
- Add `Release` button, only for owner
### Functionality

- ~~Implement `Ownable`~~
### Testing

- ~~Test on Ganache~~
- Test on Rinkeby Testnet
- ~~Write test for `returnAnimal` function~~
- ~~Test `Ownable`~~
- ~~Figure out how to test Access Control~

### Deployment

- ~~Deploy contracts to Ganache~~
- Deploy contracts to Rinkeby Testnet

###
- Integrating Truffle into an Ember.js app / addon