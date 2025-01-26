import { Context } from "grammy";
import { getBalance } from "../../services/solana";

const balanceCommand = async (ctx: Context) => {
  ctx.reply("Buying crypto is not implemented yet.");
};

export default balanceCommand;
