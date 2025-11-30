import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { google } from 'googleapis';
import fs from 'fs';

async function getFromDrive(nomeDestino: string) {
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
  const fileId = "Planilha_pacientes"
    
  res = await drive.files.export({
      fileId,
      mimeType: "application/vnd.google-apps.spreadsheet"
    }, { responseType: 'stream' });


    res.data.pipe(dest);

    return new Promise((resolve:any, reject) => {
      dest.on('finish', resolve);
      dest.on('error', reject);
    });  
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pathRaw = searchParams.get('DownPath');
  const Down_path = pathRaw ? path.basename(pathRaw) : 'arquivo_drive';

  const tempPath = `/tmp/${Down_path}`;
  try {

    const res = await getFromDrive(tempPath);

    const fileBuffer = await fs.promises.readFile(tempPath);
    await fs.promises.unlink(tempPath)

    return new NextResponse(fileBuffer as BodyInit, {
    headers: {
        'Content-Type': "application/vnd.google-apps.spreadsheet",
        'Content-Disposition': `attachment; filename="${Down_path}"`,
    },
    status: 200,
    });
    
  } catch (err: any) 
  {
      console.error('Erro ao baixar arquivo do Drive:', err);
      if (fs.existsSync(tempPath)) {
            await fs.promises.unlink(tempPath).catch(() => {})
        }
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}