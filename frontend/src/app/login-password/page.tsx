"use client";

import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { login } from "@/lib/auth/login";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await login(email, password);
            if (!res.success) {
                setError(res.error || "ログインに失敗しました");
                setLoading(false);
                return;
            }
        } catch {
            setError("ログインに失敗しました");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-2">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 tracking-tight">ログイン</h2>
                <div className="space-y-6">
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
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            パスワード
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Mail className="w-5 h-5" />
                            </span>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                placeholder="example@email.com"
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 bg-white"
                                required
                                autoComplete="email"
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={!email || !password}
                        onClick={handleLogin}
                    >
                        {loading && <Loader2 className="animate-spin w-5 h-5" />}
                        {loading ? "送信中..." : "認証コードを送信"}
                    </button>
                    {error && (
                        <div className={`w-full rounded-lg px-4 py-2 text-sm flex items-center gap-2 mt-2
                            ${error ? "bg-red-100 border border-red-300 text-red-700" : "bg-green-100 border border-green-300 text-green-700"}`}>
                            {error && (
                                <>
                                    <span className="font-bold">エラー:</span>
                                    <span>{error}</span>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}   