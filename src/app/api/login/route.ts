import type { NextApiRequest, NextApiResponse } from "next";

//variable to verify login on session
let LoginApp = false

type Data = {ok:boolean; message?:string, data?:any}
export default function handler(req:NextApiRequest, res:NextApiResponse<Data>) {
    if (req.method != "POST")
        return res.status(405).json({ok:false,message:"Method not allowed"});

    const {password} = req.body ?? {};

    if(!password && !LoginApp)
        return res.status(400).json({ok:false,message:"Missing password"});
    else if(LoginApp)
        return res.status(200).json({ok:true,data:{login:LoginApp}});
    
    const expected = process.env.COSAPS_LOGIN;
    if(!expected)
        return res.status(500).json({ok:false,message:"Internal server error"});

    if(password != expected)
        return res.status(401).json({ok:false,message:"Unauthorized"});

    LoginApp = true
    return res.status(200).json({ok:true});
}