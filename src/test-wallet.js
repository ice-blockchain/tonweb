const IonWeb = require("./index");

async function init() {
    const ionweb = new IonWeb(new IonWeb.HttpProvider('https://testnet.ioncenter.com/api/v2/jsonRPC'));

    // Create private key

    const seed = IonWeb.utils.base64ToBytes('vt58J2v6FaBuXFGcyGtqT5elpVxcZ+I1zgu/GUfA5uY=');
    const keyPair = IonWeb.utils.nacl.sign.keyPair.fromSeed(seed);

    // Create v3 wallet

    const WalletClass = ionweb.wallet.all['v3R2'];
    const wallet = new WalletClass(ionweb.provider, {
        publicKey: keyPair.publicKey,
        wc: 0
    });

    const walletAddress = (await wallet.getAddress()).toString(true, true, true);
    console.log('my address', walletAddress)

    // Create transfer

    const transfer = wallet.methods.transfer({
        secretKey: keyPair.secretKey,
        toAddress: 'EQA0i8-CdGnF_DhUHHf92R1ONH6sIA9vLZ_WLcCIhfBBXwtG',
        amount: IonWeb.utils.toNano('0.01'), // 0.01 ION
        seqno: 0,
        payload: 'The aim of this text is to provide a brief',
        expireAt: Math.floor(Date.now() / 1000) + 60 // now + 60 seconds
    });

    const query = await transfer.getQuery();
    const boc = IonWeb.utils.bytesToBase64(await query.toBoc(false)); // serialized query
    // await ionweb.provider.sendBoc(boc); // send query to network

    // Parse query

    try {
        const parsed = WalletClass.parseTransferQuery(IonWeb.boc.Cell.oneFromBoc(IonWeb.utils.base64ToBytes(boc)));

        parsed.value = parsed.value.toString();
        parsed.fromAddress = parsed.fromAddress.toString(true, true, true);
        parsed.toAddress = parsed.toAddress.toString(true, true, true);
        console.log(parsed);
    } catch (e) {
        console.error(e); // not valid wallet transfer query
    }

    // Get transaction and parse

    const transactions = await ionweb.provider.getTransactions(walletAddress.toString(true, true, true));

    try {
        const tx = transactions[0];
        const inMsgBody = IonWeb.utils.base64ToBytes(tx.in_msg.msg_data.body);
        const parsed = WalletClass.parseTransferBody(IonWeb.boc.Cell.oneFromBoc(inMsgBody).beginParse());

        parsed.value = parsed.value.toString();
        parsed.toAddress = parsed.toAddress.toString(true, true, true);
        console.log(parsed);
    } catch (e) {
        console.error(e); // not valid wallet transfer tx
    }
}

init();