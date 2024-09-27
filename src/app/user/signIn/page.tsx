"use client"; // クライアントコンポーネントとして明示

import SigninButton from "@/components/SigninButton";
import { auth } from "@/firebase";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import UserInfo from "@/components/UserInfo";
import SignOutButton from "@/components/SignoutButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ContentsAreaOrange } from "@/components/ContentsArea";
import Header from "@/components/Header";

const handleLogin = async (email: string, password: string) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		console.log("User logged in:", user);
		// ログイン成功後の処理
	} catch (error) {
		console.error("Error logging in:", error);
	}
};

export default function SignIn() {
	const [user] = useAuthState(auth);
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.push("/top"); // ログイン成功時にリダイレクト
		}
	}, [user, router]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await handleLogin(email, password); // ログイン処理を呼び出す
	};

	return (
		<>
			<Header/>
			<div style={{ padding: "16px" }}>
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

								<ContentsAreaOrange>
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
											ログイン
										</button>
									</form>

									<p>Google認証</p>
									<SigninButton />
								</ContentsAreaOrange>
							</>
						)}
					</div>
				</section>
			</div>
		</>
	);
}
