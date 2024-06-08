import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";


const secretKey = require('./privatekey.json');
const keypair = Keypair.fromSecretKey(new Uint8Array(secretKey));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
// NOTE: This is the mint of token that I've created. You must change it if you create new token.
const mint = new PublicKey("6RYcSmdouyNxC5Wmcaaudm93ai2fMcLhHgsmq8jUR4XS");

(async() => {

    const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
    const ata = tokenAccount.address;
    console.log("Associated Token account address: " + ata.toBase58());

    const amount = 1e6;

    let tx = await mintTo(
        connection,
        keypair,
        mint,
        ata,
        keypair.publicKey,
        amount
    );

    console.log(`Transaction of mint:  https://explorer.solana.com/tx/${tx}?cluster=devnettx`);
})()

