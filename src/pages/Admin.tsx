import { useEffect, useState } from "react";
import {
  ADMIN_KEY,
  ADMIN_PASSWORD,
  addWordDirect,
  approveSuggestion,
  clearAllWords,
  denySuggestion,
  editSuggestion,
  getSuggestions,
  getWords,
  isAuthed,
  removeWord,
  setAuthed,
  updateWord,
} from "@/lib/storage";
import { toast } from "@/components/Toast";
import type { Suggestion, Word } from "@/types";

type Stage = "key" | "password" | "panel";

export function Admin() {
  const [stage, setStage] = useState<Stage>("key");
  const [keyInput, setKeyInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [tab, setTab] = useState<"pending" | "words">("pending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthed()) {
      setStage("panel");
      refresh();
    }
  }, []);

  const refresh = async () => {
    setLoading(true);
    const [suggs, wrds] = await Promise.all([getSuggestions(), getWords()]);
    setSuggestions(suggs);
    setWords(wrds);
    setLoading(false);
  };

  const handleKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyInput.trim().toUpperCase() === ADMIN_KEY) {
      setStage("password");
      toast("Key accepted. Enter password.", "info");
    } else {
      toast("Invalid key. Nice try, chel.", "error");
    }
  };

  const handlePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwInput === ADMIN_PASSWORD) {
      setAuthed(true);
      setStage("panel");
      refresh();
      toast("Welcome back, admin.", "success");
    } else {
      toast("Wrong password.", "error");
    }
  };

  const handleApprove = async (id: string) => {
    await approveSuggestion(id);
    refresh();
    toast("Approved & added to bible.", "success");
  };

  const handleDeny = async (id: string) => {
    await denySuggestion(id);
    refresh();
    toast("Denied. Deleted forever.", "info");
  };

  const handleEdit = async (id: string, mazlang: string, meaning: string) => {
    await editSuggestion(id, mazlang, meaning);
    refresh();
    toast("Edits saved. Approve when ready.", "success");
  };

  const handleRemoveWord = async (id: string) => {
    if (!confirm("Remove this word from the bible?")) return;
    await removeWord(id);
    refresh();
    toast("Word removed.", "info");
  };

  const handleAddWord = async (mazlang: string, meaning: string) => {
    if (!mazlang.trim() || !meaning.trim()) {
      toast("Both fields required.", "error");
      return false;
    }
    const allWords = await getWords();
    const dup = allWords.find(
      (w) => w.mazlang.toLowerCase() === mazlang.trim().toLowerCase()
    );
    if (dup) {
      toast("That word already exists.", "error");
      return false;
    }
    await addWordDirect(mazlang, meaning);
    refresh();
    toast("Word added to the bible.", "success");
    return true;
  };

  const handleUpdateWord = async (id: string, mazlang: string, meaning: string) => {
    if (!mazlang.trim() || !meaning.trim()) {
      toast("Both fields required.", "error");
      return;
    }
    await updateWord(id, mazlang, meaning);
    refresh();
    toast("Word updated.", "success");
  };

  const handleClearAll = async () => {
    const currentWords = await getWords();
    if (currentWords.length === 0) {
      toast("Dictionary is already empty.", "info");
      return;
    }
    if (!confirm("⚠ Delete ALL words permanently? This cannot be undone.")) return;
    if (!confirm("Are you 100% sure? Type-check: this wipes everything.")) return;
    await clearAllWords();
    refresh();
    toast("All words cleared.", "info");
  };

  const handleLogout = () => {
    setAuthed(false);
    setStage("key");
    setKeyInput("");
    setPwInput("");
    toast("Logged out.", "info");
  };

  if (stage === "key") {
    return (
      <div className="max-w-xl mx-auto px-5 md:px-10">
        <div className="card-brutal corner-br rounded-2xl p-8 md:p-10 neon-border-strong relative overflow-hidden">
          <div className="absolute inset-0 danger-stripe opacity-[0.05] pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] tracking-[0.4em] font-black text-red-400">
                RESTRICTED AREA
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2">
              Admin <span className="text-fuchsia-400">Access</span>
            </h1>
            <p className="text-purple-300/70 text-sm mb-8">
              Step 1 of 2. Enter the hidden key to continue.
            </p>
            <form onSubmit={handleKey} className="space-y-4">
              <div>
                <label className="text-[10px] tracking-[0.4em] font-bold text-fuchsia-400 mb-2 block">
                  ADMIN KEY
                </label>
                <input
                  autoFocus
                  type="text"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="XXXXXXXXXXXXXXXX"
                  className="input-cyber w-full px-5 py-4 rounded-xl font-mono text-lg tracking-widest"
                />
              </div>
              <button
                type="submit"
                className="btn-neon w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-black font-black uppercase tracking-[0.3em] py-4 rounded-xl text-sm"
              >
                Unlock →
              </button>
            </form>
            <p className="mt-6 text-[10px] tracking-widest text-purple-500 ascii">
              // hint: look at the page source. or ask the dev @exp.sarthak
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "password") {
    return (
      <div className="max-w-xl mx-auto px-5 md:px-10">
        <div className="card-brutal corner-br rounded-2xl p-8 md:p-10 neon-border-strong relative overflow-hidden">
          <div className="relative">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-[10px] tracking-[0.4em] font-black text-green-400">
                KEY ACCEPTED
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2">
              Enter <span className="text-fuchsia-400">Password</span>
            </h1>
            <p className="text-purple-300/70 text-sm mb-8">
              Step 2 of 2. Final gate.
            </p>
            <form onSubmit={handlePassword} className="space-y-4">
              <div>
                <label className="text-[10px] tracking-[0.4em] font-bold text-cyan-400 mb-2 block">
                  PASSWORD
                </label>
                <input
                  autoFocus
                  type="password"
                  value={pwInput}
                  onChange={(e) => setPwInput(e.target.value)}
                  placeholder="••••••••"
                  className="input-cyber w-full px-5 py-4 rounded-xl text-lg"
                />
              </div>
              <button
                type="submit"
                className="btn-neon w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-black font-black uppercase tracking-[0.3em] py-4 rounded-xl text-sm"
              >
                Enter Panel →
              </button>
              <button
                type="button"
                onClick={() => setStage("key")}
                className="w-full text-xs tracking-widest text-purple-400 hover:text-white"
              >
                ← Back to key
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // PANEL
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-10">
      <header className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="text-[10px] tracking-[0.5em] text-fuchsia-400 font-bold mb-3">
            / ADMIN · MAZE XD · RANDELL ARMY HQ
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Randell <span className="text-fuchsia-400 neon-text">HQ</span>
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-[10px] tracking-[0.3em] font-bold uppercase border border-red-500/40 text-red-400 hover:bg-red-500/10 rounded-lg"
        >
          ⎋ Logout
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <MiniStat label="PENDING" value={loading ? "..." : suggestions.length} color="fuchsia" />
        <MiniStat label="APPROVED" value={loading ? "..." : words.length} color="green" />
        <MiniStat label="KEY" value="✓ VERIFIED" color="cyan" />
        <MiniStat label="SESSION" value="ACTIVE" color="purple" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("pending")}
          className={`px-5 py-3 text-xs font-bold tracking-widest uppercase rounded-lg transition-all ${
            tab === "pending"
              ? "bg-fuchsia-500 text-black"
              : "border border-purple-500/30 text-purple-300"
          }`}
        >
          Queue ({loading ? "..." : suggestions.length})
        </button>
        <button
          onClick={() => setTab("words")}
          className={`px-5 py-3 text-xs font-bold tracking-widest uppercase rounded-lg transition-all ${
            tab === "words"
              ? "bg-fuchsia-500 text-black"
              : "border border-purple-500/30 text-purple-300"
          }`}
        >
          All Words ({loading ? "..." : words.length})
        </button>
      </div>

      {/* Pending */}
      {tab === "pending" && (
        <div className="space-y-3">
          {suggestions.length === 0 && (
            <div className="card-brutal rounded-2xl p-12 text-center">
              <div className="text-6xl mb-3">☕</div>
              <div className="font-bold text-white mb-1">Queue is empty.</div>
              <p className="text-purple-300/70 text-sm">
                Add words directly using the All Words tab.
              </p>
            </div>
          )}
          {suggestions.map((s) => (
            <SuggestionRow
              key={s.id}
              s={s}
              onApprove={() => handleApprove(s.id)}
              onDeny={() => handleDeny(s.id)}
              onEdit={(m, v) => handleEdit(s.id, m, v)}
            />
          ))}
        </div>
      )}

      {/* Words */}
      {tab === "words" && (
        <div className="space-y-4">
          {/* Add new word directly */}
          <AddWordForm onAdd={handleAddWord} />

          {/* Toolbar */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="text-[10px] tracking-[0.4em] font-bold text-purple-400 uppercase">
              {loading ? "Loading..." : `${words.length} word${words.length === 1 ? "" : "s"} in the bible`}
            </div>
            {!loading && words.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-4 py-2 text-[10px] tracking-widest font-bold uppercase border border-red-500/40 text-red-400 hover:bg-red-500/20 rounded-lg"
              >
                ⚠ Clear all words
              </button>
            )}
          </div>

          {/* List */}
          <div className="space-y-2">
            {!loading && words.length === 0 && (
              <div className="card-brutal rounded-2xl p-12 text-center">
                <div className="text-6xl mb-3">📭</div>
                <div className="font-bold text-white mb-1">
                  The bible is empty.
                </div>
                <p className="text-purple-300/70 text-sm">
                  Add your first word using the form above.
                </p>
              </div>
            )}
            {!loading && words.map((w) => (
              <WordRow
                key={w.id}
                w={w}
                onRemove={() => handleRemoveWord(w.id)}
                onUpdate={(m, v) => handleUpdateWord(w.id, m, v)}
              />
            ))}
            {loading && (
               <div className="text-center py-12 text-purple-400 animate-pulse">
                 Syncing with the database...
               </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MiniStat({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: "fuchsia" | "green" | "cyan" | "purple";
}) {
  const colors = {
    fuchsia: "text-fuchsia-400 border-fuchsia-500/40",
    green: "text-green-400 border-green-500/40",
    cyan: "text-cyan-400 border-cyan-500/40",
    purple: "text-purple-400 border-purple-500/40",
  };
  return (
    <div className={`card-brutal rounded-xl p-4 border ${colors[color]}`}>
      <div className="text-[9px] tracking-[0.4em] font-bold text-purple-400 mb-1">
        {label}
      </div>
      <div className={`text-2xl md:text-3xl font-black ${colors[color].split(" ")[0]}`}>
        {value}
      </div>
    </div>
  );
}

function SuggestionRow({
  s,
  onApprove,
  onDeny,
  onEdit,
}: {
  s: Suggestion;
  onApprove: () => void;
  onDeny: () => void;
  onEdit: (m: string, v: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [m, setM] = useState(s.mazlang);
  const [v, setV] = useState(s.meaning);

  return (
    <div className="card-brutal rounded-xl p-5 relative">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="text-[10px] tracking-[0.3em] text-purple-500 font-bold">
          #{s.id.slice(0, 6).toUpperCase()} ·{" "}
          {new Date(s.created_at).toLocaleString()}
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="text-[10px] tracking-widest font-bold uppercase text-cyan-400 hover:text-white"
        >
          {editing ? "cancel" : "edit"}
        </button>
      </div>

      {editing ? (
        <div className="space-y-3">
          <input
            value={m}
            onChange={(e) => setM(e.target.value)}
            className="input-cyber w-full px-4 py-3 rounded-lg text-xl font-black uppercase"
            placeholder="mazlang"
          />
          <textarea
            value={v}
            onChange={(e) => setV(e.target.value)}
            rows={3}
            className="input-cyber w-full px-4 py-3 rounded-lg text-base resize-none"
            placeholder="meaning"
          />
          <button
            onClick={() => {
              onEdit(m, v);
              setEditing(false);
            }}
            className="px-4 py-2 text-[10px] tracking-widest font-bold uppercase bg-cyan-500 text-black rounded-lg"
          >
            Save edits
          </button>
        </div>
      ) : (
        <>
          <div className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-1">
            {s.mazlang}
          </div>
          <div className="text-purple-200/90 text-sm md:text-base mb-4">
            {s.meaning}
          </div>
        </>
      )}

      <div className="flex gap-2 pt-3 border-t border-purple-500/20">
        <button
          onClick={onApprove}
          className="btn-neon flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-black uppercase tracking-widest py-3 rounded-lg text-xs shadow-[0_0_20px_rgba(34,197,94,0.4)]"
        >
          ✓ Approve
        </button>
        <button
          onClick={onDeny}
          className="flex-1 border border-red-500/40 text-red-400 font-black uppercase tracking-widest py-3 rounded-lg text-xs hover:bg-red-500/10"
        >
          ✕ Deny
        </button>
      </div>
    </div>
  );
}

function AddWordForm({
  onAdd,
}: {
  onAdd: (m: string, v: string) => Promise<boolean>;
}) {
  const [m, setM] = useState("");
  const [v, setV] = useState("");

  return (
    <div className="card-brutal corner-br rounded-2xl p-5 md:p-6 neon-border">
      <div className="text-[10px] tracking-[0.4em] font-bold text-fuchsia-400 uppercase mb-4">
        + Add a word directly
      </div>
      <div className="grid md:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-[9px] tracking-[0.3em] font-bold text-fuchsia-400 uppercase mb-1 block">
            MAZLANG
          </label>
          <input
            value={m}
            onChange={(e) => setM(e.target.value)}
            placeholder="the word"
            className="input-cyber w-full px-4 py-3 rounded-lg text-lg font-black uppercase"
          />
        </div>
        <div>
          <label className="text-[9px] tracking-[0.3em] font-bold text-cyan-400 uppercase mb-1 block">
            MEANING
          </label>
          <input
            value={v}
            onChange={(e) => setV(e.target.value)}
            placeholder="the meaning"
            className="input-cyber w-full px-4 py-3 rounded-lg text-base"
          />
        </div>
      </div>
      <button
        onClick={async () => {
          if (await onAdd(m, v)) {
            setM("");
            setV("");
          }
        }}
        className="btn-neon w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-black font-black uppercase tracking-[0.3em] py-3 rounded-lg text-xs"
      >
        ✦ Add to bible 
      </button>
    </div>
  );
}

function WordRow({
  w,
  onRemove,
  onUpdate,
}: {
  w: Word;
  onRemove: () => void;
  onUpdate: (m: string, v: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [m, setM] = useState(w.mazlang);
  const [v, setV] = useState(w.meaning);

  return (
    <div className="card-brutal rounded-xl p-4">
      {editing ? (
        <div className="space-y-3">
          <input
            value={m}
            onChange={(e) => setM(e.target.value)}
            className="input-cyber w-full px-4 py-3 rounded-lg text-xl font-black uppercase"
            placeholder="mazlang"
          />
          <textarea
            value={v}
            onChange={(e) => setV(e.target.value)}
            rows={2}
            className="input-cyber w-full px-4 py-3 rounded-lg text-base resize-none"
            placeholder="meaning"
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                onUpdate(m, v);
                setEditing(false);
              }}
              className="px-4 py-2 text-[10px] tracking-widest font-bold uppercase bg-cyan-500 text-black rounded-lg"
            >
              Save
            </button>
            <button
              onClick={() => {
                setM(w.mazlang);
                setV(w.meaning);
                setEditing(false);
              }}
              className="px-4 py-2 text-[10px] tracking-widest font-bold uppercase border border-purple-500/40 text-purple-300 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
              {w.mazlang}
            </div>
            <div className="text-purple-200/90 text-sm md:text-base mt-1">
              {w.meaning}
            </div>
          </div>
          <div className="shrink-0 flex flex-col gap-2">
            <button
              onClick={() => setEditing(true)}
              className="px-3 py-2 text-[10px] tracking-widest font-bold uppercase border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 rounded-lg"
            >
              ✎ Edit
            </button>
            <button
              onClick={onRemove}
              className="px-3 py-2 text-[10px] tracking-widest font-bold uppercase border border-red-500/40 text-red-400 hover:bg-red-500/10 rounded-lg"
            >
              ✕ Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
