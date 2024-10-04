// top/page.tsx
"use client"; // これを追加

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import SelectCategory from "@/components/SelectCategory";
import { fetchItems, Item } from "@/libs/fetchItems";

const TopPage = () => {
	const [loading, setLoading] = useState(true);
	const [items, setItems] = useState<Item[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const getItems = async () => {
			try {
				const fetchedItems = await fetchItems();
				setItems(fetchedItems);
			} catch (error) {
				setError("データ取得失敗");
				console.error("エラー", error);
			} finally {
				setLoading(false);
			}
		};

		getItems();
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<Header />
			<main style={{ padding: "24px" }}>
				<div>
					<h1>
						<Image
							src='/images/top_logo.svg'
							width={480}
							height={480}
							alt='BOXロゴ'
							style={{ marginBottom: "32px" }}
						/>
					</h1>
				</div>
				<SelectCategory className='mb-4' />
				<section>
					<ul className='flex justify-between flex-wrap'>
						{items.map((item) => (
							<li key={item.id} style={{ marginBottom: "20px", width: "48%" }}>
								<Link href={`/item/${item.id}`}>
									<Image
										src={item.imageUrl}
										width={300}
										height={200}
										alt={item.name}
										className='rounded-md'
									/>
								</Link>
								<div style={{ marginTop: "10px" }}>
									<h2 style={{ fontWeight: "bold", fontSize: "18px" }}>
										{item.name.length > 10
											? `${item.name.slice(0, 10)}...`
											: item.name}
									</h2>
									<p
										style={{
											color: "#ff5e2a",
											fontSize: "16px",
											fontWeight: "bold",
										}}
									>
										{item.category}
									</p>
								</div>
							</li>
						))}
					</ul>
				</section>
			</main>
		</>
	);
};

export default TopPage;
