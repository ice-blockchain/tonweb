# ionweb-contract

Part of [IonWeb](https://github.com/ice-blockchain/ionweb).

The idea is to interact with smart contracts as if they were JavaScript objects.

ionweb.Contract is abstract class for all smart contract objects in IonWeb.

## Implement your custom contract

ABI and json interface of contract not yet invented in ION, so you need extend ionweb.Contract and compose messages to contract yourself.

```js
export class MyContract extends Contract {
    constructor(provider, options) {
        options.code = hexToBytes('abcd..');
        super(provider, options);

        this.method.myMethod = ...
    }

    // @override
    createDataCell() {
    }
}
```

Deployment functionality is implemented in the Contract class, you only need to override createDataCell and createSigningMessage methods.
 
ionweb.Contract contains several static functions to help compose messages:

* Contract.createStateInit

* Contract.createInternalMessageHeader

* Contract.createExternalMessageHeader

* Contract.createCommonMsgInfo

You can see an example of extending Contract class and using these functions in the code [ionweb-contract-wallet](https://github.com/ice-blockchain/ionweb/blob/master/src/contract/wallet)

## Common Interface 

```js
/**
* @param provider    {HttpProvider}
* @param options    {{code?: Uint8Array, address?: Address, wc?: number}}
*/
const contract = new Contract(provider, options)

const address: Address = contract.getAddress();


const deployMethod = contract.deploy(keyPair.secretKey);

const query: Cell = await deployMethod.getQuery(); // get init external message as Cell

await deplotMethod.estimateFee(); // get estimate fee of deploy 

await deployMethod.send(); // send init external message to blockchain


contract.methods; // object contains all methods of this smart contract

const myMethod = contract.methods.myMethod(myParams);

const query: Cell = await myMethod.getQuery(); // get external message 

await myMethod.estimateFee(); // get estimate fee 

await myMethod.send(); // send to blockchain 


const myGetMethod = contract.methods.myGetMethod(myParams);

const result = await myGetMethod.call(); // invoke get-method of this smart contract

```
