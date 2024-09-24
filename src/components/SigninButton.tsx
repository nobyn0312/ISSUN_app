"use client";  // クライアントコンポーネントとして明示

import { auth,provider } from '@/firebase';
import { signInWithPopup } from 'firebase/auth';

function SigninButton() {
  

  const signInWithGoogle = () => {
    if (typeof window !== 'undefined') {
      signInWithPopup(auth, provider).catch(error => {
        console.error("Google Sign-in Error:", error);
      });
    }
  };

  return (
    <>
    <button onClick={signInWithGoogle}>Googleでログイン</button>
    </>
  );
}

export default SigninButton;