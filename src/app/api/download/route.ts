import { google } from 'googleapis';
import fs from 'fs';

export async function download_from_drive(fileId: string, nomeDestino: string, tipo: 'binario' | 'google', mimeExport?: string) {
    const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID, process.env.CLIENT_SECRET,  REDIRECT_URI
  );
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  let res;
  const dest = fs.createWriteStream(nomeDestino);

  if (tipo === 'google' && mimeExport) {
    res = await drive.files.export({
        //export from google cloud
      fileId,
      mimeType: mimeExport
    }, { responseType: 'stream' });
  } else {
    //download binary
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

// Exemplo de chamada:
//download_from_drive('ID_DO_ARQUIVO', 'arquivo.xlsx', 'binario')
//download_from_drive('ID_DO_SHEET', 'planilha.xlsx', 'google', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')