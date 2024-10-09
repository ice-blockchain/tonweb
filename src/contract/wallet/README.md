# ionweb-contract-wallet

Part of [IonWeb](https://github.com/ice-blockchain/ionweb).

Interaction with wallet's smart contracts.

## Info

There is currently no single standard wallet in ION.

This code implements wallet's smart contracts published in the [ION repository](https://github.com/ion-blockchain/ion/tree/master/crypto/smartcont).

They all have almost the same interface.

## Usage

```js
const nacl = IonWeb.utils.nacl; // use nacl library for key pairs
const ionweb = new IonWeb();

const keyPair = nacl.sign.keyPair(); // create new random key pair

let wallet = ionweb.wallet.create({publicKey: keyPair.publicKey, wc: 0}); // create interface to wallet smart contract (wallet v3 by default)

OR

wallet = ionweb.wallet.create({address: 'EQDjVXa_oltdBP64Nc__p397xLCvGm2IcZ1ba7anSW0NAkeP'}); // if your know only address at this moment


const address = await wallet.getAddress();

const seqno = await wallet.methods.seqno().call(); // call get-method `seqno` of wallet smart contract

// DEPLOY

const deploy = wallet.deploy(keyPair.secretKey); // deploy method

const deployFee = await deploy.estimateFee()  // get estimate fee of deploy

const deploySended = await deploy.send() // deploy wallet contract to blockchain

const deployQuery = await deploy.getQuery();   // get deploy query Cell 

// TRANSFER ION COINS

const transfer = wallet.methods.transfer({
    secretKey: keyPair.secretKey,
    toAddress: 'EQDjVXa_oltdBP64Nc__p397xLCvGm2IcZ1ba7anSW0NAkeP',
    amount: IonWeb.utils.toNano('0.01'), // 0.01 ION
    seqno: seqno,
    payload: 'Hello',
    sendMode: 3,
});

const transferFee = await transfer.estimateFee();   // get estimate fee of transfer

const transferSended = await transfer.send();  // send transfer query to blockchain

const transferQuery = await transfer.getQuery(); // get transfer query Cell

```

## Usage non-default wallet

```js
ionweb.wallet.all
-> {SimpleWalletContract, StandardWalletContract, WalletV3Contract}

const simpleWallet = new ionweb.wallet.all.SimpleWalletContract({publicKey})

```

## Low level

[Comparison with new-wallet.fif](https://github.com/ice-blockchain/ionweb/blob/master/test/test-new-wallet-fif.html)

[Comparison with wallet.fif](https://github.com/ice-blockchain/ionweb/blob/master/test/test-wallet-fif.html)
