import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export function Navbar() {
  const loc = useLocation();
  const [open, setOpen] = useState(false);

  const nav = [
    { to: "/", label: "DICTIONARY" },
    { to: "/info", label: "ALL WORDS" },
    { to: "/suggest", label: "SUGGEST" },
    { to: "/developer", label: "DEVELOPER" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#05000a]/70 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 flex items-center justify-center font-black text-black text-lg shadow-[0_0_20px_rgba(168,85,247,0.6)]">
            M
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg md:text-xl font-black tracking-tighter text-white">
              MAZLANG
            </span>
            <span className="text-[9px] tracking-[0.3em] text-purple-400 font-bold">
              RANDELL.DICTIONARY
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {nav.map((n) => {
            const active = loc.pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase transition-all ${
                  active
                    ? "text-white bg-purple-500/20 border border-purple-400/50 rounded-md"
                    : "text-purple-300/80 hover:text-white hover:bg-purple-500/10 rounded-md"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </div>

        {/* Status indicator */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-purple-200">
              RANDELL ARMY
            </span>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-purple-300 hover:text-white"
          aria-label="menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6L18 18M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-purple-500/20 bg-[#05000a]/95 backdrop-blur-xl">
          <div className="flex flex-col p-4 gap-1">
            {nav.map((n) => {
              const active = loc.pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 text-sm font-bold tracking-widest uppercase ${
                    active
                      ? "text-white bg-purple-500/20 border-l-4 border-purple-400"
                      : "text-purple-300/80 border-l-4 border-transparent"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Marquee bar */}
      <div className="h-6 overflow-hidden border-t border-purple-500/20 bg-black/50 relative">
        <div className="marquee-track flex items-center h-full whitespace-nowrap text-[10px] tracking-[0.4em] text-purple-400 font-bold">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center shrink-0 pr-8">
              {Array.from({ length: 10 }).map((__, j) => (
                <span key={j} className="px-4 flex items-center gap-4">
                  <span className="text-fuchsia-400">◆</span>
                  MAZLANG.DICTIONARY
                  <span className="text-fuchsia-400">◆</span>
                  DECODE THE LORE
                  <span className="text-fuchsia-400">◆</span>
                  MAZE XD APPROVED
                  <span className="text-fuchsia-400">◆</span>
                  RANDELL ARMY LORE
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
