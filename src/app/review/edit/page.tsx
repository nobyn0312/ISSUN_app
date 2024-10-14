"use client";

import { Suspense } from "react";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore"; // update用に追加
import { firestore } from "@/firebase";
import { useAuthContext } from "@/app/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { ContentsAreaOrange } from "@/components/ContentsArea";
import { PrimaryButton } from "@/components/Button";

const ReviewEdit = () => {
	const { user } = useAuthContext();
	const searchParams = useSearchParams();
	const reviewId = searchParams.get("reviewId");
	const [title, setTitle] = useState("");
	const [rate, setRate] = useState("");
	const [size, setSize] = useState("");
	const [comment, setComment] = useState("");

	useEffect(() => {
		const fetchReview = async () => {
			if (!reviewId) return;

			try {
				const reviewDoc = await getDoc(doc(firestore, "review", reviewId));

				if (reviewDoc.exists()) {
					const reviewData = reviewDoc.data();
					// フォームの状態にデータを反映
					setTitle(reviewData.title);
					setRate(reviewData.rate);
					setSize(reviewData.size);
					setComment(reviewData.comment);
				} else {
					console.error("レビューが見つかりませんでした");
				}
			} catch (error) {
				console.error("レビューの取得に失敗しました", error);
			}
		};

		fetchReview();
	}, [reviewId]);

	// 編集後のデータを保存
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!user) {
			alert("ログインが必要です");
			return;
		}

		if (!reviewId) {
			alert("レビューIDが無効です");
			return;
		}

		try {
			const reviewRef = doc(firestore, "review", reviewId as string); // reviewIdをstringにキャスト
			await updateDoc(reviewRef, {
				title: title,
				rate: rate,
				size: size,
				comment: comment,
				updatedAt: new Date(),
			});

			alert("レビューを更新しました");
		} catch (error) {
			console.error("レビューの更新に失敗しました", error);
			alert("レビューの更新に失敗しました");
		}
	};

	return (
		<>
			<Header />
				<div style={{ padding: "16px" }}>
					<p style={{ fontSize: "16px", fontWeight: "bold", color: "#FF5E2A" }}>
						Edit review
					</p>
					<h2
						style={{ fontSize: "28px", fontWeight: "bold", color: "#FF5E2A" }}
					>
						レビューを編集する
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

					<PrimaryButton type='submit'>レビューを更新</PrimaryButton>
				</form>
		</>
	);
};

// useSearchParamsをSuspenseでラップするために、以下のように外部コンポーネントを作成することもできます
const ReviewEditWrapper = () => (
	<Suspense fallback={<div>Loading...</div>}>
		<ReviewEdit />
	</Suspense>
);

export default ReviewEditWrapper;
