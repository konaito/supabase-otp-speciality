import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * サーバーサイド専用: Supabase管理者権限でユーザーを作成
 */
export const createUser = async (email: string) => {
    const password = crypto.randomUUID(); // 適当なパスワードを生成
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
            email_confirm: true,
    });
    if (error) {
        return { success: false, message: error.message, data };
    }
    return { success: true, data,password };
};