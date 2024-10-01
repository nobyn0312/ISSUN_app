"use client";

import React, { useEffect, useState } from "react";
import { SecondaryButton } from "./Button";
import Link from "next/link";
import { firestore } from "@/firebase";
import {
	collection,
	query,
	where,
	getDocs,
	Timestamp,
} from "firebase/firestore";
import { Container } from "./Container";
import { useRouter } from "next/navigation";

type ReviewProps = {
	itemId: string;
	review:string
};

// review型
type ReviewData = {
	title: string;
	comment: string;
	username: string;
	rate: number;
	size: string;
	createdAt: Timestamp;
};

const Review = ({ itemId, review }: ReviewProps) => {
	console.log("アイテムID: ", itemId);

	const [reviews, setReviews] = useState<ReviewData[]>([]);

	// レビュータイトル
	// const [title, setTitle] = useState("");
	// const [rate, setRate] = useState("");
	// const [comment, setComment] = useState("");

	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("アイテムID: ", itemId);
	};

	const fetchReviews = async () => {
		try {
			const q = query(
				collection(firestore, "review"),
				where("itemId", "==", itemId)
			);

			const querySnapshot = await getDocs(q);

			const fetchedReviews: ReviewData[] = querySnapshot.docs.map((doc) => ({
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
	};
	useEffect(() => {
		fetchReviews();
	}, [itemId]);

const handleEdit = (reviewId: string) => {
	router.push(`/review/edit?reviewId=${reviewId}`);
};

	return (
		<>
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
					console.log(review.createdAt.toDate());
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
								>
									{review.title}
								</p>
								{/* review.id を handleEdit に渡す */}
								<button onClick={() => handleEdit(review.id)}>編集</button>
							</div>
							<p style={{ fontWeight: "light", marginBottom: "8px" }}>
								{review.createdAt.toDate().toString()}
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
		</>
	);
};

export default Review;
