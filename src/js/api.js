import { createClient } from '@supabase/supabase-js'

const supabaseURL = window.env.SUPABASE_URL;
const supabaseKey = window.env.SUPABASE_KEY;

export const supabaseDB = createClient(supabaseURL, supabaseKey)