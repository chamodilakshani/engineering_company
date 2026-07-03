import { MapPin, Phone, Mail, Wrench } from "lucide-react";

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

export default function Footer() {
  return (
    <footer id="footer" className="relative bg-slate/60 border-t border-white/10 pt-16 pb-8">
      <div className="absolute inset-0 bg-stripe-diagonal opacity-20 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="text-gold" size={22} />
              <p className="font-extrabold text-white">
                MEEYA <span className="text-gold">ENGINEERING</span>
              </p>
            </div>
            <p className="text-sm text-steel/80 leading-relaxed">
              Heavy Power Masters — premium hydraulic, engine and heavy
              machinery repair, built on precision and trust.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Services
            </p>
            <ul className="space-y-2 text-sm text-steel/80">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              &nbsp;
            </p>
            <ul className="space-y-2 text-sm text-steel/80">
              {SERVICES.slice(5).map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-steel/90">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} className="text-hydra mt-0.5 shrink-0" />
                <span>Meeya Engineering, Matara Rd, Karadana, Bengamuwa.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={18} className="text-hydra shrink-0" />
                <span className="flex flex-col">
                  <a href="tel:0751665314" className="hover:text-gold transition-colors">
                    075 1665 314
                  </a>
                  <a href="tel:0721665388" className="hover:text-gold transition-colors">
                    072 1665 388
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={18} className="text-hydra shrink-0" />
                <a
                  href="mailto:mihisaragamage07@gmail.com"
                  className="hover:text-gold transition-colors break-all"
                >
                  mihisaragamage07@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-steel/60">
            © {new Date().getFullYear()} Meeya Engineering. All rights reserved.
          </p>
          <p className="text-xs text-steel/60">
            Owned &amp; operated by Mihisara Gamage — Millwright Technician
          </p>
        </div>
      </div>
    </footer>
  );
}
