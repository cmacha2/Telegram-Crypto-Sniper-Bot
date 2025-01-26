import { Context } from "grammy";
import { PublicKey } from "@solana/web3.js";
import { db } from "../../services/firebase"; // Importa tu configuración de Firestore
import { v5 as uuidv5 } from "uuid";

const NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"; // Namespace UUID estándar

const registerWalletCommand = async (ctx: Context) => {
  try {
    const text = ctx.message?.text || "";
    const walletAddress = text.split(" ")[1];
    const telegramId = ctx.from?.id.toString(); // ID de Telegram del usuario

    // Validar entrada: verificar si se proporcionó una dirección de wallet
    if (!walletAddress) {
      return ctx.reply("❌ Please provide a wallet address. Usage: /register_wallet <address>");
    }

    // Validar la dirección de la wallet usando Solana PublicKey
    let publicKey: PublicKey;
    try {
      publicKey = new PublicKey(walletAddress);
    } catch (validationError) {
      return ctx.reply("❌ Invalid wallet address provided. Please check and try again.");
    }

    // Generar un UUID basado en el ID de Telegram
    const userId = uuidv5(telegramId as any, NAMESPACE);

    // Referencia a la colección "user_wallets" en Firestore
    const userWalletsRef = db.collection("user_wallets");

    // Comprobar si la wallet ya existe
    const querySnapshot = await userWalletsRef
      .where("user_id", "==", userId)
      .where("wallet_address", "==", publicKey.toString())
      .get();

    if (!querySnapshot.empty) {
      return ctx.reply("❌ This wallet is already registered.");
    }

    // Agregar la nueva wallet
    await userWalletsRef.add({
      user_id: userId, // UUID único del usuario
      wallet_address: publicKey.toString(), // Dirección pública de la wallet
      created_at: new Date().toISOString(), // Timestamp
    });

    // Confirmar registro exitoso
    await ctx.reply(`✅ Wallet registered successfully: ${publicKey.toString()}`);
  } catch (error) {
    // Manejar errores generales
    console.error("❌ Error registering wallet:", error);
    ctx.reply("❌ An unexpected error occurred. Please try again.");
  }
};

export default registerWalletCommand;
