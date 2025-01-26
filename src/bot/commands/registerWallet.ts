import { Context } from "grammy";
import { PublicKey } from "@solana/web3.js";
import { supabase } from "../../services/supabase";

const registerWalletCommand = async (ctx: Context) => {
  const text = ctx.message?.text || "";
  const walletAddress = text.split(" ")[1];
  const userId = ctx.from?.id.toString();

  if (!walletAddress) {
    return ctx.reply("❌ Please provide a wallet address. Usage: /register_wallet <address>");
  }

  try {
    const publicKey = new PublicKey(walletAddress);
    const { error } = await supabase.from("user_wallets").upsert({
      user_id: userId,
      wallet_address: publicKey.toString(),
    }, { onConflict: "user_id" });

    if (error) {
      console.error("Error saving wallet:", error);
      return ctx.reply("❌ Failed to save wallet. Try again later.");
    }

    await ctx.reply(`✅ Wallet registered successfully: ${publicKey.toString()}`);
  } catch (error) {
    console.error("Error registering wallet:", error);
    ctx.reply("❌ Invalid wallet address. Please try again.");
  }
};

export default registerWalletCommand;
