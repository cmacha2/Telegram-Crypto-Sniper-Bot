import { Bot } from "grammy";
import balanceCommand from "./commands/balance";
import buyCommand from "./commands/buy";
import sellCommand from "./commands/sell";
import sniperCommand from "./commands/sniper";
import registerWalletCommand from "./commands/registerWallet";
import listWalletsCommand from "./commands/listWallets";
import { handleInlineActions } from "./inlineActions";
import startCommand from "./commands/start";

export const setupCommands = (bot: Bot) => {
  bot.command("start", startCommand);
  bot.command("register_wallet", registerWalletCommand);
  bot.command("get_wallet", listWalletsCommand);
  bot.command("balance", balanceCommand);
  bot.command("buy", buyCommand);
  bot.command("sell", sellCommand);
  bot.command("sniper", sniperCommand);

  handleInlineActions(bot);
};
