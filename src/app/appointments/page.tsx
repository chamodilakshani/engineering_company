import { getAppointments } from "@/lib/appointments";
import { verifyAdminToken, getAdminCookieToken } from "@/lib/adminAuth";

async function requireAdmin() {
  const token = getAdminCookieToken();
  return verifyAdminToken(token);
}

export default async function AppointmentsPage() {
  const isAdmin = await requireAdmin();

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-base text-white py-20 px-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-slate/70 p-12 text-center">
          <h1 className="text-3xl font-extrabold mb-4">Admin access required</h1>
          <p className="text-steel mb-6">You must sign in to view appointment records.</p>
          <a
            href="/admin"
            className="inline-flex rounded-full bg-gold px-6 py-3 font-bold text-black hover:brightness-110 transition"
          >
            Go to Admin Login
          </a>
        </div>
      </main>
    );
  }

  const { appointments, source } = await getAppointments();

  return (
    <main className="min-h-screen bg-base text-white py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2">
            Appointment Records
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold">View Submitted Appointments</h1>
          <p className="mt-3 text-steel max-w-2xl">
            This page reads appointments from {source === "supabase" ? "Supabase cloud storage" : "local file storage"}.
          </p>
          <div className="mt-4 inline-flex items-center rounded-full bg-slate/80 px-4 py-2 text-sm text-steel">
            <span className="mr-2 h-2 w-2 rounded-full bg-gold" />
            {source === "supabase" ? "Loaded from Supabase" : "Loaded from local fallback storage"}
          </div>
        </div>

        {appointments.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate/70 p-12 text-center text-steel">
            No appointments have been recorded yet.
          </div>
        ) : (
          <div className="space-y-6">
            {appointments
              .slice()
              .reverse()
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className="rounded-3xl border border-white/10 bg-slate/80 p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-gold font-semibold">
                        {appointment.service}
                      </p>
                      <h2 className="text-2xl font-bold text-white">
                        {appointment.fullName}
                      </h2>
                    </div>
                    <p className="text-sm text-steel">{new Date(appointment.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-steel">Phone</p>
                      <p className="text-white font-semibold">{appointment.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-steel">Machine / Vehicle</p>
                      <p className="text-white font-semibold">{appointment.vehicleModel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-steel">Preferred Date</p>
                      <p className="text-white font-semibold">{appointment.date}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </main>
  );
}
