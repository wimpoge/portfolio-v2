import express from 'express';
import { google } from 'googleapis';
const { OAuth2 } = google.auth;
import { OAuth2Client } from 'google-auth-library';
import cors from 'cors';

const app = express();
app.use(cors()); // Add this line

app.use(express.json()); // Use express.json() instead of body-parser

const oauth2Client = new OAuth2(
    '45034668486-m0ua9ernnm9s3851nbot9e018iep13bh.apps.googleusercontent.com',
    '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',
    'http://localhost:3000/oauth2callback'  // This should be a URL on your server where Google can send the authorization code.
);

app.get('/authorize', (req, res) => {
    // Generate a URL and redirect the user to it
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/gmail.send'  // This scope allows sending email.
    });
    res.redirect(url);
});

app.get('/oauth2callback', async (req, res) => {
    const { code } = req.query;

    const { tokens } = await oauth2Client.getToken(code);
    console.log('Your access token is:', tokens.access_token);

    // Now you can use this access token with the Gmail API
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    // ...
});

// app.post('/send-email', async (req, res) => {
//     // const { name, email, message } = req.body;

//     // Here you would actually send the email using the Gmail API
//     // This is just a placeholder as the Gmail API requires OAuth2 authentication
//     const emailLines = [
//         'From: wimpoge@gmail.com',
//         'To: afitrabbani@gmail.com',
//         'Content-type: text/html;charset=iso-8859-1',
//         'MIME-Version: 1.0',
//         'Subject: Test Subject',
//         '',
//         'This is a test email'
//       ];
   
//       const email = emailLines.join('\r\n').trim();
//       const base64Email = Buffer.from(email).toString('base64');

//       const result = await gmail.messages.send({
//         userId: 'me',
//         requestBody: {
//           raw: base64Email
//         }
//       });
//       console.log(result);
//     res.status(200).send('Email sent');
// });
// Your OAuth2 client credentials
const credentials = {
    client_id: '45034668486-m0ua9ernnm9s3851nbot9e018iep13bh.apps.googleusercontent.com',
    client_secret: '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',
    redirect_uris: ['http://localhost:3000/oauth2callback'],
  };
  
  // Create an OAuth2 client
  const oAuth2Client = new OAuth2Client(credentials.client_id, credentials.client_secret, credentials.redirect_uris[0]);
  
  // Set the token obtained from the authentication process
  oAuth2Client.setCredentials({
    access_token: 'ACCESS_TOKEN',
    refresh_token: 'REFRESH_TOKEN',
  });
  
  const gmail = google.gmail({
    version: 'v1',
    auth: oAuth2Client,
  });
  
  app.post('/send-email', async (req, res) => {
    // const { name, email, message } = req.body;
  
    // Here you would actually send the email using the Gmail API
    // This is just a placeholder as the Gmail API requires OAuth2 authentication
    const emailLines = [
      'From: wimpoge@gmail.com',
      'To: afitrabbani@gmail.com',
      'Content-type: text/html;charset=iso-8859-1',
      'MIME-Version: 1.0',
      'Subject: Test Subject',
      '',
      'This is a test email',
    ];
  
    const email = emailLines.join('\r\n').trim();
    const base64Email = Buffer.from(email).toString('base64');
  
    try {
      // Ensure token is not expired
      if (oAuth2Client.isTokenExpiring()) {
        const newToken = await oAuth2Client.refreshToken();
        oAuth2Client.setCredentials(newToken.credentials);
      }
  
      const result = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: base64Email,
        },
      });
  
      console.log(result.data);
      res.status(200).send('Email sent');
    } catch (error) {
      console.error('Error sending email:', error.message);
      res.status(500).send('Error sending email');
    }
  });
app.listen(3000, () => console.log('Server started on port 3000'));