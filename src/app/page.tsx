'use client'
import React, {useState} from "react"

import Page1 from "../components/page1"
import Page2 from "../components/page2"
import Page3 from "../components/page3"
import COSAPS_LOGO from "../../assets/media/img/logo_ficha.png"

import {useForm,SubmitHandler} from 'react-hook-form'
import * as XLSX from "xlsx"

export default function page()
{
      const export_to_excel= (data:any)=>{
        const worksheet = XLSX.utils.json_to_sheet([data]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet,"Planilha_teste");
        XLSX.writeFile(workbook, "ficha_cosaps.xlsx");
      }

    const downloadJSON = (data:any, filename = "dados.json") => {
      const jsonStr = JSON.stringify(data, null, 2); // bonito com indentação
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();

      URL.revokeObjectURL(url);
  }
  const actual_Date = () =>{
    const date = new Date();
    return String(date.getUTCDate()).padStart(2,'0') + "-" + String(date.getUTCMonth()).padStart(2,'0') + "-" + String(date.getUTCFullYear()).padStart(2,'0');
  }
      interface Inputs{
        pacient_name: string
        date:string
        dn:string
        cns:string
        cpf:string
        adress:string
        neighborhood:string
        city:string
        uf:string
        tel:string
        study:number
        ocupation:string
        civil_state:string
        kids:number
        vaccine:string
        salary:string
        personal_medics:string

        obesity_complain:string
        gain_tendency:[]
        gain_tendency_str:string
        gain_motive:[]
        gain_motive_str:string
        treatments:[]
        min_life_weight:number
        max_life_weight:number

        cirurgies_history:string
        medications_history:string
        medications:string
        cirurgies:string
        comorbities:[]
        comorbities_str:[]
        family_history:string

        weight:number
        height:number
        waist_circumference:number
        hip_circumference:number
        IMC:number
        PA:number
        Glicemy:number

        Comportamental_analysis:string
        eat_yesterday:[]
        meal_place:[]
        meal_pace:string
        hunger:string 
        mastigation:string 
        hungry_period:string 
        meals_in_a_day:[] 
        food_thinking:string 
        compulsory_food:string 
        TA:string 
        

        PHQ_2_1:string
        PHQ_2_2:string

        PHQ_9_1:string
        PHQ_9_2:string
        PHQ_9_3:string
        PHQ_9_4:string
        PHQ_9_5:string
        PHQ_9_6:string
        PHQ_9_7:string
        PHQ_9_8:string
        PHQ_9_9:string

        GAD_2_1:string
        GAD_2_2:string
        
        GAD_7_1:string
        GAD_7_2:string
        GAD_7_3:string
        GAD_7_4:string
        GAD_7_5:string
        GAD_7_6:string
        GAD_7_7:string
        
        sleep_schedule:string
        sleep_quality:string
        sleep_disturby:string
        sleep_observations:string

        PACE:string
        IPAQ:string
        respiratory_system:string 
        gastrointestinal_system:string
        renal_system:string
        neurological_system:string
        ósteoarticular_system:string

        muscular_pain:string
        pain_origin:string
        fracture:string 
        team_analisys:string
        session_avaliator:string
    };
    const {register,handleSubmit,reset,formState:{errors}} = useForm<Inputs>({
      defaultValues:{
        date:actual_Date()
      },
    });
    const onSubmit: SubmitHandler<Inputs> = (data)=>{

        console.log(data)
        export_to_excel(data)
        downloadJSON(data,data.pacient_name )
    }
    
  const logo_url = COSAPS_LOGO.blurDataURL
  const [Pag,setPag] = useState(1);
  const render = (Actual_page:number)=>{
    switch(Actual_page){
      case 1:
        return <Page1 setPag={setPag} register={register} reset={reset}/>
      case 2:
        return <Page2 setPag={setPag} register={register}/>
      case 3:
        return <Page3 setPag={setPag} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}/>
      default:
        return <div>Page not found</div>
    }
  }



  const Logo = ()=>{
    return(
      <div>
        <img src={logo_url} alt=""/>
      </div>
    )
  }
    return (
      <html>
        <body>
          <Logo/>
          {render(Pag)}
        </body>
      </html>
    )
  }