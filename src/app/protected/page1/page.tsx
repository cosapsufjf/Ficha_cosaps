import Page1 from "./Page1Component";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/session";

export default async function Page() {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    const sessionPayload = token ? verifyToken(token) : null;

    const session = sessionPayload?.login;
    
    if (session) {
        return <Page1 permitido={session}/>;
    } else {
        return <h1>Não autorizado</h1>;
    }
}