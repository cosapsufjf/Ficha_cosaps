import { useFileContext } from "@/context/FileContext";
import { useFormContextTyped } from "@/context/FormContext";
import { useFormPersistence } from "./persistence";

import { Inputs } from "@/types/inputs";

import { downloadJSON } from "@/utils/utils"
import { export_to_excel } from "@/utils/utils";
import {useRouter} from "next/navigation"
import { update_sheet } from "@/app/api/sheet/update_sheet";
import { orderedFields } from "@/utils/utils";

export const useSubmit = () => {
  const {
    download_json,
    download_xlsx,
    send_drive,
    send_sheet,
    setShow_return_dialog,
    setShow_return_btn,
    setTextValue
    } = useFileContext();
  const { handleSubmit } = useFormContextTyped<Inputs>();
  const { clearForm, saveManually } = useFormPersistence(useFormContextTyped<Inputs>());
  
  const uploadToDrive = async (data:any) => {         
        try {
          setTextValue("Enviando arquivo para o google drive, aguarde por favor");
          
          const response = await fetch('/api/upload', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
                  body: JSON.stringify(data),
              });
              
              const result = await response.json();
  
              if (result.success) {
                  setTextValue("Arquivo enviado com sucesso!")
                  setShow_return_btn(true);
              } 
              else if (result.error) {
                  console.error('Upload failed:', result.error);
                  setTextValue("Erro ao enviar o arquivo. Por favor, tente novamente.") 
                  setShow_return_btn(true);
              }
  
          } catch (error) {
              console.error('Upload error:', error);
              alert('Erro ao conectar com o servidor');
          }
  };
  
  const onSubmit = handleSubmit((data: any) => { 
    saveManually();
  
    const orderedData = orderedFields(data);
      try{
          if(download_json)
              downloadJSON(orderedData,orderedData.pacient_name)
          if(download_xlsx)
              export_to_excel(orderedData)
          if(send_drive)
              uploadToDrive(orderedData);
          if(send_sheet)
            update_sheet(orderedData)

          clearForm();
      }
      catch(e)
      {
          console.log(e);
          setTextValue("Erro ao enviar o arquivo. Por favor, tente novamente.")
      }
  
      setShow_return_dialog(true);
  });
  return { onSubmit }
} 