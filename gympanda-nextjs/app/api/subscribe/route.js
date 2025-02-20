import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Thank you for subscribing!",
        html: `<p>You've successfully subscribed to our newsletter! Stay tuned.</p>`,
      };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Subscription successful!" }, { status: 200 });
  } catch (error) {
    console.error("❌ Subscription email failed:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
