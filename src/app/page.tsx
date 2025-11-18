"use client"

import React,{useState} from "react";
import Image from "next/image";
import Link from "next/link";
import LOGO from "../assets/images/logo_ficha.png"
import { set } from "react-hook-form";

export default function Page1()
{
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const verify_login = async() => {
        try {
            console.log("chegou na verificação: ",password)

            const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ password }),
                });
                
                const result = await response.json();

                if (result.success && response.ok) {
                    console.log('Login sucessful');
                    setLogin(true);
                } 
                
                else{
                    console.error('Login failed:', result.message);
                    setLogin(false);
                }

            } catch (error) {
                console.error('Login error:', error);
                setLogin(false);
            }
    }

    const handle_login = (e:any)=>{      
        e.preventDefault();  
        verify_login();
    }

    return(
        <div className="LoginContainer">
            <div className="login_dialog">
                <Image className="logo" src={LOGO} alt="Logo COSAPS" />
                <form onSubmit={handle_login}>
                    <p className="big">Insira a senha de login de usuário:</p>
                    <input type="password" placeholder="Senha" className="login_psw" onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit">Entrar</button>
                    <p className="obs big">caso não tenha acesso, entre em contato com a orientadora do projeto</p>

                </form>
                {login && <Link href="/page1.tsx" className="nav_btn">Entrar</Link>}
            </div>
        </div>
    );
}
