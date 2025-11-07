import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import os from 'os';
import {actual_Date} from '@/utils/utils';
export async function POST(request: NextRequest) {
  try {
    //upload file to drive, copying to temp directory
    const data = await request.json();
    console.log('Dados recebidos no servidor:', Object.keys(data));
    const filename = `${data.pacient_name || 'dados'}_${actual_Date}.json`;
    const jsonSTR = JSON.stringify(data, null, 2);

    const tempDir = path.join(os.tmpdir(), "uploads_temp");

    if(!fs.existsSync(tempDir)){
      fs.mkdirSync(tempDir,{recursive: true});
    }

    const filePath = path.join(tempDir, filename);
    fs.writeFileSync(filePath, jsonSTR);

    //set google oauth credentials
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN!;

    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );

    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const drive = google.drive({
      version: 'v3',
      auth: oauth2Client
    });

    const res = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
    fields: 'files(id, name)',
    });

    console.log('Pastas disponíveis:', res.data.files);
    
    const FOLDER_DRIVE_ID = res?.data?.files?.find((file: any) => file.name === 'Fichas_pacientes')?.id as string;

    try {
      await drive.files.get({
        fileId: FOLDER_DRIVE_ID,
        fields: 'id, name',
      });
      console.log(`Pasta de destino encontrada: ${FOLDER_DRIVE_ID}`);
    } catch (error) {
      console.error('Pasta de destino não encontrada:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Pasta de destino não encontrada no Google Drive' 
      }, { status: 500 });
    }
    const response = await drive.files.create({
      requestBody: {
        name: filename,
        mimeType: 'application/json',
        parents:[FOLDER_DRIVE_ID]
      },
      media: {
        mimeType: 'application/json',
        body: fs.createReadStream(filePath),
      }
    });

    fs.unlinkSync(filePath);

    return NextResponse.json({ 
      success: true, 
      url: `https://drive.google.com/file/d/${response.data.id}/view?usp=sharing` 
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}