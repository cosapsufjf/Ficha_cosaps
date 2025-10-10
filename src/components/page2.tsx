import React from "react";

export default function Page2({setPag,register}:{setPag:any, register:any}){
    return(
        <form>
            <nav>
                <button className="btn" onClick={()=>setPag(1)}>Voltar Página</button>
                <button className="btn" onClick={()=>setPag(3)}>Próxima Página</button>
            </nav>
            

            <div className="container">
                <div className="side side_1">
                    <div className="headmarker">
                        8. AEV- (Avaliação do Estilo de Vida)
                    </div>
                    <b>Análise do comportamento alimentar</b>

                    <div className="inter_container">
                    <p className="question_line radio">
                        <span>Com restrições: <input type="radio" {...register("Comportamental_analysis")} value={"Com restrições"} /></span>
                        <span>Sem Restrições: <input type="radio" {...register("Comportamental_analysis")} value={"Sem restrições"} /></span>
                        <span>Com horários fixos: <input type="radio" {...register("Comportamental_analysis")} value={"Com horários fixos"} /></span>
                    </p>
                    <p className="question_line radio">
                        
                        <span>Sem Horários fixos: <input type="radio" {...register("Comportamental_analysis")} value={"Sem horários fixos"} /></span>
                         <span>Espaça muito as refeições: <input type="radio" {...register("Comportamental_analysis")} value={"Espaça muito as refeições"} /></span>
                        <span>Belisca muito: <input type="radio" {...register("Comportamental_analysis")} value={"Belisca muito"} /></span>
                    </p>
                    </div>
                    
                    <p className="Headline">Você comeu ontem:</p>
                    <p className="question_line radio">
                        <span>Guloseimas <input type="checkbox" {...register("eat_yesterday")} value={"Guloseimas"} /></span>
                        <span>Verduras e legumes <input type="checkbox" {...register("eat_yesterday")} value={"Verduras e legumes"} /></span>
                        <span>Frutas frescas <input type="checkbox" {...register("eat_yesterday")} value={"Frutas frescas"} /></span>
                    </p>
                    <p className="question_line radio">
                        <span>Feijão <input type="checkbox" {...register("eat_yesterday")} value={"Feijão"} /></span>
                        <span>Hambúrguer e/ou embutidos <input type="checkbox" {...register("eat_yesterday")} value={"Hambúrguer e/ou embutidos"} /></span>
                        <span>Bebidas adoçadas <input type="checkbox" {...register("eat_yesterday")} value={"Bebidas adoçadas"} /></span>
                    </p>    
                        <p className="question_line radio">
                        <span>Macarrão instântaneo <input type="checkbox" {...register("eat_yesterday")} value={"Macarrão instântaneo"} /></span>
                        <span>Líquido sem açúcar <input type="checkbox" {...register("eat_yesterday")} value={"Líquido sem açúcar"} /></span>
                    </p>
                    <p className="Headline">Local onde faz as refeições</p>
                        <p className="question_line radio">
                            <span>Casa: <input type="radio" {...register("meal_place")} /></span>
                            <span>Restaurante <input type="radio" {...register("meal_place")} value={"Restaurante"} /></span>
                            <span>No trabalho <input type="radio" {...register("meal_place")} value={"No trabalho"} /></span>
                            <span>Variado <input type="radio" {...register("meal_place")} value={"Variado"} /></span>
                        </p>
                        <p className="Headline">Modo como faz as refeições</p>
                        <p className="question_line radio">
                            <span>Local Tranquilo <input type="radio" {...register("meal_pace")} value={"Local Tranquilo"} /></span>
                            <span>Local agitado <input type="radio" {...register("meal_pace")} value={"Local agitado"} /></span>
                            <span>Em frente a TV, com celular etc... <input type="radio" {...register("meal_pace")} value={"Em frente a TV, com celular etc..."} /></span>
                        </p>
                        
                    
                </div>

                <div className="side side_2">
                        <p className="Headline">Sente muita fome</p>
                        <p className="question_line radio">
                            <span>Sim: <input type="radio" value={'Sim'} {...register("hunger")} /></span>
                            <span>Não: <input type="radio" value={'Nao'} {...register("hunger")} /></span>
                        </p>
                        <p className="Headline">Mastigação</p>
                        <p className="question_line radio">
                            <span>Mastiga rápido <input type="radio" {...register("mastigation")} value={"Mastiga rápido"} /></span>
                            <span>Mastiga devagar <input type="radio" {...register("mastigation")} value={"Mastiga devagar"} /></span>
                            <span>Pedaços de alimentos nas fezes <input type="radio" {...register("mastigation")} value={"Pedaços de alimentos nas fezes"} /></span>
                        </p>
                         <p className="Headline">Período em que sente mais fome</p>
                        <p className="question_line radio">
                            <span>Manhã <input type="radio" {...register("hungry_period")} value={"Manhã"}/></span>
                            <span>Tarde <input type="radio" {...register("hungry_period")} value={"Tarde"} /></span>
                            <span>Noite <input type="radio" {...register("hungry_period")} value={"Noite"} /></span>
                            <span>Madrugada <input type="radio" {...register("hungry_period")} value={"Madrugada"} /></span>
                            <span>Variado <input type="radio" {...register("hungry_period")} value={"Variado"}/></span>
                        </p>
                        <p className="Headline">Quais refeições você faz ao longo do dia:</p>
                        <p className="question_line radio">
                            <span>café da manhã <input type="checkbox" {...register("meals_in_a_day")} value={"café da manhã"} /></span>
                            <span>lanche da manhã <input type="checkbox" {...register("meals_in_a_day")} value={"lanche da manhã"}/></span>
                            <span>almoço: <input type="checkbox" {...register("meals_in_a_day")} value={"almoço"}/></span>
                            <span>lanche da tarde <input type="checkbox" {...register("meals_in_a_day")} value={"lanche da tarde"}/></span>
                            <span>Jantar: <input type="checkbox" {...register("meals_in_a_day")} value={"Jantar"}/></span>
                            <span>Ceia: <input type="checkbox" {...register("meals_in_a_day")} value={"Ceia"}/></span>
                        </p>

                        <p className="Headline">Quando pensa em comida?</p>
                        <p className="question_line radio">
                            <span>Somente próximo as refeições: <input type="radio" {...register("food_thinking")} value={"Somente proxime as refeicoes"} /></span>
                            <span>Quase sempre: <input type="radio" {...register("food_thinking")} value={"Quase sempre"}/></span>
                            <span>O tempo todo: <input type="radio" {...register("food_thinking")} value={"O tempo todo"}/></span>
                        </p>

                        <p className="Headline">Come compulsivamente?</p>
                        <p className="question_line radio">
                            <span>Sim: <input type="radio" {...register("compulsory_food")} value={"Sim"}/></span>
                            <span>Não: <input type="radio" {...register("compulsory_food")} value={"Não"}/></span>
                        </p>

                        <span><p className="Headline">Possível transtorno alimentar?</p>
                        <input type="text" {...register("TA")}/>
                        </span>
                        

                </div>
                <div className="side side_3">
                    <div className="Table_container">
                        <div className="headmarker">
                        <p className="Headline">Analise do comportamento mental:</p>
                    </div>
                    <div className="box">
                        Patient Health Questionnaire – Two itens PHQ-2
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
                                    1. Pouco interesse ou prazer em fazer as coisas.
                                </td>
                                <td><input type="radio" value={"Nenhuma vez"} {...register("PHQ_2_1")}/></td>
                                <td><input type="radio" value={"Vários dias"} {...register("PHQ_2_1")}/></td>
                                <td><input type="radio" value={"Mais da metade dos dias"} {...register("PHQ_2_1")}/></td>
                                <td><input type="radio" value={"Quase todos os dias"} {...register("PHQ_2_1")}/></td>
                            </tr>
                            <tr>
                                <td>
                                    2. Sentindo-se triste, deprimido ou sem esperança.
                                </td>
                                <td><input type="radio" value={"Nenhuma vez"} {...register("PHQ_2_2")}/></td>
                                <td><input type="radio" value={"Vários dias"} {...register("PHQ_2_2")}/></td>
                                <td><input type="radio" value={"Mais da metade dos dias"} {...register("PHQ_2_2")}/></td>
                                <td><input type="radio" value={"Quase todos os dias"} {...register("PHQ_2_2")}/></td>
                            </tr>
                        
                        </tbody>
                    </table>

                    <p className="obs">
                        * Ponto de corte maior ou igual a 03; * Em caso de PHQ 2 positivo, aplicar PHQ 9;
                    </p>

                    <div className="box">
                        Patient Health Questionnaire – Two itens PHQ-9
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
                                <td>1. Pouco interesse ou prazer nas atividades</td>
                                <td><input type="radio" value={"Nenhuma vez"} {...register("PHQ_9_1")}/></td>
                                <td><input type="radio" value={"Vários dias"} {...register("PHQ_9_1")}/></td>
                                <td><input type="radio" value={"Mais da metade dos dias"} {...register("PHQ_9_1")}/></td>
                                <td><input type="radio" value={"Quase todos os dias"} {...register("PHQ_9_1")}/></td>
                            </tr>
                            <tr>
                                <td>
                                    2. Sentindo-se pra baixo,deprimido ou sem esperança
                                </td>
                                <td><input type="radio" value={"Nenhuma vez"} {...register("PHQ_9_2")}/></td>
                                <td><input type="radio" value={"Vários dias"} {...register("PHQ_9_2")}/></td>
                                <td><input type="radio" value={"Mais da metade dos dias"} {...register("PHQ_9_2")}/></td>
                                <td><input type="radio" value={"Quase todos os dias"} {...register("PHQ_9_2")}/></td>
                            </tr>
                            <tr>
                                <td>
                                    3. Dificuldade pra pegar no sono ou permanecer dormindo, ou dormiu demais
                                </td>
                                <td><input type="radio" value={"Nenhuma vez"} {...register("PHQ_9_3")}/></td>
                                <td><input type="radio" value={"Vários dias"} {...register("PHQ_9_3")}/></td>
                                <td><input type="radio" value={"Mais da metade dos dias"} {...register("PHQ_9_3")}/></td>
                                <td><input type="radio" value={"Quase todos os dias"} {...register("PHQ_9_3")}/></td>
                            </tr>
                            <tr>
                                <td>
                                    4. Sentiu-se cansado ou pouca energia
                                </td>
                                <td><input type="radio" value={"Nenhuma vez"} {...register("PHQ_9_4")}/></td>
                                <td><input type="radio" value={"Vários dias"} {...register("PHQ_9_4")}/></td>
                                <td><input type="radio" value={"Mais da metade dos dias"} {...register("PHQ_9_4")}/></td>
                                <td><input type="radio" value={"Quase todos os dias"} {...register("PHQ_9_4")}/></td>
                            </tr>
                            <tr>
                                <td>
                                    5. Teve falta de apetite ou comeu demais
                                </td>
                                <td><input type="radio" value={"Nenhuma vez"} {...register("PHQ_9_5")}/></td>
                                <td><input type="radio" value={"Vários dias"} {...register("PHQ_9_5")}/></td>
                                <td><input type="radio" value={"Mais da metade dos dias"} {...register("PHQ_9_5")}/></td>
                                <td><input type="radio" value={"Quase todos os dias"} {...register("PHQ_9_5")}/></td>
                            </tr>
                            <tr>
                                <td>
                                    6. Sentiu-se mal consigo mesmo ou se achou um fracasso ou decepção
                                </td>
                                <td><input type="radio" value={"Nenhuma vez"} {...register("PHQ_9_6")}/></td>
                                <td><input type="radio" value={"Vários dias"} {...register("PHQ_9_6")}/></td>
                                <td><input type="radio" value={"Mais da metade dos dias"} {...register("PHQ_9_6")}/></td>
                                <td><input type="radio" value={"Quase todos os dias"} {...register("PHQ_9_6")}/></td>
                            </tr>
                            <tr>
                                <td>
                                    7. Dificuldade de se concentrar nas coisas
                                </td>
                                <td><input type="radio" value={"Nenhuma vez"} {...register("PHQ_9_7")}/></td>
                                <td><input type="radio" value={"Vários dias"} {...register("PHQ_9_7")}/></td>
                                <td><input type="radio" value={"Mais da metade dos dias"} {...register("PHQ_9_7")}/></td>
                                <td><input type="radio" value={"Quase todos os dias"} {...register("PHQ_9_7")}/></td>
                            </tr>
                            <tr>
                                <td>
                                    8. Lentidão para se movimentar ou falar ou ficou agitado demais, andando de um lado para outro
                                </td>
                                <td><input type="radio" value={"Nenhuma vez"} {...register("PHQ_9_8")}/></td>
                                <td><input type="radio" value={"Vários dias"} {...register("PHQ_9_8")}/></td>
                                <td><input type="radio" value={"Mais da metade dos dias"} {...register("PHQ_9_8")}/></td>
                                <td><input type="radio" value={"Quase todos os dias"} {...register("PHQ_9_8")}/></td>
                            </tr>
                            <tr>
                                <td>
                                    9. Pensou em se ferir de alguma maneira ou achou melhor estar morto
                                </td>
                                <td><input type="radio" value={"Nenhuma vez"} {...register("PHQ_9_9")}/></td>
                                <td><input type="radio" value={"Vários dias"} {...register("PHQ_9_9")}/></td>
                                <td><input type="radio" value={"Mais da metade dos dias"} {...register("PHQ_9_9")}/></td>
                                <td><input type="radio" value={"Quase todos os dias"} {...register("PHQ_9_9")}/></td>
                            </tr>
                        
                        </tbody>
                        
                    </table>
                    <p className="obs">
                        * O ponto de corte da escala PHQ9 é a pontuação maior ou igual a 10. – Leve: 10 a 14 pontos – Moderado: 15 a 19 pontos – Grave: 20 a 27 pontos.
                    </p>
                    </div>
                </div>
        </div>
    </form>
    );
}