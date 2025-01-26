import { config } from "./config/env";
import { Bot } from "grammy";
import { setupCommands } from "./bot";

const { BOT_TOKEN } = config;

if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN is missing. Please check your .env file.");
  process.exit(1);
}

console.log("Initializing bot...");
const bot = new Bot(BOT_TOKEN);

// Configurar comandos y manejadores
setupCommands(bot);

// Iniciar el bot
(async () => {
  try {
    const me = await bot.api.getMe();
    console.log(`✅ Logged in as ${me.username}`);
    bot.start();
    console.log("🚀 Bot is running!");
  } catch (error) {
    console.error("❌ Error starting the bot:", error);
    process.exit(1);
  }
})();

// Manejo de señales
process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());
