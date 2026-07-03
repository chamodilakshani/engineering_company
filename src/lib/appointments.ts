import { promises as fs } from "fs";
import path from "path";
import { getSupabaseAdmin } from "./supabase";

const APPOINTMENTS_FILE = path.join(process.cwd(), "data", "appointments.json");

export type AppointmentRecord = {
  id: string;
  fullName: string;
  phone: string;
  vehicleModel: string;
  service: string;
  date: string;
  createdAt: string;
};

export type AppointmentSource = "supabase" | "local";

async function ensureLocalFile() {
  await fs.mkdir(path.dirname(APPOINTMENTS_FILE), { recursive: true });
  await fs.writeFile(APPOINTMENTS_FILE, "[]", "utf8").catch(() => undefined);
}

export async function getLocalAppointments() {
  try {
    await ensureLocalFile();
    const raw = await fs.readFile(APPOINTMENTS_FILE, "utf8");
    return JSON.parse(raw) as AppointmentRecord[];
  } catch (error) {
    console.error("[APPOINTMENTS] Failed to read local appointments:", error);
    return [];
  }
}

export async function saveLocalAppointment(appointment: AppointmentRecord) {
  try {
    await ensureLocalFile();
    const raw = await fs.readFile(APPOINTMENTS_FILE, "utf8").catch(() => "[]");
    const appointments = JSON.parse(raw) as AppointmentRecord[];
    appointments.push(appointment);
    await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), "utf8");
  } catch (error) {
    console.error("[APPOINTMENTS] Failed to save local appointment:", error);
  }
}

export async function getAppointments(): Promise<{
  appointments: AppointmentRecord[];
  source: AppointmentSource;
}> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from<AppointmentRecord>("appointments")
        .select("id, fullName, phone, vehicleModel, service, date, createdAt")
        .order("createdAt", { ascending: false });
      if (error) {
        console.error("[SUPABASE] Failed to fetch appointments:", error);
        return {
          appointments: await getLocalAppointments(),
          source: "local",
        };
      }
      return {
        appointments: data ?? [],
        source: "supabase",
      };
    } catch (error) {
      console.error("[SUPABASE] Fetch error:", error);
      return {
        appointments: await getLocalAppointments(),
        source: "local",
      };
    }
  }
  return {
    appointments: await getLocalAppointments(),
    source: "local",
  };
}

export async function saveAppointment(appointment: AppointmentRecord) {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      const { error } = await supabase.from("appointments").insert(appointment);
      if (!error) {
        return;
      }
      console.error("[SUPABASE] Failed to save appointment, falling back to local storage:", error);
    } catch (error) {
      console.error("[SUPABASE] Insert error, falling back to local storage:", error);
    }
  }

  await saveLocalAppointment(appointment);
}
