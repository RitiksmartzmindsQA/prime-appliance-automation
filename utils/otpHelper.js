import { google } from 'googleapis';

import { authorize } from './gmailHelper.js';

export async function getLatestOTP() {

    const auth = await authorize();

    const gmail = google.gmail({
        version: 'v1',
        auth
    });

    const response = await gmail.users.messages.list({
        userId: 'me',
        maxResults: 5,
    });

    const messages = response.data.messages;

    if (!messages || messages.length === 0) {

        throw new Error('No messages found');
    }

    for (const message of messages) {

        const msg = await gmail.users.messages.get({
            userId: 'me',
            id: message.id,
        });

        const snippet = msg.data.snippet;

        console.log('EMAIL SNIPPET:', snippet);

        const otpMatch = snippet.match(/\b\d{4,6}\b/);

        if (otpMatch) {

            return otpMatch[0];
        }
    }

    throw new Error('OTP not found');
}