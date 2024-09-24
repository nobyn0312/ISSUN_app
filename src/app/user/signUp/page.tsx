"use client"; // クライアントコンポーネント

import { useState } from "react";
import { auth, firestore } from "@/firebase"; // Firebaseのインポート
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore関連のインポート
import { useRouter } from "next/navigation";

const handleSignUp = async (
	email: string,
	password: string,
	username: string
) => {
	try {
		// Firebase Authenticationでユーザーを作成
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;

		// Firestoreの/profileコレクションにユーザー情報を保存
		await setDoc(doc(firestore, "profile", user.uid), {
			uid: user.uid, // ユーザーのUID
			username: username, // ユーザー名
			email: email, // メールアドレス
		});

		console.log("User profile created with username:", username);
	} catch (error) {
		console.error("Error during sign-up:", error);
	}
};

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const router = useRouter();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await handleSignUp(email, password, username);
		router.push("/top"); // サインアップ成功後にリダイレクト
	};

	return (
		<main style={{ padding: "24px" }}>
			<section>
				<p>新規登録</p>
				<form onSubmit={onSubmit}>
					<div>
						<label htmlFor='username'>ユーザーネーム:</label>
						<input
							type='text'
							id='username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div>
						<label htmlFor='email'>Email:</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div>
						<label htmlFor='password'>Password:</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button
						type='submit'
						style={{
							padding: "8px",
							border: "1px solid #333",
							background: "#fff",
							color: "#333",
						}}
					>
						登録
					</button>
				</form>
			</section>
		</main>
	);
}
