import { NextRequest, NextResponse } from "next/server";
import { createProfile } from "@/lib/db/profiles";
import { createUser } from "@/lib/auth/admin";

export const POST = async (req: NextRequest) => {
    const { email, employeeNumber } = await req.json();
    if (!email || !employeeNumber) {
        return NextResponse.json({ error: "メールアドレスと社員番号を入力してください" }, { status: 400 });
    }
    const {success, message, data,password} = await createUser(email);
    if (!success) {
        return NextResponse.json({ success, error: message,data }, { status: 400 });
    }
    if (!data.user) {
        return NextResponse.json({ success, error: message,data }, { status: 400 });
    }
    const {success:success2, message:message2}=await createProfile(data.user.id,employeeNumber,email);
    if (!success2) {
        return NextResponse.json({ success:success2, error: message2,data }, { status: 400 });
    }
    return NextResponse.json({ success:success2, error: message2,data,password });
};