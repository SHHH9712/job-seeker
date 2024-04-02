import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { google } from "googleapis";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const secret = process.env.SECRET;
  const token = await getToken({ req, secret });
  if (!token) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const access_token = token?.access_token;
  console.log("Access Token:", access_token);

  const gmail = google.gmail({
    version: "v1",
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const N = 10; // Number of recent emails to fetch

  try {
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: N,
    });

    const messages = response.data.messages;

    if (messages && messages.length > 0) {
      for (const message of messages) {
        const messageResponse = await gmail.users.messages.get({
          userId: "me",
          id: message.id!,
        });

        const messageData = messageResponse.data;
        console.log("Message Data:");
        console.log(messageData);
        console.log("--------------------");
      }
    } else {
      console.log("No messages found.");
    }

    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch emails" }),
      { status: 500 }
    );
  }
}
