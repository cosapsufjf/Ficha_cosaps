import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { google } from 'googleapis';
import fs from 'fs';

function streamToString(stream:any): Promise<string> {
  const chunks:any[]= [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk:Buffer) => chunks.push(Buffer.from(chunk)));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
}
async function getFromDrive(fileId: string, nomeDestino: string, tipo: 'binario' | 'google', mimeExport?: string, download?: boolean) {
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
    // google cloud
    res = await drive.files.export({
      fileId,
      mimeType: mimeExport
    }, { responseType: 'stream' });
  } else {
    // binary archive
    res = await drive.files.get({
      fileId,
      alt: 'media'
    }, { responseType: 'stream' });
  }

  if(download)
  {
    res.data.pipe(dest);

    return new Promise((resolve:any, reject) => {
      dest.on('finish', resolve);
      dest.on('error', reject);
    });
  }
  else if (res.data) 
    {
      const text = (await streamToString(res.data));
      console.log("saida:\n",text)
      return text
    }      
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get('fileId');
  const tipo = searchParams.get('tipo');
  const mimeExport = searchParams.get('mimeExport') || '';
  const pathRaw = searchParams.get('DownPath');
  const download = searchParams.get('download')
  const Down_path = pathRaw ? path.basename(pathRaw) : 'arquivo_drive';
  const bool_download = download === 'true';

  if (!fileId) {
    return NextResponse.json({ success: false, error: 'Parâmetro fileId obrigatório' }, { status: 400 });
  }
  const tempPath = `/tmp/${Down_path}`;
  try {
    const res = await getFromDrive(fileId, tempPath, tipo as 'binario' | 'google', mimeExport, bool_download);
    if(download)
    {
      const fileBuffer = await fs.promises.readFile(tempPath);
    
      await fs.promises.unlink(tempPath)

      const mimeType = mimeExport || 'application/octet-stream';

      return new NextResponse(fileBuffer as BodyInit, {
        headers: {
          'Content-Type': mimeType,
          'Content-Disposition': `attachment; filename="${Down_path}"`,
        },
        status: 200,
      });
    }
    else
      return NextResponse.json({ success: true, data: res }, { status: 200 });

  } catch (err: any) 
  {
      console.error('Erro ao baixar arquivo do Drive:', err);
      if (fs.existsSync(tempPath)) {
            await fs.promises.unlink(tempPath).catch(() => {})
        }
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}