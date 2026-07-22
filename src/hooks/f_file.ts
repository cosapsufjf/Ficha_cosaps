import EmptyFile from "@/utils/empty_template.json"
import { generateDownloadURL } from "@/utils/utils";
import { useFormContextTyped } from "@/context/FormContext";
import { useFileContext } from "@/context/FileContext";

import type { Inputs } from "@/types/inputs"
import { useEventActions } from "./event";


export const useFileActions = () => {
  const { setKey, setTextDialog, setShowDialog, downloadFileItem } = useFileContext();
  const { reset } = useFormContextTyped<Inputs>();
  const { set_page_free } = useEventActions();
  
  //local file upload
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target && evt.target.result) {
        const dados = JSON.parse(evt.target.result as string);
        reset(dados);
        setKey(prev => prev + 1);
      }
    };
    reader.readAsText(file);
    set_page_free();
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {  
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target && evt.target.result) {
        const data = JSON.parse(evt.target.result as string);
        reset(data);
        setKey(prev => prev + 1);
      }
    };
    reader.readAsText(file);
    set_page_free();
  }
  
  //download file
  const load_file = async (selectedFile: any,) => {
    setTextDialog("Carregando arquivo, aguarde...");
    setShowDialog(true);
  
    const file_filtered = {
      fileId: selectedFile.id,
      DownPath: selectedFile.name,
      mimeExport: selectedFile.mimeType,
      tipo: "binario",
      download: String(downloadFileItem),
    };
  
      const fetch_URL = generateDownloadURL(file_filtered);        
      const res = await fetch(fetch_URL);
  
      if(downloadFileItem)
      {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = selectedFile.name;
          link.click();
          setTimeout(() => URL.revokeObjectURL(url),1000);
      }
      else
      {   
          const result = await res.json();
          reset(result.data);
          setKey(prev => prev + 1);
      }
  
      set_page_free();
      setShowDialog(false);
  }
  
  const clear = () => {
  
    reset(EmptyFile);
    setKey(prev => prev + 1);
  }
  return { handleFile,handleDrop, load_file, clear }
};
