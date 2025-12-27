import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "@/lib/db";
import { Contact } from "@/models/Contact";
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const { firstName, lastName, email, subject, message } = body;

        // 1. Save to Database
        const newContact = await Contact.create({
            firstName, lastName, email, subject, message
        });

        // 2. Send Email Notification to Admin
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER_HOST,
            port: Number(process.env.EMAIL_SERVER_PORT),
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
            secure: false, // true for 465, false for other ports
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_FROM, // Send to self/admin
            replyTo: email,
            subject: `[Global Finance IN] New Contact: ${subject}`,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="background: #f9f9f9; padding: 10px; border-left: 3px solid #ccc;">${message}</blockquote>
                <p><small>Saved to database ID: ${newContact._id}</small></p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Message sent successfully" });

    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
    }
}
