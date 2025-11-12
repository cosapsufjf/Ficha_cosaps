"use client"

import React,{useState} from "react";
import Image from "next/image";
import Link from "next/link";
import LOGO from "../assets/images/logo_ficha.png"
export default function Page1()
{
    const [password, setPassword] = useState("");
    const verify_login = () => {
        return (password == process.env.NEXT_PUBLIC_COSAPS_PASSWORD!)
    }

    return(
        <div className="LoginContainer">
            <div className="login_dialog">
                <Image className="logo" src={LOGO} alt="Logo COSAPS" />
                <p className="big">Insira a senha de login de usuário:</p>
                <input type="password" placeholder="Senha" className="login_psw" onChange={(e) => setPassword(e.target.value)}/>
                <p className="obs big">caso não tenha acesso, entre em contato com a orientadora do projeto</p>
                {verify_login() && <Link href="/page1.tsx" className="nav_btn">Entrar</Link>}
            </div>
        </div>
    );
}
