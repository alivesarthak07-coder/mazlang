import { Link } from "react-router-dom";

const GIFS = [
  "https://media1.tenor.com/m/qwdu1pXDyvQAAAAC/maze-xd-maze.gif",
  "https://media1.tenor.com/m/amTOwjZaMXwAAAAC/maze-maze-xd.gif",
  "https://media1.tenor.com/m/NdUwnEmoBIgAAAAC/maze-xd-maze.gif",
  "https://media1.tenor.com/m/PExQXNUktToAAAAC/maze-maze-xd.gif",
  "https://media1.tenor.com/m/nV050Uwaa54AAAAd/maze-maze-xd.gif",
  "https://media1.tenor.com/m/2-SuiT0WGDoAAAAC/maze-xd-maze.gif",
];

export function Maze() {
  return (
    <div className="max-w-4xl mx-auto px-5 md:px-10 py-12 flex flex-col items-center">
      {/* Header */}
      <div className="text-[10px] tracking-[0.5em] text-fuchsia-400 font-bold mb-3">
        ✦ SECRET UNLOCKED ✦
      </div>
      <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 gradient-shift">
        MAZE
      </h1>
      <p className="text-2xl md:text-3xl font-black uppercase tracking-tight text-center text-fuchsia-300 mb-2">
        INDIA'S FIRST MOANING STREAMER
      </p>
      <p className="text-purple-300/60 tracking-widest text-xs font-bold mb-10">
        // YOU WENT TOO DEEP · NO CAP
      </p>

      {/* 6 GIF Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mb-10">
        {GIFS.map((url, i) => (
          <div key={i} className="card-brutal rounded-xl p-2 neon-border-strong">
            <div className="rounded-lg overflow-hidden bg-black/60 relative aspect-square">
              <img
                src={url}
                alt={`maze gif ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Scan lines */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, rgba(168,85,247,0.07) 0px, rgba(168,85,247,0.07) 1px, transparent 1px, transparent 3px)",
                }}
              />
              <div className="absolute top-2 left-2 text-[9px] tracking-[0.3em] font-bold text-fuchsia-400 bg-black/60 px-1.5 py-0.5 rounded">
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/"
        className="btn-neon bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-black font-black uppercase tracking-widest px-8 py-4 rounded-xl text-sm shadow-[0_0_30px_rgba(236,72,153,0.5)]"
      >
        ← Back to dictionary
      </Link>

      <div className="mt-10 text-[10px] tracking-[0.4em] text-purple-600 font-bold ascii">
        // MAZE UNLOCKED · 6/6 · GG
      </div>
    </div>
  );
}
