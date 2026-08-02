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
  const name = payload.name || "—";
  const phone = payload.phone || "—";
  const email = payload.email;
  const company = payload.company;
  const message = payload.message;

  const text = `
Website Enquiry details:
------------------------
Name: ${name}
Phone: ${phone}
Email: ${email}
Company: ${company}
Message:
${message}
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Enquiry</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #f7f7f4;
      color: #161616;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f7f7f4;
      padding: 40px 20px;
      box-sizing: border-box;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e5e5e0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    }
    .header {
      background-color: #161616;
      padding: 30px 40px;
      text-align: center;
      border-bottom: 3px solid #8C8476;
    }
    .header h1 {
      color: #ffffff;
      font-size: 20px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin: 0;
    }
    .content {
      padding: 40px;
    }
    .intro {
      font-size: 15px;
      line-height: 1.6;
      color: #605c56;
      margin-top: 0;
      margin-bottom: 30px;
    }
    .table-container {
      margin-bottom: 30px;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    .data-table th, .data-table td {
      padding: 12px 16px;
      text-align: left;
      font-size: 14px;
      line-height: 1.5;
    }
    .data-table th {
      width: 30%;
      background-color: #fbfbf8;
      color: #8C8476;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 1px;
      border-bottom: 1px solid #e5e5e0;
      border-right: 1px solid #e5e5e0;
    }
    .data-table td {
      color: #161616;
      border-bottom: 1px solid #e5e5e0;
    }
    .message-box {
      background-color: #fbfbf8;
      border: 1px dashed #B1ABA8;
      padding: 20px;
      margin-top: 25px;
      border-radius: 2px;
    }
    .message-title {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #8C8476;
      margin-bottom: 10px;
    }
    .message-content {
      font-size: 14px;
      line-height: 1.6;
      color: #161616;
      white-space: pre-wrap;
      margin: 0;
    }
    .footer {
      background-color: #fbfbf8;
      padding: 20px 40px;
      text-align: center;
      border-top: 1px solid #e5e5e0;
      font-size: 12px;
      color: #b1aba8;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>Style Factory</h1>
      </div>
      <div class="content">
        <p class="intro">You have received a new business inquiry from the website contact form. The details are provided below:</p>
        
        <div class="table-container">
          <table class="data-table">
            <tr>
              <th>Name</th>
              <td>${escapeHtml(name)}</td>
            </tr>
            <tr>
              <th>Company</th>
              <td>${escapeHtml(company)}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td><a href="mailto:${escapeHtml(email)}" style="color: #8C8476; text-decoration: none;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>${escapeHtml(phone)}</td>
            </tr>
          </table>
        </div>
        
        <div class="message-box">
          <div class="message-title">Message</div>
          <pre class="message-content">${escapeHtml(message)}</pre>
        </div>
      </div>
      <div class="footer">
        <p>This inquiry was sent automatically from the Style Factory website contact form.</p>
        <p>&copy; ${new Date().getFullYear()} Style Factory. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

  return { text, html };
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
