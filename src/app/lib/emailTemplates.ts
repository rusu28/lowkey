const SITE_URL = import.meta.env.VITE_SITE_URL || "https://lowkai.xyz";

function buildUnsubscribeUrl(token: string) {
  return `${SITE_URL}/unsubscribe/email?p=${encodeURIComponent(token)}`;
}

export function confirmationEmailTemplate(params: {
  firstName: string;
  confirmUrl: string;
  unsubscribeToken: string;
}) {
  const unsubscribeUrl = buildUnsubscribeUrl(params.unsubscribeToken);

  return {
    subject: "Confirm your LowkeyAIC account",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1f2937;">
        <h2>Welcome to LowkeyAIC, ${params.firstName}!</h2>
        <p>Confirm your email before using the platform.</p>
        <p>
          <a href="${params.confirmUrl}" style="display:inline-block;padding:10px 16px;background:#111827;color:#fff;text-decoration:none;border-radius:8px;">
            Confirm Email
          </a>
        </p>
        <p>If the button does not work, open this link manually:</p>
        <p><a href="${params.confirmUrl}">${params.confirmUrl}</a></p>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="font-size:12px;color:#6b7280;">
          You can unsubscribe from platform emails here:
          <a href="${unsubscribeUrl}">${unsubscribeUrl}</a>
        </p>
      </div>
    `,
  };
}

export function launchAnnouncementTemplate(params: {
  firstName: string;
  unsubscribeToken: string;
}) {
  const unsubscribeUrl = buildUnsubscribeUrl(params.unsubscribeToken);

  return {
    subject: "LowkeyAIC is now live",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1f2937;">
        <h2>Hi ${params.firstName}, LowkeyAIC is live.</h2>
        <p>You can now access competitions, news, and platform features.</p>
        <p><a href="${SITE_URL}">${SITE_URL}</a></p>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="font-size:12px;color:#6b7280;">
          Unsubscribe from emails:
          <a href="${unsubscribeUrl}">${unsubscribeUrl}</a>
        </p>
      </div>
    `,
  };
}
