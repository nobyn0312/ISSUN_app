"use client";

import SigninButton from "@/components/SigninButton";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import UserInfo from "@/components/Userinfo/UserInfo";
import SignOutButton from "@/components/SignoutButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ContentsAreaOrange } from "@/components/ContentsArea";
import Header from "@/components/Header";
import { PrimaryButton, SecondaryButton } from "@/components/Button";
import SnackbarComponent from "@/components/Snackbar";

const handleLogin = async (
	email: string,
	password: string,
	setSnackbar: (message: string, severity: "success" | "error") => void
) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		console.log(user);
		setSnackbar("ログイン成功！", "success");
	} catch (error) {
		setSnackbar("パスワードが違います", "error");
		console.error(error);
	}
};

export default function SignIn() {
	const [user] = useAuthState(auth);
	const router = useRouter();

	useEffect(() => {
		if (user) {
			setSnackbar("ログイン成功！", "success");
			const timer = setTimeout(() => {
				router.push("/top");
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [user, router]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
		"success"
	);

	const setSnackbar = (message: string, severity: "success" | "error") => {
		console.log("Setting Snackbar:", { message, severity });
		setSnackbarMessage(message);
		setSnackbarSeverity(severity);
		setSnackbarOpen(true);
	};

	const handleCloseSnackbar = () => {
		console.log("Snackbar Closed");

		setSnackbarOpen(false);
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await handleLogin(email, password, setSnackbar);
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
									Login
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

								<p
									style={{
										fontSize: "16px",
										textAlign: "center",
										color: "#fff",
										marginBottom: "16px",
									}}
								>
									または
								</p>
							</form>
							<SecondaryButton style={{ marginBottom: "32px" }}>
								<a style={{ display: "block" }} href='/user/signUp'>
									新規登録
								</a>
							</SecondaryButton>
							<div
								className='pt-4'
								style={{ textAlign: "center", borderTop: "2px solid #fff" }}
							>
								<SigninButton />
							</div>
						</>
					)}
				</section>
				<SnackbarComponent
					message={snackbarMessage}
					isOpen={snackbarOpen}
					onClose={handleCloseSnackbar}
					severity={snackbarSeverity}
					duration={1000}
				/>
			</div>
		</>
	);
}
