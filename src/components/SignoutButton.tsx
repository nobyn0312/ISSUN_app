"use client";  // クライアントコンポーネントとして明示


import { auth } from '../firebase';

function SignOutButton() {


  return <button onClick={()=> auth.signOut()}>サインアウト</button>;
}

export default SignOutButton;