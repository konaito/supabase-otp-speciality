"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Loader2, User } from "lucide-react";
import { login } from "@/lib/auth/login";

export default function Home() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        if (!email || !employeeNumber) {
            setError("メールアドレスと社員番号を入力してください");
            setLoading(false);
            return;
        }
        try {
            const response = await fetch("/api/auth/make-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, employeeNumber }),
            });
            const {success, error,data,password} = await response.json();
            if (!success) {
                if (error.toLowerCase().includes("already")) {
                    // 既に登録済みなら/loginにリダイレクト
                    router.push("/login");
                    return;
                }
                setError(error);
                return;
            }
            console.log({success, error,data,password});

            const { error:error2} =await login(email,password);
            if (!error2) {
                setError(error2);
                return;
            }
        } catch (error) {
            console.error(error);
            const errMsg = (error instanceof Error ? error.message : String(error)) || "Failed to create user";
            if (errMsg.toLowerCase().includes("already")) {
                router.push("/login");
                return;
            }
            setError("Failed to create user");
        } finally {
            setLoading(false);
        }
    };

    

    return (
        <div className="flex flex-col min-h-screen justify-center">
            <div className="flex justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-2">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 tracking-tight">ユーザー作成フォーム</h2>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="employee_number" className="block text-sm font-medium text-gray-700 mb-1">
                                社員番号
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <User className="w-5 h-5" />
                                </span>
                                <input
                                    id="employee_number"
                                    type="text"
                                    value={employeeNumber}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmployeeNumber(e.target.value)}
                                    placeholder="12345678"
                                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 bg-white"
                                    required
                                    autoComplete="employee_number"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                メールアドレス
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Mail className="w-5 h-5" />
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    placeholder="example@email.com"
                                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 bg-white"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            {loading && <Loader2 className="animate-spin w-5 h-5" />}
                            {loading ? "作成中..." : "Create User"}
                        </button>
                    </div>
                </div>
            </div>


            <div className="flex justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-2 mt-8">
                {error && (
                    <div className="w-full bg-red-100 border border-red-300 text-red-700 rounded-lg px-4 py-2 text-sm flex items-center gap-2">
                        <span className="font-bold">エラー:</span>
                        <span>{error}</span>
                    </div>
                )}
            </div>
        </div>
    );
}