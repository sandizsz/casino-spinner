import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // Create a transporter using Zoho
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.ZOHO_MAIL,
        pass: process.env.ZOHO_PASSWORD
      }
    });

    // Email options
    const mailOptions = {
      from: process.env.ZOHO_MAIL,
      to: recipientEmail,
      subject: 'New Newsletter Subscription',
      html: `
        <h2>New Newsletter Subscription</h2>
        <p>A new user has subscribed to the newsletter:</p>
        <p><strong>Email:</strong> ${email}</p>
      `
    };

    // Send email
    console.log('Sending email...');
    await transporter.sendMail(mailOptions);
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
