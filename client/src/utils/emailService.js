import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const ENABLE_EMAIL = import.meta.env.VITE_ENABLE_EMAIL === "true";

export const sendEmail = async (toEmail, name, subject, message) => {
  if (!ENABLE_EMAIL) {
    console.log("Email sending is disabled.");
    return;
  }

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_email: toEmail,
      name,
      subject,
      message,
    },
    PUBLIC_KEY,
  );
};
