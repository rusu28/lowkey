// Supabase Edge Function (Deno)
// Deploy with: supabase functions deploy send-email

import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const siteUrl = Deno.env.get("SITE_URL") || "https://lowkai.xyz";

type Payload = {
  to: string;
  template: "confirm_email" | "launch_announcement";
  firstName: string;
  confirmUrl?: string;
  unsubscribeToken: string;
};

function unsubscribeUrl(token: string) {
  return `${siteUrl}/unsubscribe/email?p=${encodeURIComponent(token)}`;
}

function renderTemplate(payload: Payload): { subject: string; html: string } {
  if (payload.template === "launch_announcement") {
    return {
      subject: "LowkeyAIC is now live",
      html: `
        <h2>Hi ${payload.firstName}, LowkeyAIC is live.</h2>
        <p>You can now use all features.</p>
        <p><a href="${siteUrl}">${siteUrl}</a></p>
        <p style="font-size:12px;">
          Unsubscribe: <a href="${unsubscribeUrl(payload.unsubscribeToken)}">${unsubscribeUrl(payload.unsubscribeToken)}</a>
        </p>
      `,
    };
  }

  return {
    subject: "Confirm your LowkeyAIC account",
    html: `
      <h2>Welcome, ${payload.firstName}.</h2>
      <p>Please confirm your email before using the platform.</p>
      <p><a href="${payload.confirmUrl}">Confirm Email</a></p>
      <p style="font-size:12px;">
        Unsubscribe: <a href="${unsubscribeUrl(payload.unsubscribeToken)}">${unsubscribeUrl(payload.unsubscribeToken)}</a>
      </p>
    `,
  };
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const payload = (await req.json()) as Payload;
  const { subject, html } = renderTemplate(payload);

  const response = await resend.emails.send({
    from: "LowkeyAIC <onboarding@resend.dev>",
    to: payload.to,
    subject,
    html,
  });

  return Response.json(response);
});
