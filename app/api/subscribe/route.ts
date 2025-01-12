import { NextResponse } from 'next/server';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

export async function POST(request: Request) {
  try {
    const { email, recipientEmail } = await request.json();

    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY || '',
    });

    const sentFrom = new Sender('noreply@your-domain.com', 'SpinnerTop Newsletter');
    const recipients = [
      new Recipient(recipientEmail, 'SpinnerTop Admin')
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject('New Newsletter Subscription')
      .setHtml(`
        <h2>New Newsletter Subscription</h2>
        <p>A new user has subscribed to the newsletter:</p>
        <p><strong>Email:</strong> ${email}</p>
      `)
      .setText(`New subscription from: ${email}`);

    await mailerSend.email.send(emailParams);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}
