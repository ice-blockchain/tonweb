const IonWeb = require("./index");

async function init() {
    const ionweb = new IonWeb(new IonWeb.HttpProvider('https://testnet.ioncenter.com/api/v2/jsonRPC'));
    const storage = new IonWeb.InMemoryBlockStorage(console.log);

    const onBlock = async (blockHeader) => {
        const workchain = blockHeader.id.workchain;
        const shardId = blockHeader.id.shard;
        const blockNumber = blockHeader.id.seqno;
        console.log('BLOCK ', blockHeader);

        const blockTransactions = await ionweb.provider.getBlockTransactions(workchain, shardId, blockNumber); // todo: (tolya-yanot) `incomplete` is not handled in response
        const shortTransactions = blockTransactions.transactions;
        for (const shortTx of shortTransactions) {
            console.log('TX at ' + shortTx.account);
        }
    }

    const blockSubscribe = new IonWeb.BlockSubscription(ionweb.provider, storage, onBlock);
    await blockSubscribe.start();
}

init();
