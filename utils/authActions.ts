import { createClient } from '../utils/supabase/client';


export async function signInWithGoogle() {
    const supabase = createClient();
    const origin = window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider : "google",
      options: {
        redirectTo: `${origin}`,
        scopes: "https://www.googleapis.com/auth/calendar.events"
      },
    })
}

export async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
}