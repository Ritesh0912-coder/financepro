import { SendVerificationRequestParams } from "next-auth/providers/email";
import { createTransport } from "nodemailer";

// Fix for Theme type error if needed, or just bypass it with any for now to get build working
export async function sendVerificationRequest(params: any) {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);

  // NOTE: Ensure your provider.server is correctly typed or cast here
  const transport = createTransport(provider.server);

  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to Global Fin`,
    text: text({ url, host }),
    html: html({ url, host, theme }),
  });

  const failed = result.rejected.filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

function html(params: { url: string; host: string; theme: { brandColor?: string; buttonText?: string } }) {
  const { url, host, theme } = params;

  const brandColor = theme.brandColor || "#ff4d4d"; // Red/Orange brand color
  const color = {
    background: "#0f1218",
    text: "#ffffff",
    mainBackground: "#1a1f2e",
    buttonBackground: "linear-gradient(to right, #ea580c, #dc2626)", // orange-600 to red-600
    buttonBorder: "#dc2626",
    buttonText: "#ffffff",
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.background}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        <strong>Global Fin</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${brandColor}">
              <a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold; background: ${color.buttonBackground};">
                Sign in to Global Fin
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

function text({ url, host }: { url: string; host: string }) {
  return `Sign in to Global Fin\n${url}\n\n`;
}
