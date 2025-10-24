import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import { last_sent } from '@/utils/utils';

const CLIENT_ID = '1003109120555-g96jagr5d8aff7qjepv17c84rvnglnro.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

const REFRESH_TOKEN = '1//047kslrC-GxS1CgYIARAAGAQSNwF-L9IrVqLYEZP07uzSbb3fCRoxf-SG7v-fpMqwByQ87diderGlEDpbAYNIn5tfaN2zZaxu83Q'

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

const filePath = path.join(__dirname, last_sent);

const upload_file = async ()=>{
    try{
        const response = await drive.files.create({
            requestBody: {
                name: last_sent,
                mimeType: 'application/json',
            },
            media: {
                mimeType: 'application/json',
                body: fs.createReadStream(filePath),
            }
        });
        console.log(`https://drive.google.com/file/d/${response.data.id}/view?usp=sharing`)
    }
    catch (err:any){
        console.log(err.message)
    }
}


//application/vnd.openxmlformats-officedocument.spreadsheetml.sheet