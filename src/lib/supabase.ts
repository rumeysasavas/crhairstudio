import { createClient } from './supabase/client'

// Tarayıcı tarafında tek bir Supabase istemcisi kullanılır.
// URL ve anahtar .env.local içinden okunur; oturum çerezlerde tutulur
// ve src/proxy.ts tarafından her istekte yenilenir.
export const supabase = createClient()
