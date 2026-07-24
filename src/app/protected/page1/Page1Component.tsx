"use client"
import type { Inputs } from "@/types/inputs"
type Props = {permitted:boolean}

import { useFormContextTyped } from "@/context/FormContext";
import { useFileContext } from "@/context/FileContext";
import { useFormPersistence } from "@/hooks/persistence";
import { useFileActions } from "@/hooks/f_file";

import List from "@/components/List";
import Input_file from "@/components/input_file";
import LOGO_FICHA from "@/components/logo";
import {actual_Date} from "@/utils/utils"

import { useRouter } from "next/navigation";
export default function Page1({permitted}:Props)
{
  const { clear } = useFileActions();
  
  const {
    showSetFile, setShowSetFile,
    showSetList, setShowSetList,
  } = useFileContext();
  
  const phone_regex = /^(55)?(?:([1-9]{2})?)(\d{4,5})(\d{4})$/;
  const router = useRouter();
  const { register, formState: { errors } } = useFormContextTyped<Inputs>();
  const {clearForm, saveManually } = useFormPersistence(useFormContextTyped<Inputs>());

  const clear_actual_form = () => {
    clearForm();
    clear();
  };
  
  if(permitted)
  {
    return (
            <span>
                {showSetList && <List />}
                {showSetFile && <Input_file />}
                {LOGO_FICHA()}
                <nav>
                    <div className="file_btns_container">
                        <div onClick={clear_actual_form} className="nav_btn reduced">Limpar formulário</div>
                        <div onClick={()=>setShowSetFile(!showSetFile)} className="nav_btn reduced">Upload de arquivo</div>
                        <div className="nav_btn reduced" onClick={()=>setShowSetList(!showSetList)}>Pegar do drive</div>
                        </div>
                        <button className="nav_btn" onClick={()=>router.push("/protected/page2")}>Ir para a pagina 2</button>
                </nav>
                <form onSubmit={saveManually}>
                    <div className="container">
                        <div className="side_1 side">
                    {/*=====================session 1============================*/}
                            <div id="session_1">
                                <div className="headmarker s1">
                                    <p className="Headline">1. Dados de Identificação</p>
                                    <p className="question_line">Data da avaliação:
                                        <input type="date" {...register("date")} id="date" defaultValue={actual_Date()}/>
                                    </p>
                                </div>
                                <div id="session_1_questions">
                                    <p className="question_line">
                                        <span>Nome:<input type="text" {...register("pacient_name",{required: true})} id="pacient_name"/></span>
                                        <span>DN:<input type="date" {...register("dn")} id="dn" /></span>
                                    </p>
                                    <p className="question_line">
                                        <span>CNS: <input type="text" {...register("cns")} id="cns" /></span>
                                        <span>CPF: <input type="text" {...register("cpf")} id="cpf"  /></span>
                                    </p>
                                    <p className="question_line">
                                        <span>Endereço: <input type="text" {...register("adress")}  id="adress"/></span>
                                    </p>
                                    <p className="question_line">
                                        <span>Bairro: <input type="text" {...register("neighborhood")} id="neighborhood"/></span>
                                        <span>Cidade: <input type="text" {...register("city")} id="city"/></span>
                                        <span>UF: <input type="text" {...register("uf")} id="uf"/></span>
                                    </p>
                                    <p className="question_line">
                                        <span>Tel: <input type="text" {...register("tel",
                                            {
                                                required: true,
                                                pattern:phone_regex
                                            })}/></span>
                                        {errors.tel && <p className="obs">Telefone inválido</p>}
                                        <span>Anos de estudo: <input className="long" type="text" {...register("study")} id="study"/></span>
                                        
                                    </p>
                                    <p className="question_line">
                                            <span>Ocupação: <input type="text" {...register("Ocupation")} id="Ocupation"/></span>
                                    </p>
                                    <p className="question_line">
                                        <span>Estado Civil: <input type="text" {...register("Civil_status")} id="Civil_status"/></span>
                                        <span>Filhos: <input type="text" {...register("number_of_children")} id="kids"/></span>
                                    </p>
                                    <p className="question_line">
                                        <span>Vacinação em dia? Sim<input type="radio" {...register("Vaccination")} value={"0"} id="Vaccination" />
                                        Não <input type="radio" {...register("Vaccination")} value={"1"} id="Vaccination"/>
                                        <input type="text" {...register("Vaccination_details")} id="Vaccination_details"/>
                                        </span>

                                    </p>
                                    <span>Renda Familiar:</span>
                                    <p className="question_line radio">
                                        <span>menos de 2 salários mínimos<input type="radio" {...register("salary")} value="0" id="session1_renda1"/></span>
                                        <span> mais de dois salários mínimos<input type="radio" {...register("salary")} value="1" id="session1_renda2"/></span>
                                        <span>entre 2 e 5 salários mínimos<input type="radio" {...register("salary")} value="2" id="session1_renda3"/></span>
                                        <span>entre 5 e 15 salários mínimos<input type="radio" {...register("salary")} value="3" id="session1_renda4"/></span>
                                        <span>mais de 15 salários mínimos<input type="radio" {...register("salary")} value="4" id="session1_renda5"/></span>
                                    </p>
                                    <p className="question_line">
                                        <span>Profissionais que acompanham o paciente: <input type="text" {...register("personal_medics")}/></span>
                                    </p>
                                </div>
                            </div>
                {/*=====================session 2============================*/}
                            <div id="session_2">
                                <div className="headmarker">
                                    <p><b>2. Queixa Principal em relação à obesidade:</b></p>
                                </div>
                                <textarea {...register("obesity_complain")} id="session2_obesity_complain"></textarea>
                            </div>
                {/*=====================session 3============================*/}
                            <div id="session_3">
                                <div className="headmarker">
                                    <p><b>3. História patológica atual</b></p>
                                </div>
                                <span>Tendência ao ganho de peso desde:</span>
                                <p className="question_line radio">
                                    <span>Infância<input type="checkbox" {...register("gain_tendency")} value="0" /></span>
                                    <span>Adolescência<input type="checkbox" {...register("gain_tendency")} value="1" /></span>
                                    <span>Gravidez<input type="checkbox" {...register("gain_tendency")} value="2" /></span>
                                    <span>Casamento<input type="checkbox" {...register("gain_tendency")} value="3" /></span>
                                    <span>Recente<input type="checkbox" {...register("gain_tendency")} value="4"/></span>
                                </p>
                                <span style={{flexDirection:"row"}}>Outro: <input type="text" {...register("gain_tendency_str")} id="" /></span>
                                <br />
                                <span>Atribui ganho de peso a:</span>
                                <p className="question_line radio">
                                    <span>Não define a causa<input type="checkbox" {...register("gain_motive")} value="0"/></span>
                                    <span>Erro alimentar<input type="checkbox" {...register("gain_motive")} value="1" /></span>
                                    <span>Falta de atividade física<input type="checkbox" {...register("gain_motive")} value="2" /></span>
                                    <span>Uso de medicamentos<input type="checkbox" {...register("gain_motive")} value="3" id="session3_gain_motive_4"/></span>
                                    <span>Genética<input type="checkbox" {...register("gain_motive")} value="4"/></span>
                                    <span>Suspensão do tabagismo<input type="checkbox" {...register("gain_motive")} value="5"/></span>
                                    <span>Ansiedade<input type="checkbox" {...register("gain_motive")} value="Ansiedade" /></span>
                                </p>
                                <span style={{flexDirection:"row"}}>Outro: <input type="text" {...register("gain_motive_str")} /></span>
                            </div>
                        </div>
                    <div className="side_2 side">
                        <span><b>Tratamentos realizados:</b></span>
                        <p className="question_line radio">
                            <span>Nunca fez<input type="checkbox" {...register("treatments")} value="0" id="session3_treatments_1"/></span>
                            <span>Dieta<input type="checkbox" {...register("treatments")} value="1" id="session3_treatments_2"/></span>
                            <span>Atividade física<input type="checkbox" {...register("treatments")} value="2" id="session3_treatments_3"/></span>
                        </p>
                        <p className="question_line">
                            <span>Cirurgias?:<input type="text" {...register("cirurgies_history")} id="session3_treatments_3"/></span>
                        </p>
                        <p className="question_line">
                            <span>Medicamentos?:<input type="text" {...register("medications_history")}  id="session3_treatments_5"/></span>
                        </p>
                        <p className="question_line col">
                            <span>
                                Qual foi o seu menor peso durante a vida?
                                <input style={{width:"25%"}} type="number" {...register("min_life_weight")} id="session3_min_life_weight" />
                            </span>
                            <span>
                                Qual foi o seu maior peso durante a vida?
                                <input style={{width:"25%"}} type="number" {...register("max_life_weight")} id="session3_max_life_weight" />
                            </span>
                        </p>
                        <p className="obs">
                            *não considerar peso durante a fase de crescimento
                        </p>
                        <div id="session_4">
                                <div className="headmarker">
                                    <p><b>4. Medicações em Uso:</b></p>
                                </div>
                                <textarea
                                {...register("medications")} id="session4_medications"></textarea>
                        </div>
                        <div id="session_5">
                                <div className="headmarker">
                                    <p><b>5. Cirurgias e internações:</b></p>
                                </div>
                                <textarea
                                {...register("cirurgies")} id="session5_cirurgies"></textarea>
                        </div>
                        <div id="session_6">
                                <div className="headmarker">
                                    <p><b>6. Comorbidades:</b></p>
                                </div>
                                <p className="question_line radio">
                                    <span>Diabetes<input type="checkbox" {...register("comorbities")} value={"0"} id="session6_comorbities_1" /></span>
                                    <span>Hipertensão<input type="checkbox" {...register("comorbities")} value={"1"} id="session6_comorbities_2" /></span>
                                    <span>Displidemia<input type="checkbox" {...register("comorbities")} value={"2"} id="session6_comorbities_3" /></span>
                                    <span>DAC<input type="checkbox" {...register("comorbities")} value={"3"} id="session6_comorbities_4" /></span>
                                    <span>SOP<input type="checkbox" {...register("comorbities")} value={"4"} id="session6_comorbities_5" /></span>
                                    <span>Hipotireoidismo<input type="checkbox" {...register("comorbities")} value={"5"} id="session6_comorbities_6" /></span>
                                </p>
                                <span>Outros: <input type="text" {...register("comorbities_str")} id="session6_comorbities_other" /></span>
                        </div>
                        <div id="session_7">
                                <div className="headmarker">
                                    <p><b>7. Histórico familiar:</b></p>
                                </div>
                                <textarea
                                {...register("family_history")} id="session7_family_history"></textarea>
                        </div>
                        <div id="session_8">
                                <div className="headmarker">
                                    <p><b>Avaliação física:</b></p>
                                </div>
                                <div className="question_line s8">
                                    <div>
                                        <span>Peso:<input type="number" {...register("weight")} id="session8_weight" /></span>
                                        <span>Altura:<input type="number" {...register("height")} id="session8_height" /></span>
                                        <span>IMC:<input type="number" {...register("IMC")} id="session8_IMC" /></span>
                                    </div>
                                <div>
                                        <span>PA:<input type="number" {...register("PA")} id="session8_weight" /></span>
                                        <span>Glicemia:<input type="number" {...register("Glicemy")} id="session8_height" /></span>
                                    </div>
                                    <div>
                                        <span>Circunferência abdominal:<input type="number" {...register("waist_circumference")} id="session8_weight" /></span>
                                        <span>Circunferência quadril:<input type="number" {...register("hip_circumference")} id="session8_height" /></span>
                                    </div>
                                </div>
                        </div>
                        <button className="nav_btn" onClick={()=>router.push("/protected/page2")} style={{float:"right"}}>Ir para a pagina 2</button>
                    </div>
                </div>
                </form>
            </span>
        );
  }
  else
    return(<><p>Faça login para acessar essa página</p></>);
}

