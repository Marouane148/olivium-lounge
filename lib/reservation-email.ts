export const RESERVATION_EMAIL_TO = 'badrafria78@gmail.com';

export type ReservationPayload = {
  name: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  message?: string;
};

export function isValidReservationPayload(body: unknown): body is ReservationPayload {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === 'string' &&
    b.name.trim().length > 0 &&
    typeof b.phone === 'string' &&
    b.phone.trim().length > 0 &&
    typeof b.guests === 'string' &&
    b.guests.trim().length > 0 &&
    typeof b.date === 'string' &&
    b.date.trim().length > 0 &&
    typeof b.time === 'string' &&
    b.time.trim().length > 0
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function buildReservationEmailHtml(payload: ReservationPayload): string {
  const rows: [string, string][] = [
    ['Nom', payload.name],
    ['Téléphone', payload.phone],
    ['Personnes', payload.guests],
    ['Date', payload.date],
    ['Heure', payload.time],
  ];
  if (payload.message) rows.push(['Message', payload.message]);

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;color:#888;font-size:13px;">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#111;font-size:14px;font-weight:600;">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  return `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
      <h2 style="color:#C8A96B;">Nouvelle demande de réservation — L'Olivium Lounge</h2>
      <table style="border-collapse:collapse;width:100%;">${rowsHtml}</table>
    </div>
  `;
}
