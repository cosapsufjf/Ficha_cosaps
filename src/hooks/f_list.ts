import { ListFromDrive } from "@/utils/utils"
import { useFileContext } from "@/context/FileContext";

export const useListActions = () => {
  const { list, setList, setExList, setShowDialog, setTextDialog } = useFileContext();
  
  //google drive api functions
  //list from drive
  const fetchList = async () => {
    setShowDialog(true);
    setTextDialog("Carregando arquivos, aguarde...");
  
    const res = await ListFromDrive();
    const send:any[] = []
  
    res.forEach((item:any)=>{
      if(item.mimeType === "application/json")
          send.push(item)
    })
  
    setList(send);
    setExList(send);
  
    if(send.length===0)
      setTextDialog("Nenhum arquivo encontrado na pasta")
    else
      setShowDialog(false);
  }
  
  
  const searchLista = (e: any) => {  
    e.preventDefault();
    const search = e.target.value;
    const filteredList = list.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase()));
    setExList(filteredList);
  
    if(filteredList.length===0)
    {
      setTextDialog("Nenhum arquivo encontrado");
      setShowDialog(true);
    } 
    else
      setShowDialog(false);
  }
  return { fetchList, searchLista }
};
