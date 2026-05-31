export function Developer() {
  return (
    <div className="max-w-4xl mx-auto px-5 md:px-10">
      <header className="mb-10">
        <div className="text-[10px] tracking-[0.5em] text-fuchsia-400 font-bold mb-3">
          / DEVELOPER · THE ARCHITECT
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
          Built by <span className="text-fuchsia-400 neon-text">exp.sarthak</span>
        </h1>
      </header>

      {/* Main card */}
      <div className="card-brutal corner-br rounded-2xl p-6 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 stripe opacity-[0.06] pointer-events-none" />

        <div className="relative flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.5)] pulse-purple">
                <img
                  src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDNqbWN4andrcmZxNDQxdjc0ajJ4eDN0eHNmNnRpaXZndXV4czRzNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/15UbO1LY4O2Fxw8gnI/giphy.gif"
                  alt="Developer GIF"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 px-2 py-1 bg-green-500 text-black text-[9px] font-black tracking-widest rounded-md">
                ONLINE
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="text-[10px] tracking-[0.4em] text-fuchsia-400 font-bold mb-2">
              // IDENTITY
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4">
              Sarthak
            </h2>
            <div className="space-y-3 text-purple-200/90">
              <p className="leading-relaxed">
                The guy who coded this at 3 AM after yet another Randell army stream
                banger. Building tools for the Randell army, one slang at a time.
              </p>
              <p className="leading-relaxed">
                If you've got feedback, feature ideas, or just wanna vibe — the
                DMs are open.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoRow label="ROLE" value="Solo Dev / Designer" />
              <InfoRow label="STACK" value="React · TS · Tailwind" />
              <InfoRow label="LOCATION" value="Earth, Internet" />
              <InfoRow label="STATUS" value="Shipping 🔥" />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-10 pt-8 border-t border-purple-500/20">
          <div className="text-[10px] tracking-[0.4em] text-fuchsia-400 font-bold mb-4">
            // CONNECT
          </div>

          <a
            href="https://instagram.com/exp.sarthak"
            target="_blank"
            rel="noreferrer"
            className="group block relative rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/40 via-fuchsia-900/30 to-pink-900/30 p-6 hover:border-fuchsia-400 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 stripe opacity-[0.08] pointer-events-none" />
            <div className="relative flex items-center gap-4 md:gap-6">
              <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-yellow-400 via-fuchsia-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.6)]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 md:w-11 md:h-11 text-white">
                  <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.2 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.3-.5.2-.9.4-1.2.8-.4.3-.6.7-.8 1.2-.1.4-.3 1-.3 2.1-.1 1.2-.1 1.5-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.3 2.1.2.5.4.9.8 1.2.3.4.7.6 1.2.8.4.1 1 .3 2.1.3 1.2.1 1.5.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.3.5-.2.9-.4 1.2-.8.4-.3.6-.7.8-1.2.1-.4.3-1 .3-2.1.1-1.2.1-1.5.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.3-2.1-.2-.5-.4-.9-.8-1.2-.3-.4-.7-.6-1.2-.8-.4-.1-1-.3-2.1-.3-1.2-.1-1.5-.1-4.7-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2zm5.1-2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] tracking-[0.4em] text-pink-400 font-bold mb-1">
                  INSTAGRAM
                </div>
                <div className="text-2xl md:text-3xl font-black tracking-tight text-white group-hover:text-fuchsia-300 transition-colors">
                  @exp.sarthak
                </div>
                <div className="text-xs text-purple-300/70 mt-1">
                  Drop a DM. Let's build more lore.
                </div>
              </div>
              <div className="shrink-0 text-4xl text-fuchsia-400 group-hover:translate-x-2 transition-transform">
                →
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Credits */}
      <div className="mt-8 card-brutal rounded-2xl p-6 border-purple-500/20">
        <div className="text-[10px] tracking-[0.4em] text-purple-400 font-bold mb-3">
          // CREDITS
        </div>
        <div className="text-purple-200/80 text-sm space-y-2">
          <p>
            ✦ Inspired by <span className="text-fuchsia-400 font-bold">Randell</span> live
            streams & the Randell army lore.
          </p>
          <p>
            ✦ All slang submissions are reviewed manually. Quality over quantity.
          </p>
          <p>
            ✦ This site runs entirely in your browser — data is saved locally.
            Admin approvals persist across sessions.
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-purple-500/20 rounded-lg p-3">
      <div className="text-[9px] tracking-[0.3em] text-purple-400 font-bold mb-1">
        {label}
      </div>
      <div className="text-sm font-bold text-white">{value}</div>
    </div>
  );
}
