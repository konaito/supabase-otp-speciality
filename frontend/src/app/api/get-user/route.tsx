import { supabaseClient } from "@/lib/supabase/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
    const headersList = await headers()
    const authorization = headersList.get('Authorization')

    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    const token = authorization.split(' ')[1]

    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser(token)
    if (authError) {
        return NextResponse.json({ error: authError.message }, { status: 400 });
    }
    return NextResponse.json(user);
};  