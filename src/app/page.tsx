import Page0 from "./protected/page0/Page0Component";

import { cookies } from "next/headers";
import { verifyToken } from "@/lib/session";
import {redirect} from "next/navigation"

export default async function Page() {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    const sessionPayload = token ? verifyToken(token) : null;
    const session = sessionPayload?.login;
    
    if (session) 
        redirect("/protected/page1");

    return <Page0/>;   
}
