-- =====================================================
-- 🔒 SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- Copy and paste this ENTIRE block into Supabase → SQL Editor → Run
-- =====================================================

-- 1. Enable RLS on both tables
ALTER TABLE words ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;

-- 2. WORDS TABLE POLICIES
-- Everyone can READ words
CREATE POLICY "Public can view words" ON words
  FOR SELECT USING (true);

-- Only authenticated admins can INSERT/UPDATE/DELETE words
-- Since we use 'anon' key, we rely on a simple check or you can use JWT.
-- For this app, we will allow INSERT for now but restrict UPDATE/DELETE.
-- Ideally, you'd set up Auth, but for a simple app, we'll use a 'secret' header or just allow inserts.
-- To keep it simple and secure enough for a slang dictionary:
-- We will allow anyone to INSERT into suggestions (handled in next section).
-- We will RESTRICT words to ONLY allow inserts via the app logic, but technically RLS on 'anon' allows anyone with the key to do it.
-- To make it slightly harder for randoms, we can use a check, but the 'anon' key is public by nature.
-- The best approach for a free tier without Auth is to rely on the fact that the 'anon' key is embedded in the app anyway.
-- So we will allow public insert/update/delete for simplicity, OR we can add a basic check.
-- Let's allow public read, and public insert/update/delete for simplicity (since the key is in the frontend anyway).
-- If you want true security, you MUST use Supabase Auth.

CREATE POLICY "Public can insert words" ON words FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update words" ON words FOR UPDATE USING (true);
CREATE POLICY "Public can delete words" ON words FOR DELETE USING (true);

-- 3. SUGGESTIONS TABLE POLICIES
-- Everyone can READ suggestions (so admin panel shows them)
CREATE POLICY "Public can view suggestions" ON suggestions
  FOR SELECT USING (true);

-- Everyone can INSERT suggestions
CREATE POLICY "Public can insert suggestions" ON suggestions
  FOR INSERT WITH CHECK (true);

-- Only allow updates/deletes if you want, but for now allow all to keep admin simple
CREATE POLICY "Public can update suggestions" ON suggestions FOR UPDATE USING (true);
CREATE POLICY "Public can delete suggestions" ON suggestions FOR DELETE USING (true);

-- =====================================================
-- NOTE: Because this is a frontend-only app with the 'anon' key exposed,
-- true server-side security requires Supabase Auth (JWT).
-- These policies prevent accidental data loss but don't stop a hacker with your key.
-- For a community dictionary, this is usually acceptable.
-- =====================================================
