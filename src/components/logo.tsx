import Image from "next/image";
import LOGO from "@/assets/images/logo_ficha.png";

export default function LOGO_FICHA(className: string = "img") {
  return (
       <div className="logo_container">
           <Image className={className} src={LOGO} alt="Logo COSAPS"/>
       </div>
   )
 }
