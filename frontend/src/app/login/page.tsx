"use client";

import { useState } from "react";
import { Mail, Loader2, KeyRound, User } from "lucide-react";
import { verifyEmailOtp } from "@/lib/auth/login";

export default function Home() {
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [step, setStep] = useState<"email" | "otp" | "success">("email");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState("");

    // メールアドレスに6桁コード送信
    const handleSendOtp = async () => {
        setLoading(true);
        setError("");
        if (!email || !employeeNumber) {
            setError("メールアドレスと社員番号を入力してください");
            setLoading(false);
            return;
        }
        try {
            const res = await fetch("/api/auth/otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, employeeNumber }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "認証コードの送信に失敗しました");
                setLoading(false);
                return;
            }
            setStep("otp");
        } catch {
            setError("認証コードの送信に失敗しました");
        } finally {
            setLoading(false);
        }
    };

    // 6桁コード認証
    const handleVerifyOtp = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await verifyEmailOtp(email, token);
            if (!res.success) {
                setError(res.message || "認証に失敗しました");
                setLoading(false);
                return;
            }
            setStep("success");
        } catch {
            setError("認証に失敗しました");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-2">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 tracking-tight">ログイン</h2>
                <div className="space-y-6">
                    {/* メールアドレス入力フォームは常に表示 */}

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
                                readOnly={step !== "email"}
                            />
                        </div>
                    </div>
                    {step === "email" && (
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                            disabled={loading || !email}
                            onClick={handleSendOtp}
                        >
                            {loading && <Loader2 className="animate-spin w-5 h-5" />}
                            {loading ? "送信中..." : "認証コードを送信"}
                        </button>
                    )}
                    {step === "otp" && (
                        <>
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                                    メールに届いた6桁の認証コード
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <KeyRound className="w-5 h-5" />
                                    </span>
                                    <input
                                        id="otp"
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]{6}"
                                        maxLength={6}
                                        value={token}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value.replace(/[^0-9]/g, ""))}
                                        placeholder="123456"
                                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-800 bg-white tracking-widest text-lg"
                                        required
                                        autoComplete="one-time-code"
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                                disabled={loading || token.length !== 6}
                                onClick={handleVerifyOtp}
                            >
                                {loading && <Loader2 className="animate-spin w-5 h-5" />}
                                {loading ? "認証中..." : "認証"}
                            </button>
                            <button
                                type="button"
                                className="w-full mt-2 text-blue-500 underline text-sm"
                                disabled={loading}
                                onClick={() => setStep("email")}
                            >
                                メールアドレスを修正する
                            </button>
                        </>
                    )}
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