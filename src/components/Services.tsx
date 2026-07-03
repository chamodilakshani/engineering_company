"use client";

import { motion } from "framer-motion";
import {
  Settings2,
  Cog,
  Truck,
  Car,
  Flame,
  Tractor,
  CircleDot,
  Cable,
  CircuitBoard,
} from "lucide-react";

const SERVICES = [
  { name: "Hydraulic Repairing", icon: Settings2, image: "/images/services/hydraulic.jfif", big: true },
  { name: "Engine Repairing", icon: Cog, image: "/images/services/engine.jfif" },
  { name: "All Excavator Repairing", icon: Truck, image: "/images/services/excavator.jfif" },
  { name: "Light Vehicle Repairing", icon: Car, image: "/images/services/light-vehicle.jfif" },
  { name: "Welding", icon: Flame, image: "/images/services/welding.jfif" },
  { name: "JCB Repairing", icon: Tractor, image: "/images/services/jcb.jfif" },
  { name: "Line Boring", icon: CircleDot, image: "/images/services/line-boring.png" },
  { name: "Fiber Works", icon: Cable, image: "/images/services/fiber-works.jpg" },
  { name: "Lathe Works", icon: CircuitBoard, image: "/images/services/lathe-works.jfif" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32 bg-base">
      <div className="absolute inset-0 bg-stripe-diagonal opacity-30 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-3">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Our Core Services
          </h2>
          <p className="mt-4 text-steel max-w-xl mx-auto">
            Nine specialties, one workshop. From hydraulics to lathe work, Meeya
            Engineering handles the full repair cycle for heavy machinery.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map(({ name, icon: Icon, big }) => (
            <motion.div
              key={name}
              variants={item}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`group relative rounded-2xl border border-white/10 bg-slate p-6 sm:p-7 overflow-hidden ${
                big ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-gold/15 via-transparent to-hydra/10" />
              <div className="relative flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-base/60 border border-white/10 flex items-center justify-center group-hover:border-gold/50 transition-colors">
                  <Icon
                    size={22}
                    className="text-hydra group-hover:text-gold transition-colors group-hover:animate-gear"
                  />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-steel/60">
                  Meeya
                </span>
              </div>
              {/** service image (if provided) */}
              {/** eslint-disable-next-line @next/next/no-img-element */}
              {(
                (SERVICES.find((s) => s.name === name) as any)?.image
              ) && (
                <div className="flex justify-center mt-4">
                  <img
                    src={((SERVICES.find((s) => s.name === name) as any)?.image) as string}
                    alt={name}
                    className="w-32 h-20 object-contain rounded-md"
                  />
                </div>
              )}
              <h3 className="relative mt-6 text-lg font-bold text-white">
                {name}
              </h3>
              <p className="relative mt-2 text-sm text-steel/80">
                Skilled technician support with German-tech precision and
                genuine parts sourcing.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
