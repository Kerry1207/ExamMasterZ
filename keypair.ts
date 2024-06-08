import { Keypair } from '@solana/web3.js';

let keypair = Keypair.generate();

console.log("Keypair Private key: " + keypair.secretKey);
console.log("Keypair Public Key: " + keypair.publicKey);