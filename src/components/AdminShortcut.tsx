import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/Toast";

/**
 * Secret ways to open the admin panel:
 *  1) Keyboard shortcut:  Ctrl + Shift + A   (Cmd + Shift + A on Mac)
 *  2) Secret typed code:  type "admin" anywhere on the page
 */
export function AdminShortcut() {
  const navigate = useNavigate();
  const buffer = useRef("");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const SECRET_CODE = "admin";

    const isTyping = (el: EventTarget | null) => {
      const t = el as HTMLElement | null;
      if (!t) return false;
      const tag = t.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || t.isContentEditable;
    };

    const handler = (e: KeyboardEvent) => {
      // --- 1) Ctrl/Cmd + Shift + A ---
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        toast("Admin shortcut activated.", "info");
        navigate("/admin");
        return;
      }

      // --- 2) typed secret code (only when NOT typing in a field) ---
      if (isTyping(e.target)) return;
      if (e.key.length !== 1) return; // ignore Shift, Arrow, etc.

      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-SECRET_CODE.length);

      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        buffer.current = "";
      }, 1500);

      if (buffer.current === SECRET_CODE) {
        buffer.current = "";
        toast("Secret code accepted.", "info");
        navigate("/admin");
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [navigate]);

  return null;
}
