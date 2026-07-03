import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveAppointment, AppointmentRecord } from "@/lib/appointments";

const COMPANY_WHATSAPP_NUMBER = "94751665314"; // 075 1665 314 in international format
const COMPANY_EMAIL = "mihisaragamage07@gmail.com";
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM ?? `Meeya Engineering <${COMPANY_EMAIL}>`;

type AppointmentPayload = {
  fullName: string;
  phone: string;
  vehicleModel: string;
  service: string;
  date: string;
};

function isValidPayload(body: any): body is AppointmentPayload {
  return (
    typeof body === "object" &&
    body !== null &&
    typeof body.fullName === "string" &&
    body.fullName.trim().length > 0 &&
    typeof body.phone === "string" &&
    /^0\d{9}$/.test(body.phone.trim()) &&
    typeof body.vehicleModel === "string" &&
    body.vehicleModel.trim().length > 0 &&
    typeof body.service === "string" &&
    body.service.trim().length > 0 &&
    typeof body.date === "string" &&
    body.date.trim().length > 0
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Missing or invalid appointment fields." },
      { status: 422 }
    );
  }

  const { fullName, phone, vehicleModel, service, date } = body;

  // Build the message that will be sent to the workshop
  const message = [
    "New Appointment Request — Meeya Engineering",
    `Name: ${fullName}`,
    `Phone: ${phone}`,
    `Machine/Vehicle: ${vehicleModel}`,
    `Service: ${service}`,
    `Preferred Date: ${date}`,
  ].join("\n");

  const appointmentRecord: AppointmentRecord = {
    id: `${Date.now()}`,
    fullName,
    phone,
    vehicleModel,
    service,
    date,
    createdAt: new Date().toISOString(),
  };

  await saveAppointment(appointmentRecord);

  let emailPayload = null;
  let emailError: string | null = null;

  if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: EMAIL_FROM,
        to: COMPANY_EMAIL,
        subject: `New Appointment — ${fullName} (${service})`,
        text: message,
      });
      emailPayload = {
        to: COMPANY_EMAIL,
        subject: `New Appointment — ${fullName} (${service})`,
        text: message,
      };
    } catch (error) {
      console.error("[EMAIL ERROR] Failed to send appointment email:", error);
      emailError = "Appointment saved but email could not be sent.";
    }
  } else {
    emailError = "SMTP not configured, appointment saved locally or in Supabase.";
  }

  // --- WhatsApp deep link ---------------------------------------------------
  // wa.me links open a pre-filled chat with the workshop's WhatsApp number.
  const whatsappUrl = `https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;

  return NextResponse.json(
    {
      ok: true,
      message: "Appointment request received.",
      whatsappUrl,
      emailPayload,
      emailError,
    },
    { status: 200 }
  );
}
