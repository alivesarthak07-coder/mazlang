import { Link } from "react-router-dom";

interface EasterEggProps {
  heading: string;
  gifUrl: string;
}

export function EasterEgg({ heading, gifUrl }: EasterEggProps) {
  return (
    <div className="max-w-2xl mx-auto px-5 md:px-10 min-h-[70vh] flex flex-col items-center justify-center text-center">
      {/* Heading */}
      <div className="text-[10px] tracking-[0.5em] text-fuchsia-400 font-bold mb-4">
        ✦ SPECIAL DROP ✦
      </div>
      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 gradient-shift">
        {heading}
      </h1>

      {/* GIF Frame */}
      <div className="w-full max-w-lg mb-10">
        <div className="card-brutal corner-br rounded-2xl p-3 neon-border-strong">
          <div className="rounded-xl overflow-hidden bg-black/60 relative">
            <img
              src={gifUrl}
              alt={heading}
              className="w-full h-full object-cover"
            />
            {/* Scan overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(0deg, rgba(168,85,247,0.08) 0px, rgba(168,85,247,0.08) 1px, transparent 1px, transparent 3px)",
              }}
            />
            <div className="absolute top-3 left-3 text-[10px] tracking-[0.3em] font-bold text-fuchsia-400 bg-black/60 px-2 py-1 rounded">
              ● LIVE / LORE
            </div>
          </div>
        </div>
      </div>

      <Link
        to="/"
        className="btn-neon bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-black font-black uppercase tracking-widest px-8 py-4 rounded-xl text-sm shadow-[0_0_30px_rgba(236,72,153,0.5)]"
      >
        ← Back to dictionary
      </Link>

      <div className="mt-10 text-[10px] tracking-[0.4em] text-purple-600 font-bold ascii">
        // YOU FOUND A SECRET · NO CAP · GG
      </div>
    </div>
  );
}
