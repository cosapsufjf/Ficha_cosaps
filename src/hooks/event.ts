import { useFileContext } from "@/context/FileContext";

export const useEventActions = () => {
  const { showDialog, showSetFile, showSetList, setShowDialog, setShowSetFile, setShowSetList } = useFileContext();
  
  const drag_enter = (e: any) => {
    e.preventDefault()
    const Drop_area = document.getElementById("Drop_area");
    const drag_text = document.getElementById("drag_text");
    
    if(drag_text && Drop_area)
    {
        drag_text.textContent = "Soltar o arquivo aqui";
        Drop_area.style.backgroundColor = "#a9a6b9ff";
    }    
  }
  
  const drag_leave = (e: any) => {
    e.preventDefault()
    const Drop_area = document.getElementById("Drop_area");
    const drag_text = document.getElementById("drag_text");
    if(drag_text && Drop_area)
    {
        drag_text.textContent = "Arraste ou clique para selecionar um arquivo";
        Drop_area.style.backgroundColor = "#D3CDED";
    }    
  }
  
  const set_page_free = () =>
  {
    document.body.style.overflow = "auto";
  
    if(showDialog)
        setShowDialog(false);
    if(showSetFile)
        setShowSetFile(false);
    if(showSetList)
        setShowSetList(false);
  }
  return { drag_enter, drag_leave, set_page_free }
};
