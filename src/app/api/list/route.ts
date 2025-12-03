import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {

    //set google oauth credentials
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
    
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      console.error('Missing Google OAuth environment variables');
      return NextResponse.json(
        { success: false, error: 'Missing Google OAuth configuration on server' },
        { status: 500 }
      );
    }

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

    const Folder_res = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
    fields: 'nextPageToken, files(id, name)',
    pageSize: 1000,
    });

    const folders = Folder_res.data.files ?? [];
    
    const targetFolder = folders.find((f) => f.name === 'Fichas_pacientes');
    if (!targetFolder || !targetFolder.id) {
      console.warn('Pasta Fichas_pacientes não encontrada');
      return NextResponse.json(
        { success: false, error: 'Pasta de destino não encontrada no Google Drive' },
        { status: 404 }
      );
    }

    const FOLDER_DRIVE_ID = targetFolder.id;


    const files: Array<{ id?: string; name?: string; mimeType?: string; modifiedTime?: string }> = [];

    let pageToken: string | undefined = undefined;
    do {
      const res:any = await drive.files.list({
        q: `'${FOLDER_DRIVE_ID}' in parents and trashed=false and (mimeType='application/json' or name contains '.json' or mimeType='application/vnd.google-apps.spreadsheet' or name contains 'Planilha pacientes')`,
        fields: 'nextPageToken, files(id, name, mimeType, modifiedTime)',
        pageSize: 100,
        pageToken,
      });

      if (res.data.files && res.data.files.length) {
        files.push(...res.data.files as any);
      }
      pageToken = res.data.nextPageToken ?? undefined;
    } while (pageToken);


    return NextResponse.json({ success: true, files }, { status: 200 });
  } catch (error: any) {
    console.error('Drive list error:', error);
    return NextResponse.json({ success: false, error: error.message ?? String(error) }, { status: 500 });
  }
}