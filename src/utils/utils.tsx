import * as XLSX from "xlsx";

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
    let LIST_API = {}
    export const ListFromDrive = async () => {
           
          try {
            console.log('Dados sendo obtidos do servidor:');
            
            const response = await fetch('/api/list',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
                
            const result = await response.json();

                if (result.success) {
                    console.log("List from Drive:", result.files);
                    LIST_API = result.files
                } 
                else if (result.error) {
                    console.error('List files failed:', result.error);
                }

            } catch (error) {
                console.error('Upload error:', error);
                alert('Erro ao conectar com o servidor');
            }
    };


export function actual_Date(){
    const date = new Date();
    return String(date.getUTCDate()).padStart(2,'0') + "-" + String(date.getUTCMonth()).padStart(2,'0') + "-" + String(date.getUTCFullYear()).padStart(2,'0');
  }