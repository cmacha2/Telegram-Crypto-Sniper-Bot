import { Context } from "grammy";

const selectedWallets: Record<string, string> = {}; // In-memory storage for selected wallets

const useWalletCommand = async (ctx: Context) => {
  try {
    const text = ctx.message?.text || "";
    const walletAddress = text.split(" ")[1];
    const userId = ctx.from?.id.toString();

    if (!walletAddress) {
      return ctx.reply("❌ Please provide a wallet address. Usage: /use_wallet <address>");
    }

    // Store the selected wallet
    selectedWallets[userId as any] = walletAddress;
    await ctx.reply(`✅ Selected wallet: ${walletAddress}`);
  } catch (error) {
    console.error("❌ Error selecting wallet:", error);
    ctx.reply("❌ An unexpected error occurred. Please try again.");
  }
};

export const getSelectedWallet = (userId: string): string | null => {
  return selectedWallets[userId] || null;
};

export default useWalletCommand;
