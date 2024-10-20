"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
// import SelectCategory from "@/components/SelectCategory";
import { fetchItems, Item } from "@/libs/fetchItems";
import Sort from "@/components/Sort";
import styles from "./top.module.css";

const TopPage = () => {
	const [loading, setLoading] = useState(true);
	const [items, setItems] = useState<Item[]>([]);
	const [error, setError] = useState<string | null>(null);

	const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

	useEffect(() => {
		const getItems = async () => {
			try {
				const fetchedItems = await fetchItems(sortOrder);
				setItems(fetchedItems);
			} catch (error) {
				setError("データ取得失敗");
			} finally {
				setLoading(false);
			}
		};

		getItems();
	}, [sortOrder]);

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortOrder(e.target.value as "newest" | "oldest");
	};

	if (loading) {
		return (
			<>
				<Header />
				<main style={{ padding: "24px" }}>
					<p>Loading...</p>
				</main>
			</>
		);
	}

	if (error) {
		return (
			<>
				<Header />
				<main style={{ padding: "24px" }}>
					<p>{error}</p>
				</main>
			</>
		);
	}

	return (
		<>
			<Header />
			<main style={{ padding: "24px" }}>
				<div className={styles.msg_wrap}>
					<h1>
						<Image
							src='/images/top_logo.svg'
							width={480}
							height={480}
							alt='BOXロゴ'
							style={{ marginBottom: "32px" }}
						/>
					</h1>
					<div className={styles.msg}>
						<p style={{ textAlign: "center", lineHeight: "1.75" }}>
							ISSUNは、低身長でもファッションを楽しむためのアプリ。
							<br />
							ユニクロ、ZOZOTOWN、様々なアパレルの着用レビューを登録して、共有し、ファッションの幅を広げよう。
						</p>
						<p
							style={{
								textAlign: "center",
								lineHeight: "1.75",
								padding: "16px 0 16px",
							}}
						>
							小さくても、一寸法師のように強くありたい
						</p>
					</div>
				</div>
				<Sort className='mb-4' onChange={handleSortChange} />{" "}
				<section>
					<ul className={`flex justify-between flex-wrap ${styles.item_wrap}`}>
						{items.map((item) => (
							<li key={item.id} style={{ marginBottom: "20px" }}>
								<Link href={`/item/${item.id}`}>
									<div
										style={{
											backgroundImage: `url(${item.imageUrl})`,
											backgroundSize: "cover",
											backgroundPosition: "center",
											width: "100%",
											height: "280px",
											borderRadius: "8px",
										}}
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
