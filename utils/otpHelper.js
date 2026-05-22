import { google } from "googleapis";

import {
  authorize,
  reauthorize,
}
  from "./gmailHelper.js";

function isInvalidGrant(error) {
  return error?.message?.includes(
    "invalid_grant"
  ) || error?.response?.data?.error ===
    "invalid_grant";
}

function createGmailClient(auth) {
  return google.gmail({
    version: "v1",
    auth,
  });
}

export async function waitForOTP(
  timeout = 60000,
  since = Date.now()
) {

  let auth =
    await authorize();

  let gmail =
    createGmailClient(auth);

  const startTime =
    Date.now();

  let tokenWasRefreshed =
    false;

  while (
    Date.now() - startTime <
    timeout
  ) {

    try {

      const response =
        await gmail.users.messages.list({

          userId: "me",

          // Fetch ONLY unread OTP emails
          q: 'is:unread subject:"Your OTP Code"',

          maxResults: 10,

        });

      const messages =
        response.data.messages;

      if (
        messages &&
        messages.length > 0
      ) {
        const otpMessages =
          [];

        for (const message of messages) {

          const msg =
            await gmail.users.messages.get({

              userId: "me",

              id: message.id,

            });

          const snippet =
            msg.data.snippet;

          const receivedAt =
            Number(
              msg.data.internalDate
            );

          if (
            receivedAt &&
            receivedAt < since - 10000
          ) {
            continue;
          }

          otpMessages.push({
            receivedAt,
            snippet,
          });

        }

        otpMessages.sort(
          (first, second) =>
            second.receivedAt -
            first.receivedAt
        );

        for (const {
          snippet,
        } of otpMessages) {

          // Extract OTP
          const otpMatch =
            snippet.match(
              /\b\d{4,6}\b/
            );

          if (otpMatch) {

            return otpMatch[0];

          }

        }

      }

    } catch (error) {

      if (
        isInvalidGrant(error) &&
        !tokenWasRefreshed
      ) {

        console.log(
          "Saved Gmail token is invalid. Creating a new token."
        );

        auth =
          await reauthorize();

        gmail =
          createGmailClient(auth);

        tokenWasRefreshed =
          true;

      } else {

        throw error;

      }

    }

    // Wait 3 seconds
    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          3000
        )
    );

  }

  throw new Error(
    "OTP was not found within timeout."
  );

}
