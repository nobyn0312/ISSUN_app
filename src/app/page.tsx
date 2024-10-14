"use client";

import SigninButton from "@/components/SigninButton";
import { auth } from "@/firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import UserInfo from "@/components/UserInfo";
import SignOutButton from "@/components/SignoutButton";
import Image from "next/image";
// import {error } from "console";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const handleRegister = async (email: string, password: string) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		console.log("User registered:", user);
		// ユーザー登録成功後の処理
	} catch (error) {
		console.error("Error registering user:", error);
	}
};

// const handleLogin = async (email: string, password: string) => {
// 	try {
// 		const userCredential = await signInWithEmailAndPassword(
// 			auth,
// 			email,
// 			password
// 		);
// 		const user = userCredential.user;
// 		console.log("User logged in:", user);
// 		// ログイン成功後の処理
// 	} catch (error) {
// 		console.error("Error logging in:", error);
// 	}
// };

export default function Home() {
	const [user] = useAuthState(auth);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await handleRegister(email, password);
	};

	return (
		<>
			<main style={{ padding: "24px" }}>
				<section>
					<div>
						<h1 className=''>
							<Image
								src='/images/topLogo.webp'
								width={480}
								height={480}
								alt='BOXロゴ'
							/>
						</h1>
					</div>
					<div>
						{user ? (
							<>
								<UserInfo />
								<SignOutButton />
							</>
						) : (
							<>
								<p>ログイン</p>
								<form onSubmit={onSubmit}>
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
											autoComplete='current-password'
										/>
									</div>
									<button type='submit'>新規登録</button>
								</form>

								<p>Google認証</p>
								<SigninButton />
							</>
						)}
					</div>
				</section>
			</main>
		</>
	);
}
