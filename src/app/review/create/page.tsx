"use client";

import Header from "@/components/Header";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/firebase";
import { useAuthContext } from "@/app/context/AuthContext";
import { useSearchParams } from "next/navigation";

const Review = () => {
	const { user, username } = useAuthContext();
	const { userId } = useAuthContext();
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
		await addDoc(collection(firestore, "review"), {
			uid: user.uid, // Firebase AuthのユーザーUID
			username: username || "匿名ユーザー",
			itemId: itemId, // アイテムID
			title: title,
			rate: rate,
			size: size,
			comment: comment,
			createdAt: new Date(),
		});

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
			<h2>レビュー追加</h2>

			<p>ユーザーネーム</p>
			<p>{username}</p>
			<p>ユーザーID</p>
			<p>{userId}</p>
			<p>アイテムID</p>
			<p>{itemId}</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor='title'>タイトル</label>
				<input
					type='text'
					id='title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<div>
					<label htmlFor='rate'>評価</label>
					<select
						id='rate'
						value={rate}
						onChange={(e) => setRate(e.target.value)}
					>
						<option value=''>選択してください</option>
						<option value='1'>★☆☆☆☆</option>
						<option value='2'>★★☆☆☆</option>
						<option value='3'>★★★☆☆</option>
						<option value='4'>★★★★☆</option>
						<option value='5'>★★★★★</option>
					</select>
				</div>

				<div>
					<label htmlFor='size'>購入サイズ</label>
					<select
						id='size'
						value={size}
						onChange={(e) => setSize(e.target.value)}
					>
						<option value=''>選択してください</option>
						<option value='XS'>XS</option>
						<option value='S'>S</option>
						<option value='M'>M</option>
						<option value='L'>L</option>
						<option value='XL'>XL以上</option>
					</select>
				</div>

				<div>
					<label htmlFor='comment'>コメント</label>
					<textarea
						id='comment'
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
				</div>

				<button type='submit'>送信</button>
			</form>
		</>
	);
};

export default Review;
