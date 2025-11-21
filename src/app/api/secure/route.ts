import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/session";

const getCookie = (CookieHeader:string | null, name:string)=>{
    if(!CookieHeader)
        return undefined

    const cookies = CookieHeader.split(";").map((c)=>c.trim());
    for(const c of cookies)
        if(c.startsWith(name+"="))
            return c.substring(name.length+1);

    return undefined;
}

export async function GET(req: Request){
    const cookie = req.headers.get("cookie");
    const token = getCookie(cookie,"token");

    if(!token)
        return NextResponse.json({"success":false,"message":"Unauthorized"},{status:401});
    
    const payload = verifyToken(token);

    if(!payload)
        return NextResponse.json({"success":false,"message":"Unauthorized"},{status:401});
    
    return NextResponse.json({"success":true,data:{session:payload},"message":"Authorized"},{status:200});
}