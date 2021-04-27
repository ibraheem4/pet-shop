# Expanded [Pet Shop](https://www.trufflesuite.com/boxes/pet-shop) Tutorial

The goal of this project is to expand upon the widely-known pet shop tutorial.  Ultimately, I intend to build upon this functionality by integrating Truffle into an Ember.js addon that will allow me to do more robust testing, as well as maintain greater visibility and control over data models.  Although these contracts are basic, the goal for me is to first get a thorough understanding of how to build, test, and deploy basic smart contracts before tackling more ambitious projects.

## Prerequisites

- Truffle
- Ganache
- py-solc-x
- OpenZepellin

#### NOTE: This application does not work on Safari, most likely because Safari lacks a MetaMask extension.

## Setup

### Run the development console.

    truffle develop

### Compile and migrate the smart contracts. NOTE: inside the development console, we don't preface commands with truffle.

    truffle compile
    truffle migrate

### Run the liteserver development server (outside the development console) for front-end hot reloading. Smart contract changes must be manually recompiled and migrated.

    yarn dev

> Serves the front-end on http://localhost:3000

### Run tests

    truffle test

### Resetting

    truffle compile --all && truffle migrate --reset && yarn test && yarn dev

## Improvements

- Add a `returnAnimal` function, allowing animals to be un-adopted
- Add `Return` button
## Things TODO

### Functionality

- Implement `Ownable`
### Testing

- ~~Test on Ganache~~
- Test on Rinkeby Testnet
- Write test for `returnAnimal` function
- Test `Ownable`

### Deployment

- ~~Deploy contracts to Ganache~~
- Deploy contracts to Rinkeby Testnet
