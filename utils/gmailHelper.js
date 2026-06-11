import fs from 'fs/promises';

import path from 'path';

import { authenticate } from '@google-cloud/local-auth';

import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

const TOKEN_PATH = path.join('auth', 'token.json');

const CREDENTIALS_PATH = path.join('auth', 'credentials.json');

export async function authorize() {
  return authorizeWithToken();
}

export async function reauthorize() {
  if (process.env.CI) {
    throw new Error('Gmail token is invalid in CI. Update the GOOGLE_TOKEN GitHub secret with a fresh auth/token.json value.');
  }

  await fs.rm(TOKEN_PATH, { force: true });

  return authorizeWithToken();
}

async function authorizeWithToken() {
  const credentials = JSON.parse(await fs.readFile(CREDENTIALS_PATH, 'utf8'));

  const { client_secret, client_id, redirect_uris } = credentials.installed;

  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  try {
    // Existing token
    const token = await fs.readFile(TOKEN_PATH, 'utf8');

    oAuth2Client.setCredentials(JSON.parse(token));

    return oAuth2Client;
  } catch {
    // Automatic Google Login
    const auth = await authenticate({ scopes: SCOPES, keyfilePath: CREDENTIALS_PATH });

    await fs.writeFile(TOKEN_PATH, JSON.stringify(auth.credentials, null, 2));

    oAuth2Client.setCredentials(auth.credentials);

    console.log('\nToken stored successfully.\n');

    return oAuth2Client;
  }
}
