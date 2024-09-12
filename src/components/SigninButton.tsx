"use client";  // クライアントコンポーネントとして明示


import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

function SigninButton() {
  const signInWithGoogle = () => {
    // Firebaseの認証機能をクライアントサイドでのみ呼び出す
    if (typeof window !== 'undefined') {
      signInWithPopup(auth, provider).catch(error => {
        console.error("Google Sign-in Error:", error);
      });
    }
  };

  return <button onClick={signInWithGoogle}>サインイン</button>;
}

export default SigninButton;