import { useState } from "react";
import { addSuggestion, getWords } from "@/lib/storage";
import { toast } from "@/components/Toast";
import { Link } from "react-router-dom";

export function Suggest() {
  const [mazlang, setMazlang] = useState("");
  const [meaning, setMeaning] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mazlang.trim() || !meaning.trim()) {
      toast("Both fields are required.", "error");
      return;
    }
    if (mazlang.trim().length < 2) {
      toast("Word too short. At least 2 letters.", "error");
      return;
    }

    // Check duplicates
    const allWords = await getWords();
    const existing = allWords.find(
      (w) => w.mazlang.toLowerCase() === mazlang.trim().toLowerCase()
    );
    if (existing) {
      toast("That slang is already in the bible.", "info");
      return;
    }

    setSending(true);
    await addSuggestion(mazlang, meaning);
    toast("Suggestion submitted! Admin will review it.", "success");
    setMazlang("");
    setMeaning("");
    setSending(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-10">
      <header className="mb-10">
        <div className="text-[10px] tracking-[0.5em] text-fuchsia-400 font-bold mb-3">
          / SUGGEST · DROP LORE
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
          Suggest a <span className="text-fuchsia-400 neon-text">slang</span>
        </h1>
        <p className="text-purple-300/80 mt-3 max-w-2xl">
          Know a slang that deserves a spot in the bible? Drop it below.
          Every submission is reviewed by the admin before it goes live.
        </p>
      </header>

      <div className="card-brutal corner-br rounded-2xl p-6 md:p-10 neon-border-strong relative overflow-hidden">
        <div className="absolute inset-0 stripe opacity-[0.05] pointer-events-none" />

        <div className="relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* MAZLANG */}
            <div>
              <label className="flex items-center gap-2 text-[10px] tracking-[0.4em] font-black text-fuchsia-400 uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-fuchsia-400" />
                MAZLANG
                <span className="text-purple-500">// the word</span>
              </label>
              <input
                value={mazlang}
                onChange={(e) => setMazlang(e.target.value)}
                placeholder="e.g. randell"
                maxLength={40}
                className="input-cyber w-full px-5 py-4 rounded-xl text-2xl md:text-3xl font-black uppercase tracking-tight"
              />
              <div className="mt-1 text-[10px] tracking-widest text-purple-500">
                {mazlang.length}/40
              </div>
            </div>

            {/* MEANING */}
            <div>
              <label className="flex items-center gap-2 text-[10px] tracking-[0.4em] font-black text-cyan-400 uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                MEANING
                <span className="text-purple-500">// the vibe</span>
              </label>
              <textarea
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                placeholder="Explain it like the squad is listening..."
                rows={4}
                maxLength={400}
                className="input-cyber w-full px-5 py-4 rounded-xl text-base md:text-lg resize-none"
              />
              <div className="mt-1 text-[10px] tracking-widest text-purple-500">
                {meaning.length}/400
              </div>
            </div>

            {/* Preview */}
            {(mazlang || meaning) && (
              <div className="rounded-xl border border-purple-500/30 bg-black/40 p-4">
                <div className="text-[10px] tracking-[0.4em] font-bold text-purple-400 mb-2">
                  LIVE PREVIEW
                </div>
                <div className="text-2xl md:text-3xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">
                  {mazlang || "—"}
                </div>
                <div className="text-purple-200/90 mt-2 text-sm md:text-base">
                  {meaning || "—"}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="btn-neon w-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-black font-black uppercase tracking-[0.3em] py-5 rounded-xl text-sm md:text-base shadow-[0_0_30px_rgba(236,72,153,0.5)] disabled:opacity-50"
            >
              {sending ? "TRANSMITTING..." : "✦ Send to admin ✦"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-purple-500/20 text-xs text-purple-300/70 space-y-2">
            <p>
              ✦ <span className="text-fuchsia-400 font-bold">Note:</span>{" "}
              Submissions are reviewed manually. Spam, abuse, or irrelevant
              entries will be denied without mercy.
            </p>
            <p> Keep it clean, keep it real.</p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 grid md:grid-cols-3 gap-3">
        <Tip n="01" title="Keep it clean" body="No hate speech, no abuse." />
        <Tip n="02" title="Explain well" body="A good meaning helps the whole squad." />
        <Tip
          n="03"
          title="Army approved"
          body="If the squad uses it, it belongs here."
        />
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/"
          className="text-[10px] tracking-[0.3em] font-bold text-purple-400 hover:text-white uppercase"
        >
          ← Back to all words
        </Link>
      </div>
    </div>
  );
}

function Tip({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="card-brutal rounded-xl p-4">
      <div className="text-[10px] tracking-[0.3em] font-bold text-fuchsia-400 mb-2">
        {n}
      </div>
      <div className="font-bold text-white mb-1">{title}</div>
      <div className="text-xs text-purple-300/80">{body}</div>
    </div>
  );
}
