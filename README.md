![splash_js_sdk](https://user-images.githubusercontent.com/1449561/154848382-e89fef68-3aee-4ca6-8d52-1466bfdf2c89.png)

# IonWeb - JavaScript SDK for [The Open Network](https://ion.org)

[![NPM](https://img.shields.io/npm/v/ionweb.svg)](https://www.npmjs.org/package/ionweb)

## Install Web

`npm install ionweb` or `yarn add ionweb`

```js
import IonWeb from "ionweb";

const ionweb = new IonWeb();
```

or

`<script src="ionweb.js"></script>`

`const ionweb = new window.IonWeb();`

## Install NodeJS

`npm install ionweb` or `yarn add ionweb`

```js
const IonWeb = require('ionweb');

const ionweb = new IonWeb();
```

## Overview example

```js
const ionweb = new IonWeb();

const wallet = ionweb.wallet.create({publicKey});

const address = await wallet.getAddress();

const nonBounceableAddress = address.toString(true, true, false);

const seqno = await wallet.methods.seqno().call();

await wallet.deploy(secretKey).send(); // deploy wallet to blockchain

const fee = await wallet.methods.transfer({
    secretKey,
    toAddress: 'EQDjVXa_oltdBP64Nc__p397xLCvGm2IcZ1ba7anSW0NAkeP',
    amount: IonWeb.utils.toNano(0.01), // 0.01 ION
    seqno: seqno,
    payload: 'Hello',
    sendMode: 3,
}).estimateFee();

const Cell = IonWeb.boc.Cell;
const cell = new Cell();
cell.bits.writeUint(0, 32);
cell.bits.writeAddress(address);
cell.bits.writeGrams(1);
console.log(cell.print()); // print cell data like Fift
const bocBytes = cell.toBoc();

const history = await ionweb.getTransactions(address);

const balance = await ionweb.getBalance(address);

ionweb.sendBoc(bocBytes);

```

## API

By default, mainnet [ioncenter.com](https://ioncenter.com) API is used. Please note that without the API key there will be a request rate limit.

You can start your own ION HTTP API instance as it is [open source](https://github.com/ice-blockchain/ion-http-api).

Use mainnet IonCenter API with high ratelimit API key:

```js
const ionweb = new IonWeb(new IonWeb.HttpProvider('https://ioncenter.com/api/v2/jsonRPC', {apiKey: 'YOUR_MAINNET_IONCENTER_API_KEY'}));
```

Use testnet IonCenter API with high ratelimit API key:

```js
const ionweb = new IonWeb(new IonWeb.HttpProvider('https://testnet.ioncenter.com/api/v2/jsonRPC', {apiKey: 'YOUR_TESTNET_IONCENTER_API_KEY'}));
```

## Documentation

Each part is documented separately:

[ionweb](https://github.com/ice-blockchain/ionweb/blob/master/src/README.md) - root class and methods

[ionweb-contract-wallet](https://github.com/ice-blockchain/ionweb/blob/master/src/contract/wallet/README.md) - interaction with wallet's smart contracts.

[ionweb-contract](https://github.com/ice-blockchain/ionweb/blob/master/src/contract/README.md) - abstract interface to interact with ION smart contracts.

[ionweb-boc](https://github.com/ice-blockchain/ionweb/blob/master/src/boc/README.md) - serializations of Cell and BitString

[ionweb-utils](https://github.com/ice-blockchain/ionweb/blob/master/src/utils/README.md) - work with ION Addresses, coin values, byte arrays, hex, hash functions.


**Also we use JSDoc in code**

## Roadmap

1. Unit-tests

2. Typescript

## Build

```bash
npm install 

npm run build
```

## Use as alternative to Fift for building binary messages to smart-contracts

```bash
npm install -g ionweb

export NODE_PATH=$(npm root --quiet -g)
```

Then create your_script.js

```js
const IonWeb = require('ionweb');

const ionweb = new IonWeb();

. . .

```

run script

```bash
node your_script.js
```
