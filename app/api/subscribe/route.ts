import { NextResponse } from 'next/server';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export async function POST(request: Request) {
  try {
    const { email, recipientEmail } = await request.json();
    console.log('Received subscription request:', { email, recipientEmail });

    if (!email || !recipientEmail) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Email and recipient email are required' },
        { status: 400 }
      );
    }

    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY || '',
    });

    const sentFrom = new Sender("your-sandbox@sandbox.mailersend.net", "SpinnerTop");
    const recipients = [
      new Recipient(recipientEmail, "SpinnerTop Marketing")
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject("New Newsletter Subscription")
      .setHtml(`
        <h2>New Newsletter Subscription</h2>
        <p>A new user has subscribed to the newsletter:</p>
        <p><strong>Email:</strong> ${email}</p>
      `);

    console.log('Sending email...');
    await mailerSend.email.send(emailParams);
    console.log('Email sent successfully');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription', details: error },
      { status: 500 }
    );
  }
}
