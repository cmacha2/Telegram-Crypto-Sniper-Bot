import { Context } from "grammy";
import { walletKeyboard } from "../keyboards";

const startCommand = async (ctx: Context) => {
  await ctx.reply("Welcome! Choose an option:", {
    reply_markup: {
      inline_keyboard: walletKeyboard,
    },
  });
};

export default startCommand;
