const https = require('https');
const { URL } = require('url');

const BREVO_BASE_URL = 'https://api.brevo.com/v3';

function getBrevoApiKey() {
  return process.env.BREVO_API_KEY || process.env.API_KEY || '';
}

function parseMailFrom(raw) {
  const value = String(raw || '').trim();
  if (!value) return { email: '', name: '' };

  const match = value.match(/^(.*)<([^>]+)>$/);
  if (!match) return { email: value, name: '' };

  return {
    name: String(match[1] || '').trim().replace(/^"|"$/g, ''),
    email: String(match[2] || '').trim(),
  };
}

function getSenderEmail() {
  if (process.env.BREVO_SENDER_EMAIL) return process.env.BREVO_SENDER_EMAIL;
  if (process.env.BREVO_SENDER_ID) return process.env.BREVO_SENDER_ID;
  const from = parseMailFrom(process.env.MAIL_FROM);
  return from.email;
}

function getSenderName() {
  if (process.env.BREVO_SENDER_NAME) return process.env.BREVO_SENDER_NAME;
  const from = parseMailFrom(process.env.MAIL_FROM);
  return from.name || 'marsAI';
}

function hasBrevoConfig() {
  return Boolean(
    getBrevoApiKey() &&
      getSenderEmail() &&
      getSenderName(),
  );
}

function parseOptionalNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function brevoRequest(method, path, payload) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${BREVO_BASE_URL}${path}`);
    const body = payload ? JSON.stringify(payload) : null;

    const req = https.request(
      {
        method,
        protocol: url.protocol,
        hostname: url.hostname,
        path: `${url.pathname}${url.search}`,
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': getBrevoApiKey(),
          ...(body ? { 'content-length': Buffer.byteLength(body) } : {}),
        },
        timeout: 15000,
      },
      (res) => {
        let raw = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          raw += chunk;
        });
        res.on('end', () => {
          let data = null;
          try {
            data = raw ? JSON.parse(raw) : null;
          } catch {
            data = raw || null;
          }

          const ok = res.statusCode >= 200 && res.statusCode < 300;
          if (!ok) {
            const err = new Error(
              (data && (data.message || data.code)) || `Brevo error ${res.statusCode}`,
            );
            err.status = res.statusCode;
            err.body = data;
            return reject(err);
          }
          return resolve(data);
        });
      },
    );

    req.on('timeout', () => {
      req.destroy(new Error('Brevo request timeout'));
    });
    req.on('error', reject);

    if (body) req.write(body);
    req.end();
  });
}

async function upsertContact(email) {
  if (!hasBrevoConfig()) return { skipped: true };

  const listId = parseOptionalNumber(process.env.BREVO_LIST_ID);
  const payload = {
    email,
    updateEnabled: true,
    ...(listId ? { listIds: [listId] } : {}),
  };

  return brevoRequest('POST', '/contacts', payload);
}

async function removeContact(email) {
  if (!hasBrevoConfig()) return { skipped: true };
  return brevoRequest('DELETE', `/contacts/${encodeURIComponent(email)}`);
}

async function sendEmail({ to, subject, text }) {
  if (!hasBrevoConfig()) return { skipped: true };

  return brevoRequest('POST', '/smtp/email', {
    sender: {
      email: getSenderEmail(),
      name: getSenderName(),
    },
    to: [{ email: to }],
    subject,
    textContent: text,
  });
}

module.exports = {
  hasBrevoConfig,
  upsertContact,
  removeContact,
  sendEmail,
};

