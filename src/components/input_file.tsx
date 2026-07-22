import LOGO_FICHA from "@/components/logo"

import { useFileActions } from "@/hooks/f_file";
import { useEventActions } from "@/hooks/event";

const Input_file = () => {
  const { set_page_free, drag_enter, drag_leave } = useEventActions();
  const { handleDrop, handleFile } = useFileActions();

  document.body.style.overflow = "hidden";
  window.scrollTo(0, 0);
  return(
    <div className="Input_box">
      <div className="Drop_area" id="Drop_area" onDrop={handleDrop} onDragOver={(e) => drag_enter(e)} onDragLeave={drag_leave}>
        <h1 id="drag_text">
          Arraste ou clique para selecionar um arquivo
        </h1>
        <input type="file" onChange={handleFile} accept=".json" />
        {LOGO_FICHA("img low_transparency absolute")}
      </div>
      <div onClick={set_page_free} className="nav_btn">Fechar</div>
    </div>
  );
}

export default Input_file;