import Page3 from "./Page3Component";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/session";
import { FileProvider } from "@/context/FileContext";

export default async function Page() {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    const sessionPayload = token ? verifyToken(token) : null;

    const session = sessionPayload?.login;
    
    if (session) {
        return <FileProvider><Page3 permitted={session}/></FileProvider>;
    } else {
        return <h1>Não autorizado</h1>;
    }
}