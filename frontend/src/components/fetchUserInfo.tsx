"use client";

import { supabaseClient } from "@/lib/supabase/client";
import { logout } from "@/lib/auth/login";

export const FetchUserInfo = () => {
    const supabase = supabaseClient;

    const handleFetchUserInfo = async () => {
        console.log("Fetching user info...");
        try {
            const {
                data: { session },
                error: sessionError,
            } = await supabase.auth.getSession();

            if (sessionError || !session) {
                return;
            }

            const response = await fetch("/api/get-user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.access_token}`,
                },
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleLogout = async () => {
        console.log("Logging out...");
        try {
            const { success, message } = await logout();
            if (!success) {
                console.error(message);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="fixed top-2 left-2 flex gap-2">
            <button
                type="button"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleFetchUserInfo}
            >
                Fetch User Info
            </button>
            <button
                type="button"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    )
};
