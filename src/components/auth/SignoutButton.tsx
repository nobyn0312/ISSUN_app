'use client';

import { createClient } from '@/lib/supabase/client';

function SignOutButton() {
  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <>
      <button onClick={handleSignOut}>ログアウト</button>
    </>
  );
}

export default SignOutButton;
