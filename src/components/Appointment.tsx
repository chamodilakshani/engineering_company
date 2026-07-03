"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Send } from "lucide-react";

const SERVICES = [
  "Hydraulic Repairing",
  "Engine Repairing",
  "All Excavator Repairing",
  "Light Vehicle Repairing",
  "Welding",
  "JCB Repairing",
  "Line Boring",
  "Fiber Works",
  "Lathe Works",
];

type FormState = {
  fullName: string;
  phone: string;
  vehicleModel: string;
  service: string;
  date: string;
};

const initialState: FormState = {
  fullName: "",
  phone: "",
  vehicleModel: "",
  service: "",
  date: "",
};

export default function Appointment() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.fullName.trim()) next.fullName = "Enter your full name";
    if (!/^0\d{9}$/.test(form.phone.trim()))
      next.phone = "Enter a valid 10-digit phone number";
    if (!form.vehicleModel.trim())
      next.vehicleModel = "Tell us the machine or vehicle model";
    if (!form.service) next.service = "Select the service you need";
    if (!form.date) next.date = "Pick a preferred date";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setWhatsappLink(data.whatsappUrl ?? null);
      setStatus("success");
    } catch (err) {
      console.error("Appointment submission failed:", err);
      setStatus("idle");
      setErrors({ fullName: "Something went wrong. Please try again." });
    }
  };

  return (
    <section id="appointment" className="relative py-24 sm:py-32 bg-base">
      <div className="absolute inset-0 bg-stripe-diagonal opacity-20 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-3">
            Book Now
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Schedule Your Service
          </h2>
          <p className="mt-4 text-steel max-w-lg mx-auto">
            Fill out the control panel below. We&apos;ll confirm your slot by
            phone or WhatsApp.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-white/10 bg-slate/70 backdrop-blur-md bg-opacity-70 p-6 sm:p-10 shadow-2xl"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-gold via-hydra to-gold" />

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <CheckCircle2 className="text-hydra mx-auto mb-4" size={52} />
              <h3 className="text-2xl font-bold text-white">
                Booking Request Sent
              </h3>
              <p className="mt-2 text-steel">
                We&apos;ll confirm your appointment shortly. You can also send
                the details directly on WhatsApp:
              </p>
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 rounded-full bg-gold text-base font-bold px-6 py-3 hover:brightness-110 transition-all"
                >
                  <Send size={16} /> Confirm on WhatsApp
                </a>
              )}
              <button
                onClick={() => {
                  setForm(initialState);
                  setStatus("idle");
                }}
                className="block mx-auto mt-6 text-sm text-steel underline hover:text-white"
              >
                Book another appointment
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Kasun Perera"
                  error={errors.fullName}
                />
                <Field
                  label="Active Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="07XXXXXXXX"
                  error={errors.phone}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  label="Machine / Vehicle Model"
                  name="vehicleModel"
                  value={form.vehicleModel}
                  onChange={handleChange}
                  placeholder="e.g. Excavator, JCB, Car"
                  error={errors.vehicleModel}
                />
                <div>
                  <label className="block text-xs font-semibold tracking-wide uppercase text-steel mb-2">
                    Needed Service
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    title="Needed Service"
                    className="w-full rounded-xl bg-base border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.service}
                    </p>
                  )}
                </div>
              </div>

              <Field
                label="Booking Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                error={errors.date}
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gold text-base font-bold py-4 mt-4 hover:brightness-110 disabled:opacity-70 transition-all"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Submitting...
                  </>
                ) : (
                  <>
                    Confirm Appointment
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-wide uppercase text-steel mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl bg-base border border-white/10 px-4 py-3 text-white placeholder:text-steel/40 focus:border-gold outline-none transition-colors"
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
