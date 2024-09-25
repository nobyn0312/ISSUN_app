"use client";

import React, { useState } from "react";
import { SecondaryButton } from "./Button";
import Link from "next/link";

// propsの型定義を追加
type ReviewProps = {
	itemId: string;
};

const Review = ({ itemId }: ReviewProps) => {
	console.log("アイテムID: ", itemId);
	// レビュータイトル
	const [title, setTitle] = useState("");
	// レート
	const [rate, setRate] = useState("");
	// コメント
	const [comment, setComment] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("アイテムID: ", itemId);
	};

	return (
		<section
			style={{
				background: "#ffffff",
				color: "#333333",
				borderRadius: "15px",
				marginBottom: "24px",
				padding: "16px",
			}}
		>
			<div className='flex align-bottom items-end justify-between mb-4'>
				<div style={{ width: "40%" }}>
					<p style={{ fontSize: "16px", fontWeight: "bold" }}>minnano</p>
					<h2 style={{ fontSize: "28px", fontWeight: "bold" }}>Review</h2>

					<p>reviewer：32</p>
				</div>
				{/* <SecondaryButton style={{ width: "40%" }}>
					<a href='/review/create/'>レビュー追加</a>
				</SecondaryButton> */}
				<Link href={`/review/create?itemId=${itemId}`}>レビューを書く</Link>
			</div>

			<div
				style={{
					padding: "16px",
					background: "#E6E6E6",
					borderRadius: "10px",
				}}
			>
				<p
					style={{
						fontWeight: "bold",
						fontSize: "20px",
						marginBottom: "8px",
					}}
				>
					着丈ちょうどいい
				</p>
				<p style={{ fontWeight: "light", marginBottom: "8px" }}>2024/09/09</p>

				<p style={{ color: "#FF5E2A", fontSize: "20px" }}>★★★★☆</p>

				<p style={{ fontSize: "20px", fontWeight: "bold" }}>SIZE：S</p>
				<div
					style={{
						border: "1px solid #333",
						width: "100%",
						marginBottom: "8px",
					}}
				></div>
				<p style={{ lineHeight: "1.75", marginBottom: "60px" }}>
					白のMサイズを購入 大きめで着るのが好きなので袖も長めで
					ちょうどいいです 着丈も長めですがいつもインして着ています
					洗濯してもシワになりづらく、お気に入りです
				</p>

				<p>
					<small>一寸先は闇/男性/160cm/やや細身</small>
				</p>
			</div>
		</section>
	);
};

export default Review;
