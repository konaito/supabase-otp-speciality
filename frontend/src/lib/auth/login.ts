import { supabaseClient } from "@/lib/supabase/client";


export const sendOtpToEmail = async (email: string) => {
    // SupabaseのメールOTP（6桁コード）送信
    const { error } = await supabaseClient.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: false,
        },
    });
    if (error) {
        return { success: false, message: error.message };
    }
    return { success: true };
};

export const verifyEmailOtp = async (email: string, token: string) => {
    // SupabaseのメールOTP（6桁コード）検証
    const { error } = await supabaseClient.auth.verifyOtp({
        email,
        token,
        type: "email",
    });
    if (error) {
        return { success: false, message: error.message };
    }
    return { success: true };
};

export const logout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
        return { success: false, message: error.message };
    }
    return { success: true };
};

export const login = async (email: string, password: string) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        return { success: false, error: error.message ,data};
    }
    return { success: true,data,error:error};
};