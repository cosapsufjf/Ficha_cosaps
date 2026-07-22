"use client"

import React from "react";
import { useFormContextTyped } from "@/context/FormContext";
import { useFileContext } from "@/context/FileContext";
import { useSubmit } from "@/hooks/submit";

import type { Inputs } from "@/types/inputs"

import {useRouter} from "next/navigation"
import Return_dialog from "@/components/return_dialog";


type Props = {permitted:boolean}
export default function Page3({permitted}:Props)
{
    const { register,handleSubmit } = useFormContextTyped<Inputs>();
    const {
      download_json,
      setDownload_json,
      download_xlsx,
      setDownload_xlsx,
      send_drive,
      setSend_drive,
      send_sheet,
      setSend_sheet,
      show_return_dialog,
      
    } = useFileContext();
  
    const { onSubmit } = useSubmit();
    const router = useRouter();
  
    if(permitted)
        return(
        <span>
            <button className="nav_btn" onClick={()=>router.push("/protected/page2")}>Voltar</button>
            <form onSubmit={handleSubmit((data:any)=>onSubmit(data))}>
                    <div className="container">
                        <div className="side_1">
                            <div className="Table_container">
                                <div className="headmarker">
                                    <p className="Headline">Analise do comportamento mental:</p>
                                </div>
                                <div className="box">
                                    General Ansiedade Disorders – Two itens GAD-2
                                </div>
                                <div className="box">
                                    Ao longo das últimas 2 (duas) semanas, com que frequência você foi incomodado por algum dos seguintes problemas?
                                </div>
                                <table className="box">
                                    <tbody>
                                
                                        <tr>
                                            <td> </td>
                                            <td>Nenhuma vez</td>
                                            <td>Vários dias</td>
                                            <td>Mais da metade dos dias</td>
                                            <td>Quase todos os dias</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                1. Sentindo-se nervosa, ansioso ou no seu limite.
                                            </td>
                                            <td><input type="radio" value={"0"} {...register("GAD_2_1")}/></td>
                                            <td><input type="radio" value={"1"} {...register("GAD_2_1")}/></td>
                                            <td><input type="radio" value={"2"} {...register("GAD_2_1")}/></td>
                                            <td><input type="radio" value={"3"} {...register("GAD_2_1")}/></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                2. Não ser capaz de interromper ou controlar as preocupações.
                                            </td>
                                            <td><input type="radio" value={"0"} {...register("GAD_2_2")}/></td>
                                            <td><input type="radio" value={"1"} {...register("GAD_2_2")}/></td>
                                            <td><input type="radio" value={"2"} {...register("GAD_2_2")}/></td>
                                            <td><input type="radio" value={"3"} {...register("GAD_2_2")}/></td>
                                        </tr>
                                
                                    </tbody>
                                </table>
                                <p className="obs">
                                    * Ponto de corte maior ou igual a 03; * Em caso de PHQ 2 positivo, aplicar GAD 7;
                                </p>
                                <div className="box">
                                    General Ansiedade Disorders – Two itens GAD-7
                                </div>
                                <div className="box">
                                    Ao longo das últimas 2 (duas) semanas, com que frequência você foi incomodado por algum dos seguintes problemas?
                                </div>
                                <table className="box">
                                    <tbody>
                                
                                    <tr>
                                        <td> </td>
                                        <td>Nenhuma vez</td>
                                        <td>Vários dias</td>
                                        <td>Mais da metade dos dias</td>
                                        <td>Quase todos os dias</td>
                                    </tr>
                                    <tr>
                                        <td>1. Sentir-se nervoso, ansioso ou no limite</td>
                                        <td><input type="radio" value={"0"} {...register("GAD_7_1")}/></td>
                                        <td><input type="radio" value={"1"} {...register("GAD_7_1")}/></td>
                                        <td><input type="radio" value={"2"} {...register("GAD_7_1")}/></td>
                                        <td><input type="radio" value={"3"} {...register("GAD_7_1")}/></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            2. Não ser capaz de parar ou controlar as preocupações
                                        </td>
                                        <td><input type="radio" value={"0"} {...register("GAD_7_2")}/></td>
                                        <td><input type="radio" value={"1"} {...register("GAD_7_2")}/></td>
                                        <td><input type="radio" value={"2"} {...register("GAD_7_2")}/></td>
                                        <td><input type="radio" value={"3"} {...register("GAD_7_2")}/></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            3. Preocupar-se muito com diversas coisas
                                        </td>
                                        <td><input type="radio" value={"0"} {...register("GAD_7_3")}/></td>
                                        <td><input type="radio" value={"1"} {...register("GAD_7_3")}/></td>
                                        <td><input type="radio" value={"2"} {...register("GAD_7_3")}/></td>
                                        <td><input type="radio" value={"3"} {...register("GAD_7_3")}/></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            4. Dificuldade para relaxar
                                        </td>
                                        <td><input type="radio" value={"0"} {...register("GAD_7_4")}/></td>
                                        <td><input type="radio" value={"1"} {...register("GAD_7_4")}/></td>
                                        <td><input type="radio" value={"2"} {...register("GAD_7_4")}/></td>
                                        <td><input type="radio" value={"3"} {...register("GAD_7_4")}/></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            5. Ser tão inquieto que se torna difícil permanecer parado
                                        </td>
                                        <td><input type="radio" value={"0"} {...register("GAD_7_5")}/></td>
                                        <td><input type="radio" value={"1"} {...register("GAD_7_5")}/></td>
                                        <td><input type="radio" value={"2"} {...register("GAD_7_5")}/></td>
                                        <td><input type="radio" value={"3"} {...register("GAD_7_5")}/></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            6. Ficar facilmente irritado ou irritável
                                        </td>
                                        <td><input type="radio" value={"0"} {...register("GAD_7_6")}/></td>
                                        <td><input type="radio" value={"1"} {...register("GAD_7_6")}/></td>
                                        <td><input type="radio" value={"2"} {...register("GAD_7_6")}/></td>
                                        <td><input type="radio" value={"3"} {...register("GAD_7_6")}/></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            7. Sentir medo como se algo horrível fosse acontecer
                                        </td>
                                        <td><input type="radio" value={"0"} {...register("GAD_7_7")}/></td>
                                        <td><input type="radio" value={"1"} {...register("GAD_7_7")}/></td>
                                        <td><input type="radio" value={"2"} {...register("GAD_7_7")}/></td>
                                        <td><input type="radio" value={"3"} {...register("GAD_7_7")}/></td>
                                    </tr>
                                    </tbody>
                                </table>
                                <p className="obs">
                                * Ponto de corte maior ou igual a 10; De acordo com GAD7: • Ansiedade leve: 5 a 9 pontos ; • Ansiedade moderada: 10 a 14 pontos; • Ansiedade grave: 15 a 21 pontos.
                                </p>
                            </div>

                        <div className="headmarker">
                            <span className="Headline">
                                Análise Breve do Sono (Aplicar PSQI):
                            </span><br />
                        </div>
                        <p className="question_line">
                            <span>Horário de sono:<input type="text" {...register("sleep_schedule")}/></span>
                        </p>
                        <p className="question_line radio">
                            <span>Considera o sono: Reparador <input type="radio" value={"0"} {...register("sleep_quality")} /></span>
                            <span>Não reparador<input type="radio" value={"1"} {...register("sleep_quality")} /></span>
                        </p>
                        <p className="question_line col">
                            <span>Apresenta ou possui algum tipo de distúrbio de sono?</span> <input type="text" {...register("sleep_disturby")}/>
                            <span>Obs.:</span> <input type="text" {...register("sleep_observations")}/>

                        </p>
                        </div>

                        <div className="side_2">
                            <div className="box center">
                                <p className="Headline">
                                    Análise do nível de atividade física:
                                </p>

                                <p className="question_line">
                                    <span>PACE= <input type="text" {...register("PACE")}/></span>
                                </p>
                                <p className="question_line radio">
                                    <span>muito ativo <input type="radio" {...register("IPAQ")} value={"0"}/></span>
                                    <span>ativo <input type="radio" {...register("IPAQ")} value={"1"}/></span>
                                    <span>irregularmente ativo <input type="radio" {...register("IPAQ")} value={"2"}/></span>
                                    <span>sedentário <input type="radio" {...register("IPAQ")} value={"3"}/></span>
                                </p>
                            </div>

                            <p className="question_line col">
                                <span className="Headline">
                                    9. Sistemas
                                </span><br />
                                <span>Sistema respiratório:</span><input type="text" {...register("respiratory_system")}/>
                                <span>Sistema gastrointestinal:</span><input type="text" {...register("gastrointestinal_system")}/>
                                <span>Sistema renal:</span> <input type="text" {...register("renal_system")}/>
                                <span>Sistema neurológico:</span><input type="text" {...register("neurological_system")}/>
                                <span>Sistema ósteo-mio-articular:</span> <input type="text" {...register("osteoarticular_system")}/>
                            </p>
                            <p className="question_line col">
                                <span>Sente dores musculares? </span><input type="text" {...register("muscular_pain")}/>
                                <span>Possível causa da dor: </span><input type="text" {...register("pain_origin")}/>
                                <span>Já sofreu fraturas? </span><input type="text" {...register("fracture")}/>
                            </p>
                            <p className="question_line column">
                                <span className="Headline">
                                    14 – Análise diagnóstica e encaminhamentos da equipe:
                                </span><br />
                                <textarea {...register("team_analisys")}></textarea>
                            </p>
                            <span>Avaliador(es): <input type="text" {...register("session_avaliator")}/></span>
                            <div className="center_container" style={{display:"flex", flexDirection:"column"}}>
                                <div>Deseja baixar o arquivo do Formulário?<input type="checkbox" name="DownloadJson" id="DownloadJson" 
                                onClick={()=>setDownload_json(!download_json)}/></div>
                                <div>Deseja baixar o arquivo do Excel?<input type="checkbox" name="DownloadXlsx" id="DownloadXlsx" 
                                onClick={()=>setDownload_xlsx(!download_xlsx)}/></div>
                                <div>Deseja enviar o arquivo para o drive?
                                    <input type="checkbox" defaultChecked={send_drive} name="Send_drive" id="Send_drive" onClick={()=>setSend_drive(!send_drive)}/>
                                </div>
                                <div>Deseja adicionar linha na planilha?
                                    <input type="checkbox" defaultChecked={send_sheet} name="Send_drive" id="Send_drive" onClick={()=>setSend_sheet(!send_sheet)}/>
                                </div>
                                <button className="nav_btn" type="submit">
                                    Enviar
                                </button>
                            </div>
                        </div>
                </div>
        </form>
        {show_return_dialog && <Return_dialog/>}
        </span>
        );
    else
        return(<><p>Faça login para acessar essa página</p></>)
}