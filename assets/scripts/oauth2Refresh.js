require('dotenv').config();
const { google } = require('googleapis');



authorization = function(){

    // GMAIL_ADDRESS = 'akwaahenkan@gmail.com';
    // GMAIL_OAUTH_CLIENT_ID = '21758738074-hib2ou681mc36i5sqslb9rh75bbvle9d.apps.googleusercontent.com';
    // GMAIL_OAUTH_PROJECT_ID= 'angie-app-39bc0';
    // GMAIL_OAUTH_CLIENT_SECRET= '8vflA7n5axaRooXTmGb2GsJJ';
    // GMAIL_OAUTH_REDIRECT_URL= "https://developers.google.com/oauthplayground";

    const code = '4/-QBpO4tMcNuoBwf9uOCWMaHIv25hTJlaZvC3DizWIs50PFhl-niQVPR_FiOFAT-iVtw4-su-1DGRwoICCkqq7lY'; 
    const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_OAUTH_CLIENT_ID = '21758738074-hib2ou681mc36i5sqslb9rh75bbvle9d.apps.googleusercontent.com',
    process.env.GMAIL_OAUTH_CLIENT_SECRET = '8vflA7n5axaRooXTmGb2GsJJ',
    process.env.GMAIL_OAUTH_REDIRECT_URL = "https://developers.google.com/oauthplayground",
  );

  const getToken = async () => {
    const{tokens} = await oauth2Client.getToken(code);
    console.info(tokens);
  };
  
  getToken();

  // Generate a url that asks permissions for Gmail scopes
  const GMAIL_SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send',
  ];
 
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: GMAIL_SCOPES,
  });
 
  console.info(`authUrl: ${url}`);

}

  module.exports = authorization;