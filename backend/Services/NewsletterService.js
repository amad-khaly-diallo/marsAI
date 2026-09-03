const { query } = require('../Utils/db');
const { HttpError } = require('../Utils/http');
const { sendMail } = require('./../Services/mail.service');
const brevoService = require('./brevo.service');

function normalizeEmail(email) {
  return String(email || '')
    .trim()
    .toLowerCase();
}

async function listSubscribers() {
  const rows = await query(`SELECT * FROM newsletters ORDER BY id DESC`);
  return rows.map((row) => ({
    id: row.id,
    email: row.email,
  }));
}

async function subscribe(email) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) {
    throw new HttpError(400, 'Missing email');
  }

  try {
    await query(
      'INSERT INTO newsletters (email) VALUES (:email)',
      { email: normalizedEmail }
    );
  } catch (err) {
    // 1062 = duplicate key (email unique) → on ignore simplement
    if (!(err && err.code === 'ER_DUP_ENTRY')) {
      throw err;
    }
  }

  // Sync Brevo en best effort (on ne casse pas l'inscription locale si Brevo est KO)
  try {
    await brevoService.upsertContact(normalizedEmail);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[NewsletterService] Brevo upsert failed:', err.message);
  }

  return { email: normalizedEmail };
}

async function unsubscribe(email) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) {
    throw new HttpError(400, 'Missing email');
  }

  await query('DELETE FROM newsletters WHERE email = :email', {
    email: normalizedEmail,
  });

  // Best effort également
  try {
    await brevoService.removeContact(normalizedEmail);
  } catch (err) {
    // Si le contact n'existe pas déjà chez Brevo, on ignore
    if (!(err && err.status === 404)) {
      // eslint-disable-next-line no-console
      console.error('[NewsletterService] Brevo delete failed:', err.message);
    }
  }

  return { email: normalizedEmail, unsubscribed: true };
}

async function sendNewsletter({ subject, text }) {
  if (!subject || !text) {
    throw new HttpError(400, 'Missing subject or text');
  }

  const subscribers = await listSubscribers();

  if (!subscribers.length) {
    return { sent: 0 };
  }

  // Envoi via Brevo API si configuré, sinon fallback SMTP actuel.
  let sent = 0;
  for (const sub of subscribers) {
    if (brevoService.hasBrevoConfig()) {
      await brevoService.sendEmail({
        to: sub.email,
        subject,
        text,
      });
    } else {
      await sendMail({
        to: sub.email,
        subject,
        text,
      });
    }
    sent += 1;
  }

  return { sent };
}

module.exports = {
  listSubscribers,
  subscribe,
  unsubscribe,
  sendNewsletter,
};


