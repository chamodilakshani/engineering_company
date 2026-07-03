"use client";

import { motion } from "framer-motion";
import { BadgeCheck, GraduationCap, Wrench } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-slate/40">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        {/* Left: profile portrait placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative rounded-3xl border border-gold/30 bg-base p-2 shadow-gold">
            <div className="absolute -top-3 -left-3 flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block w-[3px] h-10 bg-gold"
                  style={{ transform: "skewX(-20deg)" }}
                />
              ))}
            </div>

            {/* Drop the owner photo at /public/images/owner.jpg */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-slate to-base border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/owner.jpg"
                alt="Mihisara Gamage — Owner & Millwright Technician"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  const fallback = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div
                className="absolute inset-0 hidden flex-col items-center justify-center gap-3 text-steel/50"
                style={{ display: "none" }}
              >
                <Wrench size={48} />
                <span className="text-xs tracking-widest uppercase">
                  Owner Photo
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-base/80 via-transparent to-transparent" />
            </div>
          </div>

          <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-base border border-hydra/30 rounded-2xl px-5 py-4 shadow-hydra">
            <p className="text-2xl font-extrabold text-hydra">CGTTI</p>
            <p className="text-xs text-steel">Dip. in Millwright</p>
          </div>
        </motion.div>

        {/* Right: bio */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-3">
            Meet The Specialist
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Mihisara Gamage
          </h2>
          <p className="mt-1 text-hydra font-semibold">
            Owner &amp; Millwright Technician
          </p>

          <div className="mt-6 space-y-4 text-steel/90 leading-relaxed">
            <p>
              With a Diploma in Millwright from CGTTI and years of hands-on
              experience across hydraulic systems, engines, and heavy
              excavation equipment, Mihisara built Meeya Engineering on a
              simple principle: repair it right the first time.
            </p>
            
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate/60 p-4">
              <GraduationCap className="text-gold shrink-0" size={22} />
              <div>
                <p className="font-semibold text-white text-sm">
                  Dip. in Millwright
                </p>
                <p className="text-xs text-steel">CGTTI Certified</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate/60 p-4">
              <BadgeCheck className="text-hydra shrink-0" size={22} />
              <div>
                <p className="font-semibold text-white text-sm">
                  NAITA Certified in Welding
                </p>
                <p className="text-xs text-steel">Precision-first repairs</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
