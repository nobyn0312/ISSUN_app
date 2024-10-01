"use client";

import Header from "@/components/Header";
import { useState } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase";
import { useAuthContext } from "@/app/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { ContentsAreaOrange } from "@/components/ContentsArea";
import { PrimaryButton } from "@/components/Button";

const Review = () => {
	const { user, username } = useAuthContext();
	const searchParams = useSearchParams();
	const itemId = searchParams.get("itemId");

	const [title, setTitle] = useState("");
	const [rate, setRate] = useState("");
	const [size, setSize] = useState("");
	const [comment, setComment] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!user) {
			alert("ログインが必要です");
			return;
		}

		try {
			const docRef = await addDoc(collection(firestore, "review"), {
				uid: user.uid,
				username: username,
				itemId: itemId,
				title: title,
				rate: rate,
				size: size,
				comment: comment,
				createdAt: new Date(),
			});

			//レビュー投稿時に登録されたIDをreviewIdとして登録する
			await updateDoc(doc(firestore, "review", docRef.id), {
				// reviewのidをdocRef.idとして
				reviewId: docRef.id,
			});
			const reviewId = docRef.id;

			console.log(reviewId);
			alert("レビューを送信しました");

			setTitle("");
			setRate("");
			setSize("");
			setComment("");
		} catch (error) {
			console.error("レビューの送信に失敗しました", error);
			alert("レビューの送信に失敗しました");
		}
	};

	return (
		<>
			<Header />
			<div style={{ padding: "16px" }}>
				<p style={{ fontSize: "16px", fontWeight: "bold", color: "#FF5E2A" }}>
					Add review
				</p>
				<h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#FF5E2A" }}>
					レビューの投稿
				</h2>
			</div>

			<form onSubmit={handleSubmit}>
				<ContentsAreaOrange style={{ marginBottom: "32px" }}>
					<div style={{ padding: "16px 0px 0" }}>
						<label htmlFor='title'>タイトル</label>
						<br />
						<input
							type='text'
							id='title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
						/>
					</div>

					<div style={{ padding: "16px 0px 0" }}>
						<label htmlFor='rate'>評価</label>
						<br />
						<select
							id='rate'
							value={rate}
							onChange={(e) => setRate(e.target.value)}
							style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
						>
							<option value=''>選択してください</option>
							<option value='1'>★☆☆☆☆</option>
							<option value='2'>★★☆☆☆</option>
							<option value='3'>★★★☆☆</option>
							<option value='4'>★★★★☆</option>
							<option value='5'>★★★★★</option>
						</select>
					</div>

					<div style={{ padding: "16px 0px 0" }}>
						<label htmlFor='size'>購入サイズ</label>
						<br />
						<select
							id='size'
							value={size}
							onChange={(e) => setSize(e.target.value)}
							style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
						>
							<option value=''>選択してください</option>
							<option value='XS'>XS</option>
							<option value='S'>S</option>
							<option value='M'>M</option>
							<option value='L'>L</option>
							<option value='XL'>XL以上</option>
						</select>
					</div>

					<div style={{ padding: "16px 0px 0" }}>
						<label htmlFor='comment'>コメント</label>
						<br />
						<textarea
							id='comment'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							style={{
								width: "100%",
								height: "250px",
								padding: "8px",
								borderRadius: "6px",
							}}
						/>
					</div>
				</ContentsAreaOrange>

				<PrimaryButton type='submit'>レビューを投稿</PrimaryButton>
			</form>
		</>
	);
};

export default Review;
