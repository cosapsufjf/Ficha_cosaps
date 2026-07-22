import React from "react";

import { useFileContext } from "@/context/FileContext";
import { useEventActions } from "@/hooks/event";
import { useFileActions } from "@/hooks/f_file";
import { useListActions } from "@/hooks/f_list";

const List = () => {
  const { TextDialog, Exlist, downloadFileItem, setDownloadFileItem, showDialog } = useFileContext();
  const { set_page_free } = useEventActions();
  const { load_file } = useFileActions();
  const { fetchList, searchLista } = useListActions();
  
  const list_files_from_drive = () => 
  {
      return Exlist.map((item: any, index: number) => (
        <div key={index} className="list_item" onClick={() => load_file(item)}>
                <p>{item.name}</p>    
            </div>
        ));
    }

    const Dialog = ()=>{
        return(
            <div className="Box_dialog big_box">
                <p>{TextDialog}</p>
            </div>
        )
    }
  
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    return(
        <div className="Input_box">
            <div className="list_container">
            <div className="list_selector_container">
                <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                    <div onClick={()=>fetchList()} className="nav_btn">Obter listagem</div>
                    <div onClick={set_page_free} className="nav_btn">Fechar</div>
                    <div>
                        <input type="long text" placeholder="Busca" onChange={(e)=>searchLista(e)} style={{width:"200px"}}/>
                    </div>
                </div>
                <div className="list_item"onClick={()=>setDownloadFileItem(!downloadFileItem)}> Baixar ou abrir arquivo?: {downloadFileItem?" Baixar":" Abrir"}</div>
                
            </div>

            {list_files_from_drive()}
            </div>

            {showDialog && Dialog()}
        </div>
    )
}

export default List;