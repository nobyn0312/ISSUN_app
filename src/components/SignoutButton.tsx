"use client"; // クライアントコンポーネントとして明示

import { auth } from "@/firebase";

function SignOutButton() {
	const handleSignOut = () => {
		auth.signOut().then(() => {
			window.location.reload();
		});
	};

	return (
		<>
			<button onClick={handleSignOut}>
				サインアウト
			</button>
		</>
	);
}

export default SignOutButton;
