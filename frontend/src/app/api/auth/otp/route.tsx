import { NextRequest, NextResponse } from "next/server";
import { sendOtpToEmail } from "@/lib/auth/login";
import { verifyProfile } from "@/lib/db/profiles";

export const POST = async (req: NextRequest) => {
    const { email, employeeNumber } = await req.json();
    if (!email || !employeeNumber) {
        return NextResponse.json({ success: false, message: "メールアドレスと社員番号を入力してください" }, { status: 400 });
    }
    const {success:success2, message:message2}=await verifyProfile(employeeNumber,email);
    if (!success2) {
        return NextResponse.json({ success: false, message: message2 }, { status: 400 });
    }
    const { success, message } = await sendOtpToEmail(email);
    if (!success) {
        return NextResponse.json({ success, message }, { status: 400 });
    }
    return NextResponse.json({ success });
};