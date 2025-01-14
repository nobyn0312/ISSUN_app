"use client";

// アイテム詳細ページ

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { fetchItemDetail } from "@/libs/fetchItemDetail";
import Header from "@/components/Header";
import Link from "next/link";
import { PrimaryButton } from "@/components/Button";
import Review from "@/components/Review";
import { notFound } from "next/navigation";
import { Item } from "@/libs/fetchItems";
import { Container } from "@/components/Container";

const ItemDetail = ({ params }: { params: { id: string } }) => {
	const [item, setItem] = useState<Item | null>(null);

	useEffect(() => {
		fetchItemDetail(params.id).then((fetchedItem) => {
			if (!fetchedItem) {
				notFound(); // アイテムが見つからない場合は notFound を呼び出す
			} else {
				setItem(fetchedItem);
			}
		});
	}, [params.id]);
	if (!item) {
		return <p>Loading...</p>; // アイテムがまだ読み込まれていない場合の表示
	}

	return (
		<>
			<Header />
			<Container>
				<main style={{ padding: "24px" }}>
					<Image
						src={item.imageUrl}
						width={450}
						height={300}
						alt={item.name}
						className='rounded-md'
						style={{ margin: "0 auto", marginBottom: "24px" }}
					/>
					<section
						style={{
							background: "#FF5E2A",
							margin: "0 auto",
							padding: "16px",
							borderRadius: "15px",
							marginBottom: "24px",
						}}
					>
						<h1
							style={{
								fontSize: "30px",
								fontWeight: "bold",
								marginBottom: "16px",
							}}
						>
							{item.name}
						</h1>

						<p style={{ fontSize: "20px", fontWeight: "bold" }}>PRICE</p>
						<p
							style={{
								fontSize: "28px",
								fontWeight: "bold",
								marginBottom: "16px",
							}}
						>
							¥{item.price}
						</p>

						<p style={{ fontSize: "20px", fontWeight: "bold" }}>DETAIL</p>
						<p style={{ fontSize: "14px", whiteSpace: "pre-line" }}>
							{item.detail}
						</p>
					</section>

					<Suspense>
						<Review itemId={item.id} />
					</Suspense>

					<PrimaryButton style={{ margin: "0 auto" }}>
						<Link
							href={item.url as string}
							style={{ display: "block" }}
							target='_blank'
						>
							販売ショップへ
						</Link>
					</PrimaryButton>
				</main>
			</Container>
		</>
	);
};

export default ItemDetail;
