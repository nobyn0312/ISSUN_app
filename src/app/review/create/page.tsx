"use client";

import { Suspense } from "react";
import Header from "@/components/layout/Header";
import { ContentsAreaOrange } from "@/components/features/ContentsArea";
import { PrimaryButton } from "@/components/ui/Button";

import { useSubmitReview } from "@/hooks/useSubmitReview";

const ReviewCreate = () => {
	const {
		title,
		setTitle,
		rate,
		setRate,
		size,
		setSize,
		comment,
		setComment,
		handleSubmit,
	} = useSubmitReview();

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

				<PrimaryButton type='submit' style={{ marginBottom: "32px" }}>
					レビューを投稿
				</PrimaryButton>
			</form>
		</>
	);
};

// Suspenseは非同期 フォールバック中の処理を追加する
const ReviewCreateWrapper = () => (
	<Suspense fallback={<div>Loading...</div>}>
		<ReviewCreate />
	</Suspense>
);

export default ReviewCreateWrapper;
