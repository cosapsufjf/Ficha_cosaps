import * as XLSX from "xlsx";
import { orderedInputsKeys } from "./orderedInput";
export function export_to_excel(data:any){
        const worksheet = XLSX.utils.json_to_sheet([data]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet,"Planilha_teste");
        XLSX.writeFile(workbook, "ficha_cosaps.xlsx");
      }
      
export function downloadJSON(data: any, filename = "dados.json") {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);

}
  export const ListFromDrive = async () => {
        let LIST_API = []
           
          try {
            const response = await fetch('/api/list',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
                
            const result = await response.json();

                if (result.success) {
                    LIST_API = result.files
                } 
                else if (result.error) {
                    console.error('List files failed:', result.error);
                }

            } catch (error) {
                console.error('Upload error:', error);
                alert('Erro ao conectar com o servidor');
            }

        return LIST_API
};  
  export const generateDownloadURL = (File_download:{fileId:string,DownPath:string,mimeExport:string,tipo:string,download?:string}) => {
    if (File_download.tipo == "google")
    return `/api/download?fileId=${File_download.fileId}&tipo=${File_download.tipo}&mimeExport=${File_download.mimeExport}&DownPath=${File_download.DownPath}&download=${File_download.download}`;
    else
      return `/api/download?fileId=${File_download.fileId}&tipo=${File_download.tipo}&DownPath=${File_download.DownPath}&download=${File_download.download}`;
  }
export function actual_Date(){
    const date = new Date();
    return String(date.getUTCDate()).padStart(2,'0') + "-" + String(date.getUTCMonth()).padStart(2,'0') + "-" + String(date.getUTCFullYear()).padStart(2,'0');
  }

  
  export function orderedFields<T extends Record<string, any>>(data: T): Record<string, any> {
    const orderedObj: Record<string, any> = {};
    for (const key of orderedInputsKeys) {
        if (key in data) {
            orderedObj[key] = data[key];
        }
    }
    return orderedObj;
  }