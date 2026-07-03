"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Appointment", href: "#appointment" },
  { label: "Contact", href: "#footer" },
  { label: "Admin", href: "/appointments" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-3 left-0 right-0 z-50 flex justify-center"
    >
      <div className={`w-[94%] max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 border transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-slate/70 border-white/10 shadow-lg shadow-black/40"
            : "backdrop-blur-sm bg-slate/40 border-white/5"
        }`}
      >
        {/* Logo slot — drop your logo file at /public/images/logo.png */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.jpeg"
              alt="Meeya Engineering logo"
              className="w-full h-full object-contain p-1"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div
              className="absolute inset-0 hidden items-center justify-center text-gold font-black text-lg animate-gear"
              style={{ display: "none" }}
            >
              ⚙
            </div>
          </div>
          <div className="leading-tight">
            <p className="font-extrabold text-sm sm:text-base tracking-wide text-white">
              MEEYA <span className="text-gold">ENGINEERING</span>
            </p>
            <p className="text-[10px] sm:text-xs tracking-[0.2em] text-hydra/80 uppercase">
              Heavy Power Masters
            </p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-steel hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:0751665314"
            className="flex items-center gap-2 text-sm font-semibold text-hydra hover:text-white transition-colors"
          >
            <Phone size={16} />
            075 1665 314
          </a>
          <a
            href="/appointments"
            className="rounded-full border border-white/10 bg-slate/80 px-4 py-2 text-sm font-semibold text-white hover:bg-slate/70 transition-colors"
          >
            Admin
          </a>
          <a
            href="#appointment"
            className="rounded-full bg-gold px-5 py-2 text-sm font-bold text-base hover:shadow-gold transition-shadow"
          >
            Book Now
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mt-2 rounded-2xl backdrop-blur-md bg-slate/90 border border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-steel hover:text-gold text-sm font-medium py-1"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#appointment"
                onClick={() => setOpen(false)}
                className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-base text-center mt-1"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
