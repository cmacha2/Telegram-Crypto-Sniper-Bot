import { createClient } from "@supabase/supabase-js";

// URL y API Key de tu proyecto Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";

// Inicializar el cliente de Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
