"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
// import { storage } from "@/firebase";
// import { ref, listAll, getDownloadURL } from "firebase/storage";
// import UserInfo from "@/components/UserInfo";
// import SignOutButton from "@/components/SignoutButton";
import Link from "next/link";
import Header from "@/components/Header";
import SelectCategory from "@/components/SelectCategory";

import { useParams } from "next/navigation";

import { fetchItems, Item } from "@/libs/fetchItems";

const TopPage = () => {
	// const [imageUrls, setImageUrls] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
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
									<h2>{item.name}</h2>
									<p>¥{item.price.toLocaleString()}</p>
									{/* <p>ID: {item.id}</p> */}
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
