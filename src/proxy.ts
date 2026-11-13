import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

// Her istekte Supabase oturum çerezlerini yeniler
export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    // Statik dosyalar ve görseller hariç tüm yollar
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
