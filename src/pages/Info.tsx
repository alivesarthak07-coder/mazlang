import { useEffect, useMemo, useState } from "react";
import { getWords } from "@/lib/storage";
import type { Word } from "@/types";

export function Info() {
  const [words, setWords] = useState<Word[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"new" | "az" | "za">("new");
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

  const list = useMemo(() => {
    let out = [...words];
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter(
        (w) => w.mazlang.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q)
      );
    }
    if (sort === "az") out.sort((a, b) => a.mazlang.localeCompare(b.mazlang));
    else if (sort === "za") out.sort((a, b) => b.mazlang.localeCompare(a.mazlang));
    else out.sort((a, b) => new Date(b.approved_at).getTime() - new Date(a.approved_at).getTime());
    return out;
  }, [words, query, sort]);

  // Letter filter
  const letters = useMemo(() => {
    const set = new Set<string>();
    words.forEach((w) => set.add(w.mazlang[0]?.toUpperCase() || "#"));
    return ["ALL", ...Array.from(set).sort()];
  }, [words]);

  const [letter, setLetter] = useState<string>("ALL");
  const filtered = useMemo(() => {
    if (letter === "ALL") return list;
    return list.filter((w) => w.mazlang[0]?.toUpperCase() === letter);
  }, [list, letter]);

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10">
      <header className="mb-10">
        <div className="text-[10px] tracking-[0.5em] text-fuchsia-400 font-bold mb-3">
          / INFO · LORE ARSenal
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
          All <span className="text-fuchsia-400 neon-text">words</span> in the bible
        </h1>
        <p className="text-purple-300/80 mt-3 max-w-2xl">
          {loading ? "..." : `${words.length} slangs indexed.`} Search, sort, filter — the whole Randell
          army archive at your fingertips.
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatCard label="TOTAL WORDS" value={loading ? "..." : words.length.toString()} color="purple" />
        <StatCard
          label="FILTERED"
          value={loading ? "..." : filtered.length.toString()}
          color="fuchsia"
        />
        <StatCard
          label="UNIQUE LETTERS"
          value={loading ? "..." : (letters.length - 1).toString()}
          color="pink"
        />
        <StatCard
          label="LAST UPDATE"
          value={
            !loading && words[0]
              ? new Date(words[0].approved_at).toLocaleDateString()
              : "—"
          }
          color="cyan"
        />
      </div>

      {/* Controls */}
      <div className="card-brutal rounded-2xl p-4 md:p-6 mb-6 neon-border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 font-mono">
              $
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search any slang..."
              className="input-cyber w-full pl-10 pr-4 py-3 rounded-xl text-base"
            />
          </div>
          <div className="flex gap-2">
            {(["new", "az", "za"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`px-4 py-2 text-[10px] tracking-[0.3em] font-bold uppercase rounded-lg transition-all ${
                  sort === s
                    ? "bg-fuchsia-500 text-black"
                    : "border border-purple-500/30 text-purple-300 hover:border-fuchsia-400"
                }`}
              >
                {s === "new" ? "NEWEST" : s === "az" ? "A→Z" : "Z→A"}
              </button>
            ))}
          </div>
        </div>

        {/* Letter filter */}
        {!loading && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {letters.map((l) => (
              <button
                key={l}
                onClick={() => setLetter(l)}
                className={`w-9 h-9 rounded-md text-xs font-bold transition-all ${
                  letter === l
                    ? "bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                    : "border border-purple-500/30 text-purple-300 hover:border-fuchsia-400"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Word list */}
      {!loading ? (
        <div className="space-y-2">
          {filtered.map((w, i) => (
            <div
              key={w.id}
              className="card-brutal rounded-xl p-4 md:p-5 flex items-start gap-4 group"
            >
              <div className="text-[10px] font-bold text-purple-500 tracking-widest pt-2">
                {String(i + 1).padStart(3, "0")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
                    {w.mazlang}
                  </h3>
                  <span className="text-[9px] tracking-[0.3em] font-bold text-green-400/80">
                    ● APPROVED
                  </span>
                </div>
                <p className="text-purple-200/90 mt-1 text-sm md:text-base leading-snug">
                  {w.meaning}
                </p>
              </div>
              <div className="text-[10px] text-purple-500 tracking-widest font-bold">
                {new Date(w.approved_at).toLocaleDateString()}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-purple-500/60">
              <div className="text-6xl font-black">∅</div>
              <p className="mt-4 text-sm tracking-widest">NOTHING HERE</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 text-purple-400 animate-pulse">
          Loading words from the database...
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: "purple" | "fuchsia" | "pink" | "cyan";
}) {
  const colors = {
    purple: "from-purple-500 to-purple-800 text-purple-300",
    fuchsia: "from-fuchsia-500 to-purple-700 text-fuchsia-300",
    pink: "from-pink-500 to-fuchsia-700 text-pink-300",
    cyan: "from-cyan-400 to-purple-700 text-cyan-300",
  };
  return (
    <div className="card-brutal rounded-xl p-4 relative overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors[color]} opacity-10`}
      />
      <div className="relative">
        <div className="text-[9px] tracking-[0.4em] font-bold text-purple-400 mb-1">
          {label}
        </div>
        <div className={`text-3xl md:text-4xl font-black ${colors[color].split(" ").slice(-1)[0]}`}>
          {value}
        </div>
      </div>
    </div>
  );
}
