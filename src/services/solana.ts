import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

export const getBalance = async (publicKey: string): Promise<string> => {
  const key = new PublicKey(publicKey);
  const balance = await connection.getBalance(key);
  return (balance / 1e9).toFixed(3); // Convert lamports to SOL
};
