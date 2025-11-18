import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const body = await req.json().catch(()=>({}));

        const { password } = body ?? {};
        const expected = process.env.COSAPS_LOGIN;

        console.log("chegou na api: ",password)
        console.log("expected",expected)

        if(!password)
            return NextResponse.json({"sucess":false,"message":"Missing password"},{status:400});

        if(!expected)
            return NextResponse.json({"sucess":false,"message":"Internal server error"},{status:500});

        if(password !== expected)
            return NextResponse.json({"sucess":false,"message":"Invalid password"},{status:401});
        
        return NextResponse.json({"success":true,"message":"Login successful"},{status:200});
    }
    catch (err) {
        return NextResponse.json({ ok: false, message: "Unexpected error" },{ status: 500 });
    }
}