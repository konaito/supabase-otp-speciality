import { supabaseAdmin } from "@/lib/supabase/admin";

export const createProfile = async (userId: string, employeeNumber: string, email: string) => {
    const { error } = await supabaseAdmin.from("profiles").insert({
        id: userId,
        employee_number: employeeNumber,
        email,
    });
    if (error) {
        return { success: false, message: error.message };
    }
    return { success: true };
};

    
export const verifyProfile = async (employeeNumber: string, email: string) => {
    const { data, error } = await supabaseAdmin.from("profiles").select("*").eq("employee_number", employeeNumber).eq("email", email);
    if (error) {
        return { success: false, message: error.message };
    }
    if (data.length === 0) {
        return { success: false, message: "Profile not found" };
    }
    return { success: true };
};