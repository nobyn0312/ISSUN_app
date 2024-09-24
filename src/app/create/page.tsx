"use client";

import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firestore, storage } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/Header";
import { PrimaryButton } from "@/components/Button";

const Page = () => {
	// アイテム名
	const [name, setName] = useState("");
	// 金額
	const [price, setPrice] = useState(0);
	// カテゴリ
	const [category, setCategory] = useState("");
	// 詳細情報
	const [detail, setDetail] = useState("");
	// ファイルアップ時
	const [file, setFile] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState("");
	// ローディング時
	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState(0);

	const [url, setUrl] = useState("");

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
		}
	};

	// フォーム送信時の処理
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!file) {
			console.error("No file selected");
			return;
		}

		setLoading(true);

		try {
			const storageRef = ref(storage, "images/" + file.name);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progressPercent =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setProgress(progressPercent);
				},
				(err) => {
					console.error("Upload failed", err);
					setLoading(false);
				},
				async () => {
					const downloadURL = await getDownloadURL(storageRef);
					setImageUrl(downloadURL);

					const itemId = uuidv4();

					// Firestoreに商品データを追加
					await addDoc(collection(firestore, "item"), {
						id: itemId, // UUID を ID として設定
						name,
						price: Number(price),
						category,
						detail,
						imageUrl: downloadURL,
						createdAt: Timestamp.now(),

						url,
					});

					setName("");
					setPrice(0);
					setCategory("");
					setDetail("");
					setFile(null);
					setLoading(false);

					console.log("Product added to Firestore!");
				}
			);
		} catch (e) {
			console.error("Error adding document: ", e);
			setLoading(false);
		}
	};

	return (
		<>
			{loading ? (
				<>
					<h2>アップロード中: {Math.round(progress)}%</h2>
				</>
			) : (
				<>
					<Header />
					<div>
						<h1>商品登録</h1>
					</div>
					<form onSubmit={handleSubmit}>
						<div>
							<label>商品名:</label>
							<input
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className='text-black'
							/>
						</div>

						<div>
							<label>価格:</label>
							<input
								type='number'
								value={price}
								onChange={(e) => setPrice(Number(e.target.value))}
								required
								className='text-black'
							/>
						</div>

						<div>
							<label>画像:</label>
							<input
								type='file'
								onChange={handleFileChange} // ファイル選択時に一時保存
								accept='.png, .jpeg,.jpg, .webp'
								required
							/>
						</div>

						<div>
							<label>カテゴリー</label>
							<select
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								className='text-black'
							>
								<option value=''>ALL</option>
								<option value='outer'>アウター</option>
								<option value='shirt'>Tシャツ・シャツ</option>
								<option value='pants'>パンツ</option>
							</select>
						</div>

						<div>
							<label>詳細:</label>
							<textarea
								value={detail}
								onChange={(e) => setDetail(e.target.value)}
								required
								className='text-black'
							/>
						</div>

						<div>
							<label>購入先:</label>
							<input
								type='text'
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								required
								className='text-black'
							/>
						</div>

						<PrimaryButton type='submit'>登録</PrimaryButton>
					</form>
				</>
			)}
		</>
	);
};

export default Page;
