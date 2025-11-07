import * as XLSX from "xlsx";
import { google } from 'googleapis';
import fs from 'fs';

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

        return LIST_API
    };



export async function baixarArquivoDrive(fileId: string, nomeDestino: string, tipo: 'binario' | 'google', mimeExport?: string) {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
  );
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  let res;
  const dest = fs.createWriteStream(nomeDestino);

  if (tipo === 'google' && mimeExport) {
    // Exportar Google Docs/Sheets
    res = await drive.files.export({
      fileId,
      mimeType: mimeExport
    }, { responseType: 'stream' });
  } else {
    // Baixar arquivo binário
    res = await drive.files.get({
      fileId,
      alt: 'media'
    }, { responseType: 'stream' });
  }
  res.data.pipe(dest);

  return new Promise((resolve:any, reject) => {
    dest.on('finish', resolve);
    dest.on('error', reject);
  });
}

export function actual_Date(){
    const date = new Date();
    return String(date.getUTCDate()).padStart(2,'0') + "-" + String(date.getUTCMonth()).padStart(2,'0') + "-" + String(date.getUTCFullYear()).padStart(2,'0');
  }