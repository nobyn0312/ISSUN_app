"use client";

import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firestore, storage } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/Header";
import { PrimaryButton } from "@/components/Button";
import { ContentsAreaGray } from "@/components/ContentsArea";

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
					<div style={{ padding: "16px" }}>
						<p
							style={{ fontSize: "16px", fontWeight: "bold", color: "#FF5E2A" }}
						>
							Add item
						</p>
						<h2
							style={{ fontSize: "28px", fontWeight: "bold", color: "#FF5E2A" }}
						>
							アイテムの追加
						</h2>
					</div>

					<form onSubmit={handleSubmit}>
						<ContentsAreaGray style={{ marginBottom: "32px" }}>
							<div style={{ padding: "16px 0px 0" }}>
								<label>アイテム名:</label>
								<br />
								<input
									type='text'
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									className='text-black'
									placeholder='商品名を入力'
								/>
							</div>

							<div style={{ padding: "16px 0px 0" }}>
								<label>価格:</label>
								<br />
								{/* <input
									type='number'
									value={price}
									onChange={(e) => setPrice(Number(e.target.value))}
									required
									className='text-black'
									placeholder='1111'
								/> */}
								<input
									type='text'
									className='text-black'
									placeholder='金額を入力してください'
									value={price}
									required
									// onChange={handleChange}
									onChange={(e) => setPrice(Number(e.target.value))}
									style={{ padding: "4px", width: "200px" }}
								/>
							</div>

							<div style={{ padding: "16px 0px 0" }}>
								<label>画像:</label>
								<br />
								<input
									type='file'
									onChange={handleFileChange} // ファイル選択時に一時保存
									accept='.png, .jpeg,.jpg, .webp'
									required
								/>
							</div>

							<div style={{ padding: "16px 0px 0" }}>
								<label>カテゴリー</label>
								<br />
								<select
									value={category}
									onChange={(e) => setCategory(e.target.value)}
									className='text-black'
								>
									<option value=''>カテゴリーを選択</option>
									<option value='outer'>アウター</option>
									<option value='shirt'>Tシャツ・シャツ</option>
									<option value='pants'>パンツ</option>
								</select>
							</div>

							<div style={{ padding: "16px 0px 0" }}>
								<label>詳細:</label>
								<br />
								<textarea
									value={detail}
									onChange={(e) => setDetail(e.target.value)}
									required
									className='text-black'
								/>
							</div>

							<div style={{ padding: "16px 0px 0" }}>
								<label>購入先:</label>
								<br />
								<input
									type='text'
									value={url}
									onChange={(e) => setUrl(e.target.value)}
									required
									className='text-black'
								/>
							</div>
						</ContentsAreaGray>

						<PrimaryButton type='submit'>アイテムを追加</PrimaryButton>
					</form>
				</>
			)}
		</>
	);
};

export default Page;
