const web3 = require("@solana/web3.js");
import { Connection, GetVersionedBlockConfig, Keypair } from '@solana/web3.js';

const secretKey = require('./privatekey.json');
const myAccount = Keypair.fromSecretKey(new Uint8Array(secretKey));
console.log("Public Key: " + myAccount.publicKey);

let connection = new Connection("https://api.devnet.solana.com", "confirmed");
console.log("Connection: " + connection.rpcEndpoint);

const getVersionedBlockConfig: GetVersionedBlockConfig = {
    maxSupportedTransactionVersion: 0,
};

(async() => {
    let tx = await connection.requestAirdrop(myAccount.publicKey, 1e9);
    console.log("Airdrop Transaction: " + tx);

    let accountBalance = await connection.getBalance(myAccount.publicKey);
    console.log("Account balanca in SOL: " + accountBalance);
})();
