import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xlofixyukqhyiigipxcd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhsb2ZpeHl1a3FoeWlpZ2lweGNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMDAwMTEsImV4cCI6MjA5NTU3NjAxMX0.gwtDgNEfHrFi-7fnJfQ0ANS2ScxNfdz8QTAYSUYKhhI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
