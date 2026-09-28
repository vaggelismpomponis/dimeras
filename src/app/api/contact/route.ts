import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";


const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "dimerasnikos@hotmail.com";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  record.count++;
  if (record.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

function sanitize(str: string): string {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Πολλές αιτήσεις. Παρακαλώ δοκιμάστε ξανά αργότερα." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, phone, email, type, message } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Παρακαλώ εισάγετε ένα έγκυρο ονοματεπώνυμο." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
      return NextResponse.json(
        { error: "Παρακαλώ εισάγετε ένα έγκυρο τηλέφωνο." },
        { status: 400 }
      );
    }

    const validTypes = [
      "Νέα κατασκευή",
      "Ανακαίνιση",
      "Μόνωση ή επισκευή",
      "Δημόσιο / επαγγελματικό έργο",
      "Άλλο",
    ];

    if (!type || !validTypes.includes(type)) {
      return NextResponse.json(
        { error: "Παρακαλώ επιλέξτε είδος έργου." },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const safeName = sanitize(name);
    const safePhone = sanitize(phone);
    const safeEmail = email ? sanitize(email) : "Δεν δηλώθηκε";
    const safeType = sanitize(type);
    const safeMessage = message ? sanitize(message) : "Δεν προστέθηκε περιγραφή";

    // Build professional HTML email
    const htmlBody = `
      <!DOCTYPE html>
      <html lang="el">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body style="margin:0;padding:0;background:#f4f5f3;font-family:'Helvetica Neue',Arial,sans-serif;">
        <div style="max-width:600px;margin:30px auto;background:#fff;border:1px solid #e5e7ea;border-radius:6px;overflow:hidden;">
          <!-- Header -->
          <div style="background:#0b0f14;padding:28px 32px;text-align:center;">
            <div style="color:#fff;margin-top:10px;font-size:15px;font-weight:700;letter-spacing:0.18em;">DN GROUP</div>
            <div style="color:#aeb5bd;font-size:10px;letter-spacing:0.16em;">ΔΗΜΕΡΑΣ Ε.Ε.</div>
          </div>
          
          <!-- Content -->
          <div style="padding:32px;">
            <h2 style="margin:0 0 4px;color:#0b0f14;font-size:20px;">Νέο αίτημα προσφοράς</h2>
            
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr style="border-bottom:1px solid #eee;">
                <td style="padding:14px 0;color:#8f98a2;font-size:11px;letter-spacing:0.1em;font-weight:700;vertical-align:top;width:140px;">ΟΝΟΜΑΤΕΠΩΝΥΜΟ</td>
                <td style="padding:14px 0;color:#0b0f14;font-weight:600;">${safeName}</td>
              </tr>
              <tr style="border-bottom:1px solid #eee;">
                <td style="padding:14px 0;color:#8f98a2;font-size:11px;letter-spacing:0.1em;font-weight:700;vertical-align:top;">ΤΗΛΕΦΩΝΟ</td>
                <td style="padding:14px 0;color:#0b0f14;font-weight:600;">
                  <a href="tel:${safePhone}" style="color:#000;text-decoration:none;font-weight:700;">${safePhone}</a>
                </td>
              </tr>
              <tr style="border-bottom:1px solid #eee;">
                <td style="padding:14px 0;color:#8f98a2;font-size:11px;letter-spacing:0.1em;font-weight:700;vertical-align:top;">EMAIL</td>
                <td style="padding:14px 0;color:#0b0f14;">${safeEmail}</td>
              </tr>
              <tr style="border-bottom:1px solid #eee;">
                <td style="padding:14px 0;color:#8f98a2;font-size:11px;letter-spacing:0.1em;font-weight:700;vertical-align:top;">ΕΙΔΟΣ ΕΡΓΟΥ</td>
                <td style="padding:14px 0;color:#0b0f14;font-weight:600;">${safeType}</td>
              </tr>
              <tr>
                <td style="padding:14px 0;color:#8f98a2;font-size:11px;letter-spacing:0.1em;font-weight:700;vertical-align:top;">ΠΕΡΙΓΡΑΦΗ</td>
                <td style="padding:14px 0;color:#0b0f14;line-height:1.6;">${safeMessage.replace(/\n/g, "<br>")}</td>
              </tr>
            </table>
          </div>
          
          <!-- Footer -->
          <div style="background:#f8f9fa;padding:18px 32px;border-top:1px solid #e5e7ea;">
            <p style="margin:0;color:#8f98a2;font-size:11px;">Αυτό το email στάλθηκε αυτόματα από τη φόρμα επικοινωνίας του dn-group.gr</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key");
    const { error } = await resend.emails.send({
      from: "DN GROUP <onboarding@resend.dev>", // TODO: Use noreply@dngroup.gr after verifying domain on Resend
      to: [CONTACT_EMAIL],
      replyTo: email && email.includes("@") ? email : undefined,
      subject: `Αίτημα προσφοράς: ${safeType} — ${safeName}`,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Σφάλμα αποστολής. Παρακαλώ δοκιμάστε ξανά." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Εσωτερικό σφάλμα. Παρακαλώ δοκιμάστε ξανά." },
      { status: 500 }
    );
  }
}
