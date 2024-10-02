"use client"; // クライアントコンポーネントとして明示

import { auth, provider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";

import Image from "next/image";

function SigninButton() {
	const signInWithGoogle = () => {
		if (typeof window !== "undefined") {
			signInWithPopup(auth, provider).catch((error) => {
				console.error("Google Sign-in Error:", error);
			});
		}
	};

	return (
		<>
			<button onClick={signInWithGoogle} style={{ color: "#ff5e2a" }}>
				<span className='flex'>
          <Image
            style={{marginRight:"8px"}}
						src='/images/google_icon.svg'
						width={20}
						height={20}
						alt='googleアイコン'
					/>
					Googleログイン
				</span>
			</button>
		</>
	);
}

export default SigninButton;
