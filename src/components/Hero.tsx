"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const TITLE_WORDS = ["HEAVY", "POWER", "MASTERS"];

function MagneticButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.25 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-base" />
      <div className="absolute inset-0 bg-grid-fade" />
      <div className="absolute inset-0 bg-stripe-diagonal opacity-60" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-hydra/10 rounded-full blur-3xl" />

      {/* 3-diagonal stripe brand mark, top-left */}
      <div className="absolute top-24 left-4 sm:left-10 flex gap-2 opacity-80">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-[3px] h-16 bg-gold origin-top"
            style={{ transform: `skewX(-20deg) translateY(${i * 6}px)` }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div className="w-full flex items-center justify-center mb-6">
          <div className="w-full max-w-3xl flex items-center justify-between px-4">
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.jpeg"
                alt="Meeya Engineering logo"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-md"
              />

              <div className="text-left">
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                  Meeya <span className="text-gold">Engineering</span>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
              className="flex items-center"
            >
              <p className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-steel/80 text-right">
                Heavy Power Masters
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
          className="font-extrabold leading-[0.95] tracking-tight text-5xl sm:text-7xl md:text-8xl"
        >
          <span className="block text-5xl sm:text-7xl md:text-8xl"> 
            Meeya <span className="text-gold">Engineering</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
          className="mt-6 text-lg sm:text-xl text-steel max-w-2xl mx-auto"
        >
          Premium Heavy Machinery &amp; Hydraulic Repair Services.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            href="#appointment"
            className="animate-pulseGlow inline-flex items-center gap-2 rounded-full bg-gold text-base font-bold px-8 py-3.5 text-base sm:text-lg hover:brightness-110 transition-all"
          >
            Book Appointment
            <ArrowRight size={18} />
          </MagneticButton>

          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-base sm:text-lg font-semibold text-white hover:border-hydra hover:text-hydra transition-colors"
          >
            Explore Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}
