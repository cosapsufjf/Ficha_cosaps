import { useFileContext } from "@/context/FileContext";
import {useRouter} from "next/navigation"

const Return_dialog = () => {
  const {
    send_drive,
    show_return_btn,
    textValue,
    } = useFileContext();
  const router = useRouter();
  
  return (
    <div className="Box_dialog">
      {send_drive && <p id="upload_text">{textValue}</p>}

      {show_return_btn && send_drive===true ? 
        <button onClick={()=>router.push("/protected/page1")} className="nav_btn"> Preencher novo formulário</button>
        :
        <></>
      }

      {(send_drive===false) && <button onClick={()=>router.push("/protected/page1")} className="nav_btn"> Preencher novo formulário</button>}
    </div>
  );
};

export default Return_dialog;