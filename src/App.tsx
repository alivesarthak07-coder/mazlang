import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { BackgroundFX } from "@/components/BackgroundFX";
import { ToastHost } from "@/components/Toast";
import { AdminShortcut } from "@/components/AdminShortcut";
import { Home } from "@/pages/Home";
import { Info } from "@/pages/Info";
import { Developer } from "@/pages/Developer";
import { Suggest } from "@/pages/Suggest";
import { Admin } from "@/pages/Admin";
import { NotFound } from "@/pages/NotFound";
import { EasterEgg } from "@/pages/EasterEgg";
import { Maze } from "@/pages/Maze";

export default function App() {
  return (
    <div className="min-h-screen bg-[#05000a] text-[#f5e6ff] relative scanlines noise">
      <BackgroundFX />
      <AdminShortcut />
      <Navbar />
      <main className="relative z-10 pt-24 pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/suggest" element={<Suggest />} />
          <Route path="/developer" element={<Developer />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/devkimaakichut" element={<EasterEgg heading="UNO REVERSE" gifUrl="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWZ1ODlnOTZxY21xeDNxNHZweGZ4NGpyMWVzdjlseGV3ZWVhMTl1ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Fg43ZBsPdNnROf99Ys/giphy.gif" />} />
          <Route path="/harshitkimaa" element={<EasterEgg heading="HARSHIT KI MAA" gifUrl="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHZiOWNrd3JzZ3JzNW8wMTcwcnA1MzRndjBpNGR1YmR0Z3d4cjh4dyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/NYo48xZuEGeaOIqYk4/giphy.gif" />} />
          <Route path="/horan" element={<EasterEgg heading="PAK PAK PAK" gifUrl="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjhhOGVkZGgyaW91d2dnYW8wNTVwZ3YzYWw3bDdlY3Boam1jNjVldSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/eWpec5l3sOD1p9Wmb5/giphy.gif" />} />
          <Route path="/maze" element={<Maze />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="relative z-10 border-t border-purple-500/20 py-8 text-center">
        <div className="text-[10px] tracking-[0.4em] font-bold text-purple-500 uppercase">
          MAZLANG © 2026 · Built for the Randell Army by @exp.sarthak
        </div>
        <div className="text-[9px] tracking-[0.3em] text-purple-700 mt-2 ascii">
          // admin: press Ctrl/⌘ + Shift + A · or type "admin"
        </div>
      </footer>
      <ToastHost />
    </div>
  );
}
