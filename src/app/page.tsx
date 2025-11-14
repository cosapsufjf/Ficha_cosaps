"use client"

import React,{useState} from "react";
import Image from "next/image";
import Link from "next/link";
import LOGO from "../assets/images/logo_ficha.png"
import { setLoginApp } from "@/managed_context/FormContext";

export default function Page1()
{
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const verify_login = async() => {
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                    body: password,
                });
                
                const result = await response.json();

                if (result.success) {
                    console.log('Login sucessful');
                    setLoginApp(password);
                    setLogin(true);
                    return true;
                } 
                else if (result.error) {
                    console.error('Login failed:', result.error);
                    return false;
                }

            } catch (error) {
                console.error('Login error:', error);
            }
    }

    const handle_login = (e:any)=>{
        e.preventDefault();
        setPassword(e.target.value);
        verify_login();
    }

    return(
        <div className="LoginContainer">
            <div className="login_dialog">
                <Image className="logo" src={LOGO} alt="Logo COSAPS" />
                <p className="big">Insira a senha de login de usuário:</p>
                <input type="password" placeholder="Senha" className="login_psw" onChange={(e) => handle_login(e)}/>
                <p className="obs big">caso não tenha acesso, entre em contato com a orientadora do projeto</p>
                {login && <Link href="/page1.tsx" className="nav_btn">Entrar</Link>}
            </div>
        </div>
    );
}
