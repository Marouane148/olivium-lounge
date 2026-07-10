import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { RESERVATION_EMAIL_TO, buildReservationEmailHtml, isValidReservationPayload } from '@/lib/reservation-email';

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
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

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "L'Olivium Lounge <onboarding@resend.dev>",
      to: RESERVATION_EMAIL_TO,
      replyTo: body.phone,
      subject: `Réservation — ${body.name} — ${body.date} ${body.time}`,
      html: buildReservationEmailHtml(body),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Reservation email error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
