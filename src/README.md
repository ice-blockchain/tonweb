# ionweb

Root of [IonWeb](https://github.com/ice-blockchain/ionweb).

## Usage

* IonWeb.version - current version

* IonWeb.utils - [utils](https://github.com/ice-blockchain/ionweb/blob/master/src/utils/README.md) class

* IonWeb.Address - [Address class](https://github.com/ice-blockchain/ionweb/blob/master/src/utils/README.md#address-class)

* IonWeb.boc - [boc](https://github.com/ice-blockchain/ionweb/blob/master/src/boc/README.md) class

* IonWeb.Contract - [Contract class](https://github.com/ice-blockchain/ionweb/blob/master/src/contract/README.md)

* ionweb.wallet - [wallets object](https://github.com/ice-blockchain/ionweb/blob/master/src/contract/wallet/README.md)

* ionweb.getTransactions(address: Address | string, limit?: number, lt?: number, txhash?: string, lt_to?: number) - Use this method to get transaction history of a given address.
    
    * address - Identifier of target account in
    * limit [Optional] - Amount of transactions
    * lt [Optional] - Logical time of transaction to start with, must be sent with hash
    * txhash [Optional] - Hash of transaction in HEX to start with, must be sent with lt
    * to_lt [Optional] - Logical time of transaction to finish with (that way it is possible to get tx from lt to to_lt)

* ionweb.getBalance(address: Address | string) - The current balance for the given address in nanograms.

* ionweb.sendBoc(bytes: Uint8Array) - Use this method to send serialized boc file: fully packed and serialized external message.

* ionweb.call(address: Address | string, method: string | number, params: Array) - Invoke get-method of smart contract

## Additional

* ionweb.provider.getAddressInfo(address: string) - Use this method to get information about address: balance, code, data, last_transaction_id.

* ionweb.provider.getExtendedAddressInfo(address: string) - Similar to previous one but tries to parse additional information for known contract types. This method is based on generic.getAccountState thus number of recognizable contracts may grow. For wallets we recommend to use getWalletInformation.

* ionweb.provider.getWalletInfo(address: string) - Use this method to retrieve wallet information, this method parse contract state and currently supports more wallet types than getExtendedAddressInformation: simple wallet, stadart wallet and v3 wallet.
