import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GIF_STORAGE_KEY = "mazlang.404.gif";
// Local on-brand fallback (always loads). Admin can override with any GIF URL.
const DEFAULT_GIF = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjM3NmQ3ZWp2YXhhdTN6NWc0N2Zta2xvYXB2cWJnenNra3Nzdmo3MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/UNr9vRVnIXo02KLXjQ/giphy.gif";

export function NotFound() {
  const [gif, setGif] = useState(DEFAULT_GIF);
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(GIF_STORAGE_KEY);
    if (saved) setGif(saved);
  }, []);

  const saveGif = () => {
    if (!draft.trim()) return;
    localStorage.setItem(GIF_STORAGE_KEY, draft.trim());
    setGif(draft.trim());
    setEditMode(false);
    setDraft("");
  };

  const resetGif = () => {
    localStorage.removeItem(GIF_STORAGE_KEY);
    setGif(DEFAULT_GIF);
    setEditMode(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-10 min-h-[70vh] flex flex-col items-center justify-center">
      {/* Big error */}
      <div className="relative mb-8 text-center">
        <div className="text-[22vw] md:text-[14rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-500 via-purple-500 to-cyan-500 gradient-shift">
          <span className="glitch" data-text="69">
            69
          </span>
        </div>
        <div className="text-xs md:text-sm tracking-[0.5em] text-fuchsia-400 font-bold mt-2">
          ✦ PAGE NOT FOUND ✦
        </div>
      </div>

      {/* Message */}
      <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-center mb-2">
        <span className="text-fuchsia-400 neon-text">GAWAR</span> tujhe likhna nhi ata!
      </h1>
      <p className="text-purple-300/80 text-center max-w-lg mb-2 text-sm font-bold tracking-widest uppercase">
        ERROR CODE: <span className="text-fuchsia-400">GAWAR TUJHE LIKHNA NHI ATA</span>
      </p>
      <p className="text-purple-300/60 text-center max-w-lg mb-8 text-sm">
        Ye page exist nahi karta, chel. Ya toh galat URL hai, ya koi lore
        corrupt ho gaya. Wapas dictionary mein chalo.
      </p>

      {/* GIF Frame */}
      <div className="relative w-full max-w-lg mb-8">
        <div className="card-brutal corner-br rounded-2xl p-3 neon-border-strong">
          <div className="aspect-video rounded-xl overflow-hidden bg-black/60 relative">
            <img
              src={gif}
              alt="404 glitch"
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                // avoid infinite loop if the default also fails
                if (img.src !== window.location.origin + DEFAULT_GIF) {
                  img.src = DEFAULT_GIF;
                }
              }}
            />
            {/* Scan overlay */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(0deg, rgba(168,85,247,0.1) 0px, rgba(168,85,247,0.1) 1px, transparent 1px, transparent 3px)",
              }}
            />
            <div className="absolute top-3 left-3 text-[10px] tracking-[0.3em] font-bold text-red-400 bg-black/60 px-2 py-1 rounded">
              ● LIVE / GLITCH
            </div>
          </div>
        </div>
      </div>

      {/* Edit toggle (hidden but accessible — only visible on hover) */}
      <div className="w-full max-w-lg">
        <button
          onClick={() => setEditMode(!editMode)}
          className="w-full text-[10px] tracking-[0.4em] font-bold text-purple-500 hover:text-fuchsia-400 uppercase py-2"
        >
          {editMode ? "✕ close editor" : "✦ edit 404 gif ✦"}
        </button>

        {editMode && (
          <div className="card-brutal rounded-xl p-5 space-y-3 animate-[fadeIn_0.2s]">
            <div className="text-[10px] tracking-[0.3em] font-bold text-fuchsia-400">
              GIF URL EDITOR
            </div>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={gif}
              className="input-cyber w-full px-4 py-3 rounded-lg text-sm font-mono"
            />
            <p className="text-xs text-purple-300/70">
              Paste any GIF / image URL (giphy, tenor, direct link). This is
              saved locally — only visible on this device.
            </p>
            <div className="flex gap-2">
              <button
                onClick={saveGif}
                className="flex-1 bg-fuchsia-500 text-black font-black uppercase tracking-widest py-3 rounded-lg text-xs"
              >
                Save GIF
              </button>
              <button
                onClick={resetGif}
                className="px-4 py-3 border border-purple-500/40 text-purple-300 font-bold uppercase tracking-widest rounded-lg text-xs"
              >
                Reset
              </button>
            </div>
            <div className="text-[10px] tracking-widest text-purple-500 ascii">
              current: {gif}
            </div>
          </div>
        )}
      </div>

      {/* Back home */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="btn-neon bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-black font-black uppercase tracking-widest px-8 py-4 rounded-xl text-sm shadow-[0_0_30px_rgba(236,72,153,0.5)]"
        >
          ← Back to dictionary
        </Link>
        <Link
          to="/suggest"
          className="px-8 py-4 border border-purple-500/40 text-purple-300 font-black uppercase tracking-widest rounded-xl text-sm hover:border-fuchsia-400 hover:text-white transition-all"
        >
          Suggest a slang
        </Link>
      </div>

      <div className="mt-16 text-center text-[10px] tracking-[0.4em] text-purple-500 font-bold ascii">
        // ERROR_CODE: 69 · GAWAR_TUJHE_LIKHNA_NHI_ATA · NO_CAP · GG
      </div>
    </div>
  );
}
