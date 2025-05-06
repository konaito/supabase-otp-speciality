import { NextRequest, NextResponse } from "next/server";
import { verifyEmailOtp } from "@/lib/auth/login";

export const POST = async (req: NextRequest) => {
    const { email, token } = await req.json();
    const { success, message } = await verifyEmailOtp(email, token);
    if (!success) {
        return NextResponse.json({ success, message }, { status: 400 });
    }
    return NextResponse.json({ success });
};