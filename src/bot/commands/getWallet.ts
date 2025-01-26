import { Context } from "grammy";
import { supabase } from "../../services/supabase";

const getWalletCommand = async (ctx: Context) => {
  const userId = ctx.from?.id.toString();

  const { data, error } = await supabase
    .from("user_wallets")
    .select("wallet_address")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    console.error("Error fetching wallet:", error);
    return ctx.reply("❌ No wallet found. Use /register_wallet to register one.");
  }

  await ctx.reply(`✅ Your registered wallet: ${data.wallet_address}`);
};

export default getWalletCommand;
