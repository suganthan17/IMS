import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendEmail = (toEmail, name, subject, message) => {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_email: toEmail,
      name: name,
      subject: subject,
      message: message,
    },
    PUBLIC_KEY,
  );
};
