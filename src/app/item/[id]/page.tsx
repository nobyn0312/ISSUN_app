"use client";

// アイテム詳細ページ

import { notFound } from "next/navigation";

import Image from "next/image";
import { fetchItems, Item } from "@/libs/fetchItems";
import Header from "@/components/Header";
import Link from "next/link";
import { PrimaryButton } from "@/components/Button";
import Review from "@/components/Review";

const fetchItem = async (id: string): Promise<Item | null> => {
	try {
		const items = await fetchItems();
		return items.find((item) => item.id === id) || null;
	} catch (error) {
		console.error("Error fetching item: ", error);
		return null;
	}
};

const ItemDetail = async ({ params }: { params: { id: string } }) => {
	const item = await fetchItem(params.id);



	if (!item) {
		notFound();
	}

	return (
		<>
			<Header />
			{/* <p>{ item.id}</p> */}
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

				<Review itemId={item.id} />

				<PrimaryButton style={{ margin: "0 auto" }}>
					<Link href={item.url} style={{ display: "block" }}>
						販売ショップへ
					</Link>
				</PrimaryButton>
			</main>
		</>
	);
};

export default ItemDetail;
