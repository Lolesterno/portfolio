import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactPayload {
    name: string;
    email: string;
    message: string;
}

function validate(body: ContactPayload): string | null {
    if (!body.name?.trim()) return 'El nombre es requerido';
    if (!body.email?.trim()) return 'El email es requerido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return 'Email inválido';
    if (!body.message?.trim()) return 'El mensaje es requerido';
    return null;
}

export async function POST(req: NextRequest) {
    const body: ContactPayload = await req.json();

    const error = validate(body)

    if (error) {
        return NextResponse.json({ error }, { status: 400 })
    }

    const { name, email, message } = body;

    const { error: resendError } = await resend.emails.send({
        from: 'info@minikos.online',
        to: process.env.CONTACT_EMAIL!,
        replyTo: email,
        subject: `[Portafolio] nuevo mensaje de ${name}`,
        html: `
        <div style="font-family:monospace;max-width:600px;margin:auto;padding:24px;background:#0a0a0f;color:#f0f0ff;border:1px solid #1a1a3e;border-radius:8px">
            <h2 style="color:#ff6b00;margin-top:0">&gt; NUEVO MENSAJE DE CONTACTO</h2>
            <table style="width:100%;border-collapse:collapse">
            <tr><td style="color:#ebe8e8;padding:8px 0;width:80px">NOMBRE</td><td style="color:#f0f0ff">${name}</td></tr>
            <tr><td style="color:#ebe8e8;padding:8px 0">EMAIL</td><td><a href="mailto:${email}" style="color:#00ff41">${email}</a></td></tr>
            </table>
            <hr style="border-color:#1a1a3e;margin:16px 0"/>
            <p style="color:#ebe8e8;margin:0 0 8px">MENSAJE:</p>
            <p style="background:#0d0d1a;padding:16px;border-left:3px solid #ff6b00;margin:0;white-space:pre-wrap">${message}</p>
        </div>
        `,
    })

    if (resendError) {
        console.error('[Contacto] Resend error:', resendError);
        return NextResponse.json(
            { error: 'No se pudo enviar el mensaje. Intenta de nuevo.' },
            { status: 500 }
        )
    }

    return NextResponse.json({ success: true })
}