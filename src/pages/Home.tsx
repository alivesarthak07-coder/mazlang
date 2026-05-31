import { useEffect, useMemo, useState } from "react";
import { getWords } from "@/lib/storage";
import { Link } from "react-router-dom";
import type { Word } from "@/types";

export function Home() {
  const [query, setQuery] = useState("");
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getWords();
      setWords(data);
      setLoading(false);
    };
    load();
  }, []);

  // Only filter if there is a query
  const filtered = useMemo(() => {
    if (!query.trim()) return []; // Return empty when no query
    const q = query.trim().toLowerCase();
    const results = words.filter((w) => w.mazlang.toLowerCase().includes(q));
    // Exact matches first, then partial matches
    return results.sort((a, b) => {
      const aExact = a.mazlang.toLowerCase() === q;
      const bExact = b.mazlang.toLowerCase() === q;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return 0;
    });
  }, [query, words]);

  const featured = filtered.length > 0 ? filtered[0] : null;

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10">
      {/* Hero / Header */}
      <header className="relative mb-14 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/50" />
          <span className="text-[10px] tracking-[0.5em] text-purple-400 font-bold">
            RANDELL.ARMY.DICTIONARY.V1
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/50" />
        </div>

        <h1 className="text-[14vw] md:text-[9rem] font-black leading-[0.85] tracking-tighter text-center">
          <span className="glitch neon-text" data-text="MAZLANG">
            MAZLANG
          </span>
        </h1>
        <p className="text-center text-purple-300/80 text-sm md:text-lg mt-4 italic max-w-2xl mx-auto">
          The unofficial Randell army slang bible.
          Decode the lingo — one word at a time.
        </p>

        <div className="flex items-center justify-center gap-3 mt-6 text-[10px] tracking-[0.4em] font-bold">
          <span className="px-3 py-1 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300">
            {loading ? "..." : `${words.length} WORDS`}
          </span>
          <span className="px-3 py-1 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300">
             MAZE XD APPROVED
          </span>
        </div>
      </header>

      {/* Search Terminal */}
      <section className="relative mb-16">
        <div className="card-brutal corner-br rounded-2xl p-6 md:p-8 neon-border-strong">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-[10px] tracking-[0.3em] text-purple-400 font-bold">
                mazlang.terminal — /usr/bin/lookup
              </span>
            </div>
            <span className="hidden md:block text-[10px] tracking-[0.3em] text-purple-400 font-bold">
              [{filtered.length} MATCHES]
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* Input Side */}
            <div className="min-h-[280px] flex flex-col">
              <div className="text-[10px] uppercase tracking-[0.4em] font-black text-fuchsia-400 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
                INPUT — MAZLANG
              </div>
              <div className="flex items-center gap-3 flex-1 border border-purple-500/20 rounded-xl bg-black/40 px-5 py-4">
                <span className="text-purple-500 font-mono text-2xl md:text-3xl select-none">
                  $
                </span>
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="type a slang..."
                  className="flex-1 bg-transparent text-2xl md:text-3xl font-black uppercase tracking-tight outline-none placeholder:text-purple-900/60"
                />
              </div>
            </div>

            {/* Output Side */}
            <div className="min-h-[280px] flex flex-col border-t md:border-t-0 md:border-l border-purple-500/20 md:pl-6">
              <div className="text-[10px] uppercase tracking-[0.4em] font-black text-cyan-400 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                OUTPUT — MEANING
              </div>
              <div className="flex-1 flex items-center justify-center">
                {loading ? (
                  <div className="text-purple-400 text-sm animate-pulse">Syncing with the bible...</div>
                ) : featured ? (
                  <div className="animate-[fadeIn_0.3s_ease-out] w-full">
                    <div className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 gradient-shift">
                      {featured.mazlang}
                    </div>
                    <div className="mt-4 text-lg md:text-xl text-[#f5e6ff]/90 leading-snug">
                      {featured.meaning}
                    </div>
                    <div className="mt-4 text-[10px] tracking-[0.3em] text-green-400 font-bold">
                      ✓ MAZE XD APPROVED · ENTRY #{featured.id.slice(0, 6).toUpperCase()}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    {query ? (
                      <>
                        <div className="text-4xl md:text-5xl font-black text-purple-500/30 mb-2">
                          NOPE.
                        </div>
                        <div className="text-purple-400 text-sm">
                          That slang ain't in the bible yet.
                        </div>
                        <Link
                          to="/suggest"
                          className="inline-block mt-3 text-xs font-bold tracking-widest text-fuchsia-400 hover:text-fuchsia-300 uppercase"
                        >
                          → Suggest it
                        </Link>
                      </>
                    ) : (
                      <div className="text-purple-500/50 text-lg tracking-widest font-bold uppercase">
                        WAITING FOR INPUT...
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Word Grid */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">
            <span className="text-purple-400">/</span> Latest drops
          </h2>
          <Link
            to="/info"
            className="text-[10px] md:text-xs tracking-[0.3em] font-bold text-purple-400 hover:text-white uppercase"
          >
            View all →
          </Link>
        </div>
        
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.slice(0, 12).map((w, i) => (
              <WordCard key={w.id} word={w} index={i} />
            ))}
          </div>
        )}

        {filtered.length === 0 && query && !loading && (
          <div className="text-center py-20 text-purple-500/60">
            <div className="text-6xl font-black">¯\_(ツ)_/¯</div>
            <p className="mt-4 text-sm tracking-widest">NO MATCHES FOUND</p>
          </div>
        )}
        
        {!loading && words.length === 0 && !query && (
           <div className="text-center py-12 text-purple-500/60">
              <div className="text-4xl font-black mb-2">EMPTY DATABASE</div>
              <p className="text-sm tracking-widest">Add words in the admin panel to see them here.</p>
           </div>
        )}
      </section>

      {/* CTA */}
      <section className="mt-20 card-brutal corner-br rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 stripe opacity-[0.07] pointer-events-none" />
        <div className="relative">
          <div className="text-[10px] tracking-[0.5em] text-fuchsia-400 font-bold mb-3">
            ✦ KNOW A SLANG? ✦
          </div>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-3">
            Drop it in the <span className="text-fuchsia-400 neon-text">suggestion box</span>
          </h3>
          <p className="text-purple-300/80 max-w-xl mx-auto mb-6">
            Admin reviews every submission. If it's fire, it goes in the bible.
          </p>
          <Link
            to="/suggest"
            className="btn-neon inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-black font-black uppercase tracking-widest px-8 py-4 rounded-xl text-sm shadow-[0_0_30px_rgba(236,72,153,0.5)]"
          >
            Suggest a slang →
          </Link>
        </div>
      </section>
    </div>
  );
}

function WordCard({ word, index }: { word: Word; index: number }) {
  return (
    <div
      className="card-brutal corner-br rounded-xl p-5 relative group"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="absolute top-2 right-3 text-[9px] tracking-[0.3em] text-purple-500/60 font-bold">
        #{String(index + 1).padStart(3, "0")}
      </div>
      <div className="text-2xl md:text-3xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-fuchsia-300 mb-2">
        {word.mazlang}
      </div>
      <div className="text-sm text-purple-200/80 leading-snug">{word.meaning}</div>
      <div className="mt-3 flex items-center gap-2 text-[9px] tracking-[0.3em] font-bold text-green-400/80">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        MAZE XD APPROVED
      </div>
    </div>
  );
}
