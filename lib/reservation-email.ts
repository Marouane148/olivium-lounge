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

function formatDateFr(isoDate: string): string {
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(
    parsed
  );
}

// Table-based, inline-styled layout on purpose: email clients (Gmail, Outlook)
// strip <style> blocks and don't support flexbox/grid reliably.
export function buildReservationEmailHtml(payload: ReservationPayload): string {
  const rows: [string, string][] = [
    ['Nom', payload.name],
    ['Téléphone', payload.phone],
    ['Personnes', payload.guests],
    ['Date', formatDateFr(payload.date)],
    ['Heure', payload.time],
  ];
  if (payload.message) rows.push(['Message', payload.message]);

  const rowsHtml = rows
    .map(
      ([label, value], i) => `
        <tr>
          <td style="padding:12px 0;border-top:1px solid #EFEFEF;${i === 0 ? 'border-top:none;' : ''}">
            <table role="presentation" width="100%" style="border-collapse:collapse;">
              <tr>
                <td style="width:110px;color:#9A9A9A;font-size:11px;letter-spacing:1px;text-transform:uppercase;vertical-align:top;">${escapeHtml(label)}</td>
                <td style="color:#151310;font-size:15px;font-weight:600;">${escapeHtml(value)}</td>
              </tr>
            </table>
          </td>
        </tr>`
    )
    .join('');

  const telHref = `tel:${payload.phone.replace(/[^+\d]/g, '')}`;

  return `
    <div style="background:#F4F2EE;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;">
      <table role="presentation" width="100%" style="max-width:520px;margin:0 auto;background:#FFFFFF;border-radius:6px;overflow:hidden;border:1px solid #ECE8E1;">
        <tr>
          <td style="background:#0B0B0B;padding:28px 32px;text-align:center;">
            <div style="color:#C8A96B;font-size:22px;font-weight:bold;letter-spacing:3px;">L'OLIVIUM</div>
            <div style="color:#C8A96B;opacity:0.65;font-size:10px;letter-spacing:5px;margin-top:4px;">LOUNGE</div>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px 4px;">
            <p style="margin:0;color:#151310;font-size:19px;font-weight:bold;font-family:Georgia,serif;">Nouvelle demande de réservation</p>
            <p style="margin:6px 0 0;color:#9A9A9A;font-size:13px;font-family:sans-serif;">Reçue via le site — à confirmer avec le client</p>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 32px 4px;font-family:sans-serif;">
            <table role="presentation" width="100%" style="border-collapse:collapse;">${rowsHtml}</table>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px 32px;">
            <a href="${telHref}" style="display:inline-block;background:#C8A96B;color:#0B0B0B;text-decoration:none;font-weight:bold;font-size:13px;letter-spacing:1px;padding:14px 28px;border-radius:4px;font-family:sans-serif;">
              APPELER LE CLIENT
            </a>
          </td>
        </tr>
        <tr>
          <td style="background:#FAFAF8;padding:18px 32px;border-top:1px solid #ECE8E1;font-family:sans-serif;">
            <p style="margin:0;color:#B3ADA2;font-size:11px;">L'Olivium Lounge · 7 Avenue du Belvédère, 93310 Le Pré-Saint-Gervais</p>
          </td>
        </tr>
      </table>
    </div>
  `;
}
