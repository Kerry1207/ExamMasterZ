import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";

const secretKey = require('./privatekey.json');
const keypair = Keypair.fromSecretKey(new Uint8Array(secretKey));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey("6RYcSmdouyNxC5Wmcaaudm93ai2fMcLhHgsmq8jUR4XS");
const fromAta = new PublicKey("J9YpAxAVUinvkcPq3eJnhnK67ApkXPtsiPfoKxbjfHKg");

// NOTE: Retrieve the second wallet from his private key for send token to it
const secondAccountSecretKey = require('./secondaccountprivatekey.json');
const secondAccount = Keypair.fromSecretKey(new Uint8Array(secondAccountSecretKey));

console.log("Address transfer to is: " + secondAccount.publicKey);

(async() => {
    
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        secondAccount.publicKey
    );

    const toAta = tokenAccount.address;
    console.log("Associated token account address: " + toAta.toBase58());

    const amountToAta = tokenAccount.amount;
    console.log("Amount in associated token account address: ", amountToAta.toString());

    const amount = 1e6;

    let tx = await transfer(
        connection,
        keypair,
        fromAta,
        toAta,
        keypair.publicKey,
        amount
    );

    console.log(`Transfer transaction: https://explorer.solana.com/tx/${tx}`)
    console.log("Transfer of", amount, "from", fromAta.toBase58(), "to", toAta.toBase58());
})();
