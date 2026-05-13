import fs from "fs";
import readline from "readline";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

const TOKEN_PATH = "auth/token.json";

export async function authorize() {
  const credentials = JSON.parse(fs.readFileSync("auth/credentials.json"));

  const { client_secret, client_id, redirect_uris } = credentials.installed;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
  );

  // Check if token exists
  if (fs.existsSync(TOKEN_PATH)) {
    const token = fs.readFileSync(TOKEN_PATH, "utf8");

    if (token) {
      oAuth2Client.setCredentials(JSON.parse(token));

      return oAuth2Client;
    }
  }

  return getNewToken(oAuth2Client);
}

function getNewToken(oAuth2Client) {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });

    console.log("\nAuthorize this app by visiting this URL:\n");

    console.log(authUrl);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("\nEnter the code here: ", (code) => {
      rl.close();

      oAuth2Client.getToken(code, (err, token) => {
        if (err) {
          return reject(err);
        }

        oAuth2Client.setCredentials(token);

        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token, null, 2));

        console.log("\nToken stored successfully.\n");

        resolve(oAuth2Client);
      });
    });
  });
}
