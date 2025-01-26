import { Context } from "grammy";
import { db } from "../../services/firebase"; // Asegúrate de que este archivo esté correctamente configurado

const listWalletsCommand = async (ctx: Context) => {
  try {
    const telegramId = ctx.from?.id.toString(); // ID de Telegram del usuario

    if (!telegramId) {
      return ctx.reply("❌ Could not retrieve your Telegram ID. Please try again.");
    }

    // Generar una referencia a la colección "user_wallets"
    const userWalletsRef = db.collection("user_wallets");

    // Consultar todas las wallets asociadas con el usuario
    const querySnapshot = await userWalletsRef.where("user_id", "==", telegramId).get();

    if (querySnapshot.empty) {
      return ctx.reply("❌ You don't have any registered wallets. Use /register_wallet to add one.");
    }

    // Obtener las wallets del resultado de la consulta
    const wallets = querySnapshot.docs.map((doc) => `- ${doc.data().wallet_address}`).join("\n");

    // Responder con la lista de wallets
    await ctx.reply(`✅ Your registered wallets:\n${wallets}`);
  } catch (error) {
    console.error("❌ Error listing wallets:", error);
    ctx.reply("❌ An unexpected error occurred. Please try again.");
  }
};

export default listWalletsCommand;
