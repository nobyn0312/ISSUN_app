"use client"; // クライアントコンポーネント
import React from "react";
import Header from "@/components/Header";
import { ContentsAreaOrange } from "@/components/ContentsArea";
import { PrimaryButton } from "@/components/Button";
import { useAuthContext } from "@/app/context/AuthContext";
import Link from "next/link";

const Page = () => {
	// useAuthContext からユーザー情報を取得
	const { user, username, age, height, shape } = useAuthContext();

	// ユーザー情報がない場合の処理
	// if (!user) {
	// 	return (
	// 		<div>
	// 			<Header />
	// 			<div style={{ padding: "16px" }}>
	// 				<h2
	// 					style={{ fontSize: "28px", fontWeight: "bold", color: "#FF5E2A" }}
	// 				>
	// 					ユーザーがログインしていません
	// 				</h2>
	// 			</div>
	// 		</div>
	// 	);
	// }

	return (
		<>
			<Header />
			<div style={{ padding: "16px" }}>
				<h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#FF5E2A" }}>
					ユーザー情報
				</h2>

				<ContentsAreaOrange>
					<p>名前: {username || "未設定"}</p>
					<p>年齢: {age !== null ? age : "未設定"}</p>
					<p>身長: {height !== null ? height : "未設定"}</p>
					<p>体型: {shape || "未設定"}</p>
				</ContentsAreaOrange>
			</div>
			<PrimaryButton>
				<Link style={{ display: "block" }} href={"/user/edit/"}>
					ユーザー情報を更新する
				</Link>
			</PrimaryButton>
		</>
	);
};

export default Page;
