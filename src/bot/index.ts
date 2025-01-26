import { Bot } from "grammy";
import balanceCommand from "./commands/balance";
import buyCommand from "./commands/buy";
import sellCommand from "./commands/sell";
import sniperCommand from "./commands/sniper";
import registerWalletCommand from "./commands/registerWallet";
import getWalletCommand from "./commands/getWallet";

export const setupCommands = (bot: Bot) => {
  bot.command("register_wallet", registerWalletCommand);
  bot.command("get_wallet", getWalletCommand);
  bot.command("balance", balanceCommand);
  bot.command("buy", buyCommand);
  bot.command("sell", sellCommand);
  bot.command("sniper", sniperCommand);
};
