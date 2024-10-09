const IonWeb = require("./index");

async function init() {
    const ionweb = new IonWeb(new IonWeb.HttpProvider('https://testnet.ioncenter.com/api/v2/jsonRPC', {apiKey: undefined}));

    const walletSeed = IonWeb.utils.base64ToBytes('vt58J2v6FaBuXFGcyGtqT5elpVxcZ+I1zgu/GUfA5uY=');
    const walletKeyPair = IonWeb.utils.nacl.sign.keyPair.fromSeed(walletSeed);

    // Create private key

    const seed = IonWeb.utils.base64ToBytes('vt58J2v6FaBuXFGcyGtqT5elpVxcZ+I1zgu/GUfA5uY=');
    const keyPair = IonWeb.utils.nacl.sign.keyPair.fromSeed(seed);

    // Create v3 wallet

    console.log(JSON.stringify({
        publicKey: IonWeb.utils.bytesToBase64(keyPair.publicKey),
        workchain: 0,
        wallet_type: "lockup-0.1",
        config_public_key: IonWeb.utils.bytesToBase64(walletKeyPair.publicKey),
        allowed_destinations: 'te6cckEBBQEAegACA3TAAQIARaDgDSLz4J0acX8OFQcd/3ZHU40fqwgD28tn9YtwIiF8EFfQAgV/v7ADBABDv7MzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzQABDv5VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQH26pHc='
    }));


    const WalletClass = ionweb.lockupWallet.LockupWalletV1;
    const wallet = new WalletClass(ionweb.provider, {
        publicKey: keyPair.publicKey,
        wc: 0,
        config: {
            config_public_key: IonWeb.utils.bytesToBase64(walletKeyPair.publicKey),
            allowed_destinations: 'te6cckEBBQEAegACA3TAAQIARaDgDSLz4J0acX8OFQcd/3ZHU40fqwgD28tn9YtwIiF8EFfQAgV/v7ADBABDv7MzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzQABDv5VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQH26pHc='
        }
    });

    const walletAddress = (await wallet.getAddress()).toString(true, true, true);
    console.log('my address', walletAddress)

    // await wallet.deploy(keyPair.secretKey).send();

    const seqno = (await wallet.methods.seqno().call()) || 0;
    console.log({seqno});

    const transfer = wallet.methods.transfer({
        secretKey: keyPair.secretKey,
        toAddress: 'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N',
        amount: IonWeb.utils.toNano('0.01'), // 0.01 ION
        seqno: seqno,
        payload: 'Transfer'
    });

    await transfer.send();

}

init();