'use client';

import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

function SigninButton() {
  const signInWithGoogle = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Google ログインに失敗しました';
      alert(message);
      console.error('Google ログインエラー:', error);
    }
  };

  return (
    <>
      <button
        onClick={signInWithGoogle}
        style={{
          color: 'var(--primary-orange)',
          borderBottom: '2px solid var(--primary-orange)'
        }}
      >
        <span className='flex'>
          <Image
            style={{ marginRight: '8px' }}
            src='/images/google_icon.svg'
            width={20}
            height={20}
            alt='googleアイコン'
          />
          Googleログイン / 新規登録
        </span>
      </button>
    </>
  );
}

export default SigninButton;
