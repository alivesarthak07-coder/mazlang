import type { Word, Suggestion } from "@/types";
import { supabase } from "@/lib/supabase";

// Admin credentials — change these to whatever you want.
export const ADMIN_KEY = "MAZE-XD-LORE-2026";
export const ADMIN_PASSWORD = "sarthak@exp";

const K_AUTH = "mazlang.admin.auth";

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// --- WORDS ---

export async function getWords(): Promise<Word[]> {
  const { data, error } = await supabase
    .from("words")
    .select("*")
    .order("approved_at", { ascending: false });
  
  if (error) {
    console.error("Error fetching words:", error);
    return [];
  }
  return data as Word[];
}

export async function addWordDirect(mazlang: string, meaning: string): Promise<void> {
  const { error } = await supabase.from("words").insert([
    {
      mazlang: mazlang.trim(),
      meaning: meaning.trim(),
      approved_at: new Date().toISOString(),
    },
  ]);
  if (error) console.error("Error adding word:", error);
}

export async function updateWord(id: string, mazlang: string, meaning: string): Promise<void> {
  const { error } = await supabase
    .from("words")
    .update({ mazlang: mazlang.trim(), meaning: meaning.trim() })
    .eq("id", id);
  
  if (error) console.error("Error updating word:", error);
}

export async function removeWord(id: string): Promise<void> {
  const { error } = await supabase.from("words").delete().eq("id", id);
  if (error) console.error("Error removing word:", error);
}

export async function clearAllWords(): Promise<void> {
  const { error } = await supabase.from("words").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (error) console.error("Error clearing words:", error);
}

// --- SUGGESTIONS ---

export async function getSuggestions(): Promise<Suggestion[]> {
  const { data, error } = await supabase
    .from("suggestions")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
  return data as Suggestion[];
}

export async function addSuggestion(mazlang: string, meaning: string): Promise<void> {
  const { error } = await supabase.from("suggestions").insert([
    {
      mazlang: mazlang.trim(),
      meaning: meaning.trim(),
      created_at: new Date().toISOString(),
    },
  ]);
  if (error) console.error("Error adding suggestion:", error);
}

export async function approveSuggestion(id: string): Promise<void> {
  // 1. Get the suggestion
  const { data: suggestion, error: fetchError } = await supabase
    .from("suggestions")
    .select("*")
    .eq("id", id)
    .single();
  
  if (fetchError || !suggestion) {
    console.error("Suggestion not found:", fetchError);
    return;
  }

  // 2. Add to words
  const { error: insertError } = await supabase.from("words").insert([
    {
      mazlang: suggestion.mazlang,
      meaning: suggestion.meaning,
      approved_at: new Date().toISOString(),
    },
  ]);

  if (insertError) {
    console.error("Error inserting approved word:", insertError);
    return;
  }

  // 3. Delete the suggestion
  const { error: deleteError } = await supabase
    .from("suggestions")
    .delete()
    .eq("id", id);
  
  if (deleteError) console.error("Error deleting suggestion after approval:", deleteError);
}

export async function denySuggestion(id: string): Promise<void> {
  const { error } = await supabase.from("suggestions").delete().eq("id", id);
  if (error) console.error("Error denying suggestion:", error);
}

export async function editSuggestion(id: string, mazlang: string, meaning: string): Promise<void> {
  const { error } = await supabase
    .from("suggestions")
    .update({ mazlang: mazlang.trim(), meaning: meaning.trim() })
    .eq("id", id);
  
  if (error) console.error("Error editing suggestion:", error);
}

// --- AUTH ---

export function isAuthed(): boolean {
  return sessionStorage.getItem(K_AUTH) === "yes";
}
export function setAuthed(v: boolean): void {
  if (v) sessionStorage.setItem(K_AUTH, "yes");
  else sessionStorage.removeItem(K_AUTH);
}
