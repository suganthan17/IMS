import nodemailer from "nodemailer";

export async function sendEmail(email) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const time = new Date();

    await transporter.sendMail({
      from: `"Security Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "New Login Alert",
      html: `
        <h2>New Login Detected</h2>
        <p>We detected a login to your account:</p>
        <ul>
          <li><b>Time:</b> ${time.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour12: true,
          })}</li>
        </ul>
        <p>If this wasn't you, please reset your password immediately.</p>
      `,
    });

    console.log("Login alert email sent");
  } catch (error) {
    console.error("Email sending failed:", error);
  }
}
