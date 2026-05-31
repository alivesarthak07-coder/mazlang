import { useSyncExternalStore } from "react";

type Toast = { id: string; message: string; type?: "success" | "error" | "info" };
const listeners = new Set<() => void>();
let toasts: Toast[] = [];
function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function getSnapshot() {
  return toasts;
}

export function toast(message: string, type: Toast["type"] = "success") {
  const id = Math.random().toString(36).slice(2);
  toasts = [...toasts, { id, message, type }];
  emit();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, 3200);
}

export function ToastHost() {
  const list = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return (
    <div className="fixed top-24 right-4 z-[100] flex flex-col gap-2 w-[320px] max-w-[90vw]">
      {list.map((t) => (
        <div
          key={t.id}
          className={`toast-in card-brutal corner-br p-4 text-sm ${
            t.type === "error"
              ? "border-red-500/60"
              : t.type === "info"
              ? "border-cyan-400/60"
              : "border-purple-400/60"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">
              {t.type === "error" ? "✗" : t.type === "info" ? "ⓘ" : "✓"}
            </div>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-[3px] text-purple-400 font-bold mb-1">
                {t.type === "error" ? "SYSTEM / ERROR" : t.type === "info" ? "SYSTEM / INFO" : "SYSTEM / OK"}
              </div>
              <div className="text-[#f5e6ff]">{t.message}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
