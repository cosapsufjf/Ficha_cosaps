import { NextResponse } from "next/server";
import { signToken } from "@/lib/session";

export async function POST(req: Request) {
    try{
        const body = await req.json().catch(()=>({}));

        const { password } = body ?? {};
        const expected = process.env.COSAPS_LOGIN;

        if(!password)
            return NextResponse.json({"sucess":false,"message":"Missing password"},{status:400});

        if(!expected)
            return NextResponse.json({"sucess":false,"message":"Internal server error"},{status:500});

        if(password !== expected)
            return NextResponse.json({"sucess":false,"message":"Invalid password"},{status:401});
        
        const res =  NextResponse.json({"success":true,"message":"Login successful"},{status:200});

        
        const maxAge = 60*60*24;
        const token = signToken({login:true},maxAge);

        res.cookies.set({
            name: "token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:"lax",
            path: "/",
            maxAge: maxAge
        });
        
        return res;
    }
    catch (err) {
        return NextResponse.json({ ok: false, message: "Unexpected error" },{ status: 500 });
    }
}