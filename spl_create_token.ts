import { createMint } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";

const secretKey = require('./privatekey.json');
const keypair = Keypair.fromSecretKey(new Uint8Array(secretKey));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async() => {
    
    const mint = await createMint(
        connection,
        keypair,
        keypair.publicKey,
        null,
        6
    );

    console.log("Token mint address: ", mint.toBase58());
})()


