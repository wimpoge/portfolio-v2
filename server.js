import express from 'express';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const oauth2Client = new OAuth2Client(
  '45034668486-m0ua9ernnm9s3851nbot9e018iep13bh.apps.googleusercontent.com',
  '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',
  'http://localhost:3000/oauth2callback'
);

app.get('/authorize', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/gmail.send',
  });

  res.redirect(url);
});

app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;

  const { tokens } = await oauth2Client.getToken(code);
  console.log('Your access token is:', tokens.access_token);

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
});

const credentials = {
  client_id: '45034668486-m0ua9ernnm9s3851nbot9e018iep13bh.apps.googleusercontent.com',
  client_secret: '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',
  redirect_uris: ['http://localhost:3000/oauth2callback'],
};

const oAuth2Client = new OAuth2Client(
  credentials.client_id,
  credentials.client_secret,
  credentials.redirect_uris[0]
);

oAuth2Client.setCredentials({
  access_token: 'ya29.a0AfB_byC0nkS6N6SnzdeJaCnuAoc6KBN9roQm-Mb27-fzECPjryipp7wPTDFK84vSv7VlA2W-zQ6rpZYf7lw7JgCd7K7QFBUm14Vrm-9fk8eGGyqGC1yaY30QX8B-c8HGNaiGxYUIQu8WwaCP-EvKjlVsYwhK2AyU15PeaCgYKAZ8SARISFQHGX2MiaUPOeJ0MMT5SfI6ok6DCVA0171', // Replace with your actual access token
  refresh_token: '1//04bon_ZdlG05MCgYIARAAGAQSNwF-L9IrQlc-9yTvRvZHDh_88w7vaXpo0BHkInkf7hvxt5kPXtP7nqdEwxip_tFRcP8ihrHvtCg', // Replace with your actual refresh token
});

const gmail = google.gmail({
  version: 'v1',
  auth: oAuth2Client,
});

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  console.log('Received data:', { name, email, message });
  const emailLines = [
    // `From: ${email}`,
    `To: wimpoge@gmail.com`, // Use the recipient's email address
    'Content-type: text/html;charset=iso-8859-1',
    'MIME-Version: 1.0',
    `Subject: Message from ${name}`,
    '',
    `${message}`,
  ];
  

  const emailContent = emailLines.join('\r\n').trim();
  const base64Email = Buffer.from(emailContent).toString('base64');

  try {
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

    console.log('Email sent successfully:', result.data);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
