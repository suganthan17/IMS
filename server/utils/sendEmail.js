import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    console.log("----- EMAIL DEBUG START -----");
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
    console.log("Sending email to:", to);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email credentials missing in environment variables");
      console.log("----- EMAIL DEBUG END -----");
      return;
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("SMTP server is ready to send emails");

    const info = await transporter.sendMail({
      from: `"IMS ADMIN" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", info.response);
    console.log("----- EMAIL DEBUG END -----");

  } catch (error) {
    console.error("Email sending failed:");
    console.error(error);
    console.log("----- EMAIL DEBUG END -----");
  }
};
