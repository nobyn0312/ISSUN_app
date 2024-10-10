"use client"; // クライアントコンポーネント

import { useState } from "react";
import { auth, firestore } from "@/firebase"; // Firebaseのインポート
import { updateDoc, doc } from "firebase/firestore"; // Firestore関連のインポート
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { ContentsAreaOrange } from "@/components/ContentsArea";
import { PrimaryButton } from "@/components/Button";
import { useAuthContext } from "@/app/context/AuthContext";

const handleUpdateProfile = async (
	// userId: string,

	uid: string,
	username: string,
	age: string,
	height: number,
	shape: string
) => {
	try {
		// Firestoreの/profileコレクション内のユーザー情報を更新
		const userDocRef = doc(firestore, "profile", uid);
		await updateDoc(userDocRef, {
			uid: uid,
			username: username, // ユーザー名
			age: age, // 年齢層
			height: height, // 身長
			shape: shape, // 体型
		});

		console.log("User profile updated:", username, age, height, shape);
	} catch (error) {
		console.error("Error updating profile:", error);
	}
};

export default function EditProfile() {
	const [username, setUsername] = useState("");
	const [age, setAge] = useState(""); // 年齢層
	const [height, setHeight] = useState<number>(0); // 身長
	const [shape, setShape] = useState(""); // 体型

	const { userId } = useAuthContext(); // AuthContextからユーザーIDを取得
	const router = useRouter();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (userId) {
			await handleUpdateProfile(userId, username, age, height, shape);
			router.push("/top"); // 更新成功後にリダイレクト
		} else {
			console.error("User ID is not available");
		}
	};

	return (
		<>
			<Header />
			<div style={{ padding: "16px" }}>
				<section>
					<div style={{ padding: "16px 0 16px" }}>
						<p
							style={{ fontSize: "16px", fontWeight: "bold", color: "#FF5E2A" }}
						>
							edit
						</p>
						<h2
							style={{ fontSize: "28px", fontWeight: "bold", color: "#FF5E2A" }}
						>
							ユーザー情報の更新
						</h2>
					</div>

					<form onSubmit={onSubmit}>
						<ContentsAreaOrange style={{ marginBottom: "32px" }}>
							<div style={{ padding: "16px 0px 0" }}>
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

							<div style={{ padding: "16px 0px 0" }}>
								<label htmlFor='age'>年齢層:</label>
								<br />
								<select
									id='age'
									value={age}
									onChange={(e) => setAge(e.target.value)}
									required
									style={{
										width: "100%",
										padding: "8px",
										borderRadius: "6px",
									}}
								>
									<option value=''>選択してください</option>
									<option value='10-14歳'>10-14歳</option>
									<option value='10代'>15-19歳</option>
									<option value='20-24歳'>20-24歳</option>
									<option value='25-29歳'>25-29歳</option>
									<option value='30-34'>30-34歳</option>
									<option value='35-39'>35-39歳</option>
									<option value='40-44'>40-44歳</option>
									<option value='45-49'>45-49歳</option>
									<option value='50-54'>50-54歳</option>
									<option value='55-59'>55-59歳</option>
									<option value='60-64'>60-64歳</option>
									<option value='65-69'>65-69歳</option>
									<option value='70代以上'>70代以上</option>
								</select>
							</div>

							<div style={{ padding: "16px 0px 0" }}>
								<label htmlFor='height'>身長:</label>
								<br />
								<select
									id='height'
									value={height}
									onChange={(e) => setHeight(Number(e.target.value))}
									required
									style={{
										width: "100%",
										padding: "8px",
										borderRadius: "6px",
									}}
								>
									<option value='' disabled>
										選択してください
									</option>
									{[...Array(61)].map((_, i) => {
										const heightValue = 140 + i;
										return (
											<option key={heightValue} value={heightValue}>
												{heightValue}
											</option>
										);
									})}
								</select>
							</div>



							<div style={{ padding: "16px 0px 0" }}>
								<label htmlFor='shape'>体型:</label>
								<br />
								<select
									id='shape'
									value={shape}
									onChange={(e) => setShape(e.target.value)}
									required
									style={{
										width: "100%",
										padding: "8px",
										borderRadius: "6px",
									}}
								>
									<option value=''>選択してください</option>
									<option value='スリム'>スリム</option>
									<option value='やや細め'>やや細め</option>
									<option value='標準'>標準</option>
									<option value='やや大きめ'>やや大きめ</option>
									<option value='大きめ'>大きめ</option>
								</select>
							</div>
						</ContentsAreaOrange>

						<PrimaryButton style={{ marginBottom: "32px" }} type='submit'>
							ユーザー情報の更新
						</PrimaryButton>
					</form>
				</section>
			</div>
		</>
	);
}
