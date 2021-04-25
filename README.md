# [Pet Shop Tutorial](https://www.trufflesuite.com/boxes/pet-shop)

## Run the development console.

    truffle develop

## Compile and migrate the smart contracts. Note inside the development console we don't preface commands with truffle.

    truffle compile
    truffle migrate

## Run the liteserver development server (outside the development console) for front-end hot reloading. Smart contract changes must be manually recompiled and migrated.

    // Serves the front-end on http://localhost:3000
    npm run dev

## Run tests

    truffle test