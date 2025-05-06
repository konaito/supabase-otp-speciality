import {createClient} from "@supabase/supabase-js";

if(!process.env.NEXT_PUBLIC_SUPABASE_URL){
    throw new Error("Missing environment NEXT_PUBLIC_SUPABASE_URL");
}

if(!process.env.SUPABASE_SERVICE_ROLE_KEY){
    throw new Error("Missing environment SUPABASE_SERVICE_ROLE_KEY");
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);