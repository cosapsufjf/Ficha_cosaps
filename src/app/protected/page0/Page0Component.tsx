"use client"

import React,{useState} from "react";
import Image from "next/image";
import LOGO from "../../../assets/images/logo_ficha.png"

import { useRouter } from "next/navigation";

export default function Page0()
{
    const [password, setPassword] = useState("");
    const router = useRouter();

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
                    router.push("/protected/page1");
                } 
                else{
                    console.error('Login failed:', result.message);
                }

            } catch (error) {
                console.error('Login error:', error);
            }
    }

    const handle_login = async(e:any)=>{      
        e.preventDefault();  
        await verify_login();
    }

    return(
        <div className="LoginContainer">
            <div className="login_dialog">
                <Image className="logo" src={LOGO} alt="Logo COSAPS" />
                <form onSubmit={handle_login}>
                    <p className="big">Insira a senha de login de usuário:</p>
                    <div className="line">
                        <input type="password" placeholder="Senha" className="large_input" onChange={(e) => setPassword(e.target.value)}/>
                        <button type="submit" className="nav_btn">Entrar</button>
                    </div>
                    <p className="obs big">caso não tenha acesso, entre em contato com a orientadora do projeto</p>
                </form>
            </div>
        </div>
    );
}
