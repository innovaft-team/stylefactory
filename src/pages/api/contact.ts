import type { NextApiRequest, NextApiResponse } from "next";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@stylefactory.hr";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Style Factory <onboarding@resend.dev>";

const LIMITS = {
  name: 120,
  phone: 40,
  email: 160,
  company: 120,
  message: 4000,
} as const;

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
};

function readField(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function validate(body: unknown) {
  const source = (body ?? {}) as Record<string, unknown>;

  const payload: ContactPayload = {
    name: readField(source.name, LIMITS.name),
    phone: readField(source.phone, LIMITS.phone),
    email: readField(source.email, LIMITS.email),
    company: readField(source.company, LIMITS.company),
    message: readField(source.message, LIMITS.message),
  };

  const errors: string[] = [];

  if (!payload.email) errors.push("email is required");
  else if (!isValidEmail(payload.email)) errors.push("email is invalid");
  if (!payload.company) errors.push("company is required");
  if (!payload.message) errors.push("message is required");

  return { payload, errors };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmail(payload: ContactPayload) {
  const rows: Array<[string, string]> = [
    ["Name", payload.name || "—"],
    ["Phone", payload.phone || "—"],
    ["Email", payload.email],
    ["Company", payload.company],
    ["Message", payload.message],
  ];

  return {
    text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: rows
      .map(
        ([label, value]) =>
          `<p><strong>${label}:</strong><br/>${escapeHtml(value).replace(
            /\n/g,
            "<br/>",
          )}</p>`,
      )
      .join(""),
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { payload, errors } = validate(req.body);

  if (errors.length) {
    return res.status(400).json({ error: "Invalid submission", errors });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured; contact form disabled.");
    return res.status(500).json({ error: "Contact form is not configured" });
  }

  const { text, html } = buildEmail(payload);

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: payload.email,
        subject: `Website enquiry — ${payload.company}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend rejected the contact email:", detail);
      return res.status(502).json({ error: "Could not send the message" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact email failed:", error);
    return res.status(502).json({ error: "Could not send the message" });
  }
}
