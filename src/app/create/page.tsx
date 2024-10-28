"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { PrimaryButton } from "@/components/Button";
import { ContentsAreaGray } from "@/components/ContentsArea";
import { useUploadFile } from "./hooks/useUploadFile";

const Page = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [category, setCategory] = useState("");
	const [detail, setDetail] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [url, setUrl] = useState("");

	const { progress, loading, uploadFile } = useUploadFile();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file) return;

		const itemData = {
			name,
			price: Number(price),
			category,
			detail,
			url,
		};

		await uploadFile(file, itemData);

		setName("");
		setPrice(0);
		setCategory("");
		setDetail("");
		setFile(null);
		setUrl("");
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
									style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
								/>
							</div>

							<div style={{ padding: "16px 0px 0" }}>
								<label>価格:</label>
								<br />
								<input
									type='text'
									className='text-black'
									placeholder='金額を入力してください'
									value={price}
									required
									onChange={(e) => setPrice(Number(e.target.value))}
									style={{
										padding: "8px",
										width: "200px",
										borderRadius: "6px",
									}}
								/>
							</div>

							<div style={{ padding: "16px 0px 0" }}>
								<label>画像:</label>
								<br />
								<input
									type='file'
									onChange={handleFileChange}
									accept='.png, .jpeg,.jpg, .webp'
									required
									style={{ borderRadius: "6px" }}
								/>
							</div>

							<div style={{ padding: "16px 0px 0" }}>
								<label>カテゴリー</label>
								<br />
								<select
									value={category}
									onChange={(e) => setCategory(e.target.value)}
									className='text-black'
									style={{ padding: "8px" }}
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
									aria-multiline
									className='text-black'
									style={{
										width: "100%",
										height: "250px",
										padding: "8px",
										borderRadius: "6px",
									}}
								/>
							</div>

							<div style={{ padding: "16px 0px 16px" }}>
								<label>購入先URL:</label>
								<br />
								<input
									type='text'
									value={url}
									onChange={(e) => setUrl(e.target.value)}
									required
									className='text-black'
									placeholder='https://'
									style={{ padding: "8px", borderRadius: "6px" }}
								/>
							</div>
						</ContentsAreaGray>

						<PrimaryButton type='submit' style={{ marginBottom: "32px" }}>
							アイテムを追加
						</PrimaryButton>
					</form>
				</>
			)}
		</>
	);
};

export default Page;
