import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { RESERVATION_EMAIL_TO, buildReservationEmailHtml, isValidReservationPayload } from '@/lib/reservation-email';

export async function POST(request: Request) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailAppPassword) {
    console.error('GMAIL_USER or GMAIL_APP_PASSWORD is not set');
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!isValidReservationPayload(body)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  try {
    await transporter.sendMail({
      from: `"L'Olivium Lounge" <${gmailUser}>`,
      to: RESERVATION_EMAIL_TO,
      replyTo: body.phone,
      subject: `Réservation — ${body.name} — ${body.date} ${body.time}`,
      html: buildReservationEmailHtml(body),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Reservation email error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 502 });
  }
}
