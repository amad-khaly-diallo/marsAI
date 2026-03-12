const { HttpError } = require("../Utils/http");
const { sendMail } = require("./mail.service");
const NewsletterService = require("./NewsletterService");

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function submitContactForm(payload = {}) {
  const name = normalizeText(payload.name);
  const email = normalizeText(payload.email);
  const subject = normalizeText(payload.subject);
  const message = normalizeText(payload.message);
  const newsletter = Boolean(payload.newsletter);

  if (!name || !email || !subject || !message) {
    throw new HttpError(400, "Missing required contact fields");
  }

  if (!isValidEmail(email)) {
    throw new HttpError(400, "Invalid email");
  }

  if (message.length < 20) {
    throw new HttpError(400, "Message is too short");
  }

  const contactRecipient = process.env.CONTACT_EMAIL;
  if (!contactRecipient) {
    throw new HttpError(500, "Contact recipient is not configured");
  }

  const text = [
    "Nouveau message de contact marsAI",
    "",
    `Nom : ${name}`,
    `Email : ${email}`,
    `Sujet : ${subject}`,
    `Newsletter : ${newsletter ? "oui" : "non"}`,
    "",
    "Message :",
    message,
  ].join("\n");

  await sendMail({
    to: contactRecipient,
    subject: `[Contact] ${subject}`,
    text,
  });

  if (newsletter) {
    await NewsletterService.subscribe(email);
  }

  return { success: true };
}

module.exports = {
  submitContactForm,
};
