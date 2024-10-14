"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { firestore } from "@/firebase";
import {
	collection,
	query,
	where,
	getDocs,
	Timestamp,
	deleteDoc,
	doc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

type ReviewProps = {
	itemId: string;
};

// review型
type ReviewData = {
	reviewId: string;
	title: string;
	comment: string;
	username: string;
	rate: number;
	size: string;
	createdAt: Timestamp;
};

const Review = ({ itemId }: ReviewProps) => {
	console.log("アイテムID: ", itemId);
	const [reviews, setReviews] = useState<ReviewData[]>([]);
	const router = useRouter();

	// レビュー取得
	const fetchReviews = useCallback(async () => {
		try {
			const q = query(
				collection(firestore, "review"),
				where("itemId", "==", itemId)
			);

			const querySnapshot = await getDocs(q);

			const fetchedReviews: ReviewData[] = querySnapshot.docs.map((doc) => ({
				reviewId: doc.data().reviewId,
				title: doc.data().title,
				comment: doc.data().comment,
				username: doc.data().username,
				rate: doc.data().rate,
				size: doc.data().size,
				createdAt: doc.data().createdAt,
			}));
			setReviews(fetchedReviews);
		} catch (error) {
			console.error("Error fetching reviews: ", error);
		}
	}, [itemId]);

	// 初回レンダリング時レビュー取得
	useEffect(() => {
		fetchReviews();
	}, [fetchReviews]); // fetchReviewsを依存性に追加

	// レビュー編集ボタン
	const handleEdit = (reviewId: string) => {
		router.push(`/review/edit?reviewId=${reviewId}`);
	};

	// レビュー削除
	const handleDelete = async (reviewId: string) => {
		const isConfirmed = confirm("レビューを削除しますか？");
		if (isConfirmed) {
			try {
				const reviewRef = doc(firestore, "review", reviewId);
				await deleteDoc(reviewRef);
				alert("削除完了");
				window.location.reload();
			} catch (error) {
				alert("エラーが発生しました");
			}
		} else {
			alert("削除をキャンセルしました");
		}
	};

	// 日付をフォーマット
	const formatDate = (date: Date) => {
		const y = date.getFullYear();
		const m = ("00" + (date.getMonth() + 1)).slice(-2);
		const d = ("00" + date.getDate()).slice(-2);
		return `${y}/${m}/${d}`;
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
					<p>reviewer：{reviews.length}</p>
				</div>
				<Link href={`/review/create?itemId=${itemId}`}>レビューを書く</Link>
			</div>

			{reviews.map((review, index) => {
				const formatedDate = formatDate(review.createdAt.toDate());
				return (
					<div
						key={index}
						style={{
							padding: "16px",
							background: "#E6E6E6",
							borderRadius: "10px",
							marginBottom: "24px",
						}}
					>
						<div className='flex justify-between'>
							<p
								style={{
									fontWeight: "bold",
									fontSize: "20px",
									marginBottom: "8px",
								}}
								className='flex align-middle justify-center'
							>
								{review.title}
							</p>
							<div
								className='flex align-middle justify-center'
								style={{ gap: "8px" }}
							>
								<button
									style={{ color: "#333", fontWeight: "bold" }}
									onClick={() => handleEdit(review.reviewId)}
								>
									編集
								</button>
								<button
									style={{ color: "#FF5E2A", fontWeight: "bold" }}
									onClick={() => handleDelete(review.reviewId)}
								>
									削除
								</button>
							</div>
						</div>
						<p style={{ fontWeight: "light", marginBottom: "8px" }}>
							{formatedDate}
						</p>

						<p style={{ color: "#FF5E2A", fontSize: "20px" }}>
							{"★".repeat(review.rate) + "☆".repeat(5 - review.rate)}
						</p>

						<p style={{ fontSize: "20px", fontWeight: "bold" }}>
							SIZE：{review.size}
						</p>
						<div
							style={{
								border: "1px solid #333",
								width: "100%",
								marginBottom: "8px",
							}}
						></div>
						<p
							style={{
								lineHeight: "1.75",
								marginBottom: "60px",
								whiteSpace: "pre-line",
							}}
						>
							{review.comment}
						</p>

						<p>
							<small>{review.username}</small>
						</p>
					</div>
				);
			})}
		</section>
	);
};

export default Review;
