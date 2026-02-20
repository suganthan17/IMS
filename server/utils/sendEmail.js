import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to, subject, htmlContent) {
  try {
    const response = await resend.emails.send({
      from: "IMS ADMIN <onboarding@resend.dev>",
      to: to,
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Email failed:", error);
  }
}