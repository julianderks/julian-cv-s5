import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

// const PUBLIC_SUPABASE_URL = 'https://dcinbykmkwabwzuszdqx.supabase.co';
// const PUBLIC_SUPABASE_ANON_KEY =
// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjaW5ieWtta3dhYnd6dXN6ZHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2MDE5MDEsImV4cCI6MjAzODE3NzkwMX0.QqnY9QdDA7odqkefwzysXF5ehZn6hpTHszFcgZEhV1U';

console.log(PUBLIC_SUPABASE_URL);
export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
