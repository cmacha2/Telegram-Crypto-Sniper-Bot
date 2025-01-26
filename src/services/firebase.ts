import admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";

const serviceAccount = require("/Users/cmacha2/Documents/Programming/telegram-sniper-bot/credentials.json") as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
