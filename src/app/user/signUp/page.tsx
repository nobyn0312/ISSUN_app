"use client"; // クライアントコンポーネント

import { useState } from "react";
import { auth, firestore } from "@/firebase"; // Firebaseのインポート
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore関連のインポート
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { ContentsAreaOrange } from "@/components/ContentsArea";
import { PrimaryButton } from "@/components/Button";

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
		<>
			<Header />
			<div style={{ padding: "16px" }}>
				<section>
					<div style={{ padding: "16px 0 16px" }}>
						<p
							style={{
								fontSize: "16px",
								fontWeight: "bold",
								color: "#FF5E2A",
							}}
						>
							Sign up
						</p>
						<h2
							style={{
								fontSize: "28px",
								fontWeight: "bold",
								color: "#FF5E2A",
							}}
						>
							新規登録
						</h2>
					</div>

					<form onSubmit={onSubmit}>
						<ContentsAreaOrange style={{ marginBottom: "32px" }}>
							<div style={{ padding: "16px 0 0" }}>
								<label htmlFor='username'>ユーザーネーム:</label>
								<br />
								<input
									type='text'
									id='username'
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
									style={{
										width: "100%",
										padding: "8px",
										borderRadius: "6px",
									}}
								/>
							</div>

							<div style={{ padding: "16px 0 0" }}>
								<label htmlFor='email'>Email:</label>
								<br />
								<input
									type='email'
									id='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									style={{
										width: "100%",
										padding: "8px",
										borderRadius: "6px",
									}}
								/>
							</div>

							<div style={{ padding: "16px 0 16px" }}>
								<label htmlFor='password'>Password:</label>
								<br />
								<input
									type='password'
									id='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									autoComplete='current-password'
									style={{
										width: "100%",
										padding: "8px",
										borderRadius: "6px",
									}}
								/>
							</div>
						</ContentsAreaOrange>

						<PrimaryButton style={{ marginBottom: "32px" }} type='submit'>
							新規登録
						</PrimaryButton>
					</form>
				</section>
			</div>
		</>
	);
}
