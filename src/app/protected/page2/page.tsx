import Page2 from "./Page2Component";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/session";

import { FileProvider } from "@/context/FileContext";


export default async function Page() {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    const sessionPayload = token ? verifyToken(token) : null;

    const session = sessionPayload?.login;
    
    if (session) {
        return <FileProvider><Page2 permitido={session}/></FileProvider>;
    } else {
        return <h1>Não autorizado</h1>;
    }
}