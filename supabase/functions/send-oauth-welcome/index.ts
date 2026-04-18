import { Resend } from "npm:resend@4.0.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);
const siteUrl = Deno.env.get("SITE_URL") || "https://lowkaic.xyz";

type Payload = {
  userId: string;
  email: string;
  firstName: string;
  unsubscribeToken: string;
};

function randomPassword() {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(bytes, (b) => (b % 36).toString(36)).join("");
}

function randomHash() {
  return crypto.randomUUID().replace(/-/g, "");
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const payload = (await req.json()) as Payload;
  const generatedPassword = randomPassword();
  const resetHash = randomHash();

  const updateResult = await supabaseAdmin.auth.admin.updateUserById(payload.userId, {
    password: generatedPassword,
    email_confirm: true,
  });

  if (updateResult.error) {
    return new Response(updateResult.error.message, { status: 500 });
  }

  const recoveryLink = await supabaseAdmin.auth.admin.generateLink({
    type: "recovery",
    email: payload.email,
    options: {
      redirectTo: `${siteUrl}/resetpassword/${resetHash}`,
    },
  });

  if (recoveryLink.error || !recoveryLink.data.properties?.action_link) {
    return new Response(recoveryLink.error?.message || "Cannot generate recovery link", { status: 500 });
  }

  const unsubscribeUrl = `${siteUrl}/unsubscribe/email?p=${encodeURIComponent(payload.unsubscribeToken)}`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height:1.5; color:#111827;">
      <h2>Wow, ${payload.firstName}! Your account is ready.</h2>
      <p>You signed in with Google and your account was auto-verified.</p>
      <p>Your current generated password is: <strong>${generatedPassword}</strong></p>
      <p>This reset link expires in 24h (configure expiry in Supabase Auth settings):</p>
      <p><a href="${recoveryLink.data.properties.action_link}">${siteUrl}/resetpassword/${resetHash}</a></p>
      <p style="font-size:12px;color:#6b7280;">
        Unsubscribe: <a href="${unsubscribeUrl}">${unsubscribeUrl}</a>
      </p>
    </div>
  `;

  const emailResult = await resend.emails.send({
    from: "LowkeyAIC <onboarding@resend.dev>",
    to: payload.email,
    subject: "Welcome to LowkeyAIC - account created",
    html,
  });

  return Response.json(emailResult);
});
