'use client'
import React, {useState} from "react"

import Page1 from "./page1.tsx/page"
import COSAPS_LOGO from "../../assets/media/img/logo_ficha.png"

import {useForm,SubmitHandler} from 'react-hook-form'
import * as XLSX from "xlsx"
import Link from "next/link"
import type {Inputs} from "@/types/inputs"
import {actual_Date} from "@/utils/utils"

export default function page()
{
    const {register,handleSubmit,reset,formState:{errors}} = useForm<Inputs>({
      defaultValues:{
        date:actual_Date()
      },
    });

    
  const logo_url = COSAPS_LOGO.blurDataURL

  const Logo = ()=>{
    return(
      <div>
        <img src={logo_url} alt=""/>
      </div>
    )
  }
    return (
     <div>
        <Page1/>
     </div>
    )
  }