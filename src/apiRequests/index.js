import { JsonRpc, RpcError } from 'eosjs';

const endpoint = "https://api.eosnewyork.io"
const rpc = new JsonRpc(endpoint, { fetch });


// get latest 10 blocks
// 1. first get the head block number
// 2. work out the 10 block numbers using head block number
// 3. get blocks using 10 blocks from the step 2.

export const getBlocks = async () => {
    try {
        // get head block number
        let headBlockNum = await getHeadBlockNum();
        if (headBlockNum.status == "ERROR")
            return headBlockNum

        // blockDetails array to hold details of 10 recently fetched blocks
        let blocks = [];

        // Loop through to fetch 10 block numbers going back from headBlockNum
        let i = 0;
        while (i < 10) {
            let blockNum = parseInt(headBlockNum.headBlockNum) - i;

            //let { id, timestamp, transactions } = await getBlock(blockNum);
            let { block } = await getBlock(blockNum);

            //blocks.push({ id, timestamp, actions: transactions.length })
            blocks.push({ id: block.id, timestamp: block.timestamp, actions: block.transactions.length })
            i++;
        }
        return { status: 'SUCCESS', blocks }
    } catch (e) {
        if (e instanceof RpcError) {
            let error = JSON.stringify(e.json, null, 2)
            return { status: "ERROR", error }
        }
        else {
            return { status: "ERROR", error: e.toString() }
        }
    }
};

// getHeadBlockId function to return the head_block_num
// api endpoint get_info sample response below, head_block_num is head block number
// not a full response
/*
  {
      "server_version": "e19afc80",
      "chain_id": "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
      "head_block_num": 108127171,
      "head_block_id": "0671e3c3e888bd2a63262cd338f5c0edc6a73012350c0fc0bde38d2a25ce6353",
      "head_block_time": "2020-03-02T23:29:30.500",
      "head_block_producer": "eosrapidprod",
      "virtual_block_cpu_limit": 200000,
      "virtual_block_net_limit": 1048576000,
      "block_cpu_limit": 199900,
      "block_net_limit": 1048576,
  }
*/
export const getHeadBlockNum = async () => {
    try {
        let block = await rpc.get_info()
        return { status: "SUCCESS", headBlockNum: block['head_block_num'] }
    } catch (e) {

        if (e instanceof RpcError) {

            let error = JSON.stringify(e.json, null, 2)
            return { status: "ERROR", error }
        }
        else {
            return { status: "ERROR", error: e.toString() }
        }
    }
}

// getBlock function returns the response of get_block api call, accepting block_num or block_id
export const getBlock = async (blockNum) => {
    try {
        let block = await rpc.get_block(blockNum)
        return { status: "SUCCESS", block }
    } catch (e) {

        if (e instanceof RpcError) {

            let error = JSON.stringify(e.json, null, 2)
            return { status: "ERROR", error }
        }
        else {
            return { status: "ERROR", error: e.toString() }
        }
    }
}



