import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const allowedRequirementTypes = new Set([
  "Valuation assignment",
  "Transaction",
  "Financial reporting",
  "Dispute or litigation",
  "Other requirement",
]);

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot field. Normal visitors never see or fill this.
    const website = cleanText(body?.website, 200);

    if (website) {
      return NextResponse.json({ ok: true });
    }

    const name = cleanText(body?.name, 120);
    const organisation = cleanText(body?.organisation, 180);
    const email = cleanText(body?.email, 254).toLowerCase();
    const phone = cleanText(body?.phone, 60);
    const requirementType = cleanText(body?.requirementType, 80);
    const message = cleanText(body?.message, 5000);

    // -----------------------------
    // Validation
    // -----------------------------

    if (!name || name.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Please enter your name." },
        { status: 400 },
      );
    }

    if (!email || !emailPattern.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (phone && phone.length < 5) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid phone number." },
        { status: 400 },
      );
    }

    if (!allowedRequirementTypes.has(requirementType)) {
      return NextResponse.json(
        { ok: false, error: "Please select an enquiry type." },
        { status: 400 },
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Please provide a little more detail about your requirement.",
        },
        { status: 400 },
      );
    }

    // -----------------------------
    // Environment variables
    // -----------------------------

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error(
        "Contact API: Supabase server environment variables are missing.",
      );

      return NextResponse.json(
        {
          ok: false,
          error: "The contact service is temporarily unavailable.",
        },
        { status: 500 },
      );
    }

    if (!resendApiKey) {
      console.error("Contact API: RESEND_API_KEY is missing.");

      return NextResponse.json(
        {
          ok: false,
          error: "The contact service is temporarily unavailable.",
        },
        { status: 500 },
      );
    }

    // -----------------------------
    // Supabase server client
    // -----------------------------

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    // -----------------------------
    // Save enquiry
    // -----------------------------

    const { data: submission, error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        name,
        organisation: organisation || null,
        email,
        phone: phone || null,
        requirement_type: requirementType,
        message,
        status: "new",
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Contact submission database error:", error);

      return NextResponse.json(
        {
          ok: false,
          error: "We could not submit your enquiry. Please try again.",
        },
        { status: 500 },
      );
    }

    // -----------------------------
    // Send admin notification
    // -----------------------------

    const resend = new Resend(resendApiKey);

    const adminEmail =
      process.env.CONTACT_NOTIFICATION_EMAIL ||
      process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      console.error(
        "Contact API: CONTACT_NOTIFICATION_EMAIL or ADMIN_EMAIL is missing.",
      );

      // The enquiry is already safely stored in Supabase.
      // Do not tell the visitor their submission failed.
      return NextResponse.json({ ok: true });
    }

    const { error: emailError } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "ValInsight Website <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `New Contact Enquiry — ${name}`,
      replyTo: email,

      text: `
New Contact Enquiry

Name: ${name}
Organisation: ${organisation || "Not provided"}
Email: ${email}
Phone: ${phone || "Not provided"}

Requirement Type:
${requirementType}

Message:
${message}

Submission ID:
${submission.id}

Submitted:
${submission.created_at}
      `.trim(),

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #163247;">
          <h2 style="margin-bottom: 20px;">
            New Contact Enquiry
          </h2>

          <table style="border-collapse: collapse; width: 100%; max-width: 700px;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Name</td>
              <td style="padding: 8px 0;">${escapeHtml(name)}</td>
            </tr>

            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Organisation</td>
              <td style="padding: 8px 0;">
                ${escapeHtml(organisation || "Not provided")}
              </td>
            </tr>

            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Email</td>
              <td style="padding: 8px 0;">
                ${escapeHtml(email)}
              </td>
            </tr>

            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Phone</td>
              <td style="padding: 8px 0;">
                ${escapeHtml(phone || "Not provided")}
              </td>
            </tr>

            <tr>
              <td style="padding: 8px 0; font-weight: 600;">
                Requirement
              </td>
              <td style="padding: 8px 0;">
                ${escapeHtml(requirementType)}
              </td>
            </tr>
          </table>

          <div style="
            margin-top: 24px;
            padding: 18px;
            background: #f3f6f8;
            border-left: 4px solid #163247;
          ">
            <strong>Message</strong>

            <p style="white-space: pre-wrap;">
              ${escapeHtml(message)}
            </p>
          </div>

          <p style="
            margin-top: 24px;
            color: #667781;
            font-size: 13px;
          ">
            Submission ID: ${escapeHtml(submission.id)}
          </p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Contact notification email error:", emailError);

      // Important:
      // The enquiry has already been saved successfully.
      // Return success to the visitor rather than making them
      // resubmit and potentially create duplicate enquiries.
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "We could not submit your enquiry. Please try again.",
      },
      { status: 500 },
    );
  }
}

// Escape user-provided values before inserting them into HTML email.
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}