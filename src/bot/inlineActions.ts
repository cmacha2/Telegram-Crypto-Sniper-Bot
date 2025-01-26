import { Bot } from "grammy";

export const handleInlineActions = (bot: Bot) => {
  bot.on("callback_query:data", async (ctx) => {
    const action = ctx.callbackQuery.data;

    switch (action) {
      case "register_wallet":
        await ctx.reply("Please use /register_wallet <address> to register your wallet.");
        break;

      case "view_wallet":
        await ctx.reply("Fetching your registered wallet...");
        // Lógica para mostrar la wallet desde Supabase
        break;

      case "check_balance":
        await ctx.reply("Checking your balance...");
        // Llama al servicio para verificar balance
        break;

      case "buy_crypto":
        await ctx.reply("Buying crypto is not implemented yet.");
        break;

      default:
        await ctx.reply("Unknown action.");
    }

    await ctx.answerCallbackQuery();
  });
};
