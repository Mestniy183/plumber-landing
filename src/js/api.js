import { createClient } from '@supabase/supabase-js'

const supabaseURL = 'https://voygehzdwnkrsowhseyh.supabase.co';
const supabaseKey = ''

export const supabaseDB = createClient(supabaseURL, supabaseKey)