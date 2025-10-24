import { google } from 'googleapis';

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