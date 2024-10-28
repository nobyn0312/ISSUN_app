"use client"; // クライアントコンポーネントとして明示

import SigninButton from "@/components/SigninButton";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import UserInfo from "@/components/UserInfo";
import SignOutButton from "@/components/SignoutButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ContentsAreaOrange } from "@/components/ContentsArea";
import Header from "@/components/Header";
import { PrimaryButton } from "@/components/Button";

const handleLogin = async (email: string, password: string) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		console.log(user);
		// ログイン成功後の処理
	} catch (error) {
		alert("パスワードが違います");
		console.error(error);
	}
};

export default function SignIn() {
	const [user] = useAuthState(auth);
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.push("/top");
		}
	}, [user, router]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await handleLogin(email, password);
	};

	return (
		<>
			<Header />
			<div style={{ padding: "16px" }}>
				<section>
					{user ? (
						<>
							<UserInfo />
							<SignOutButton />
						</>
					) : (
						<>
							<div style={{ padding: "16px 0 16px" }}>
								<p
									style={{
										fontSize: "16px",
										fontWeight: "bold",
										color: "#FF5E2A",
									}}
								>
									Sign in
								</p>
								<h2
									style={{
										fontSize: "28px",
										fontWeight: "bold",
										color: "#FF5E2A",
									}}
								>
									ログイン
								</h2>
							</div>

							<form onSubmit={onSubmit}>
								<ContentsAreaOrange style={{ marginBottom: "32px" }}>
									<div>
										<label htmlFor='email'>メールアドレス</label>
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
									<div style={{ padding: "16px 0px 0", marginBottom: "32px" }}>
										<label htmlFor='password'>パスワード:</label>
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
									ログイン
								</PrimaryButton>
							</form>
							<p
								className='pt-4 pb-4 text-center'
								style={{
									borderBottom: "2px solid #fff",
									marginBottom: "16px",
								}}
							>
								Google認証の方はこちら
							</p>
							<div style={{ textAlign: "center" }}>
								<SigninButton />
							</div>

							<p
								className='pt-4 pb-4 text-center'
								style={{
									borderBottom: "2px solid #fff",
									marginBottom: "16px",
								}}
							>
								新規登録
							</p>
							<div style={{ textAlign: "center" }}>
								<a href='/user/signUp'>新規登録はこちら</a>
							</div>
						</>
					)}
				</section>
			</div>
		</>
	);
}
