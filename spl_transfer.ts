import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";

const secretKey = require('./privatekey.json');
const keypair = Keypair.fromSecretKey(new Uint8Array(secretKey));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// NOTE: Mint address of token
const mint = new PublicKey("6RYcSmdouyNxC5Wmcaaudm93ai2fMcLhHgsmq8jUR4XS");

// NOTE: Associated token account address with privatekey authority
const fromAta = new PublicKey("J9YpAxAVUinvkcPq3eJnhnK67ApkXPtsiPfoKxbjfHKg");

// NOTE: Generate a new wallet for transfer token with authority of this wallet
const to = Keypair.generate();
console.log("Address transfer to is: " + to.publicKey);

(async() => {
    
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        to.publicKey
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
