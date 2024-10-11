"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import SelectCategory from "@/components/SelectCategory";
import { fetchItems, Item } from "@/libs/fetchItems";
import Sort from "@/components/Sort";
import {
	collection,
	getDoc,
	getDocs,
	getFirestore,
	orderBy,
	query,
} from "firebase/firestore";
import { app } from "@/firebase";

const TopPage = () => {
	const [loading, setLoading] = useState(true);
	const [items, setItems] = useState<Item[]>([]);
	const [error, setError] = useState<string | null>(null);
	// const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

	// const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

	useEffect(() => {
		const getItems = async () => {
			try {
				const fetchedItems = await fetchItems();
				console.log("取得したアイテム一覧:", fetchedItems);
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


	const handleSortChange = () => {
		console.log("sort")
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
				<Sort className='mb-4' onChange={handleSortChange} />{" "}
				{/* onChangeを渡す */}
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
