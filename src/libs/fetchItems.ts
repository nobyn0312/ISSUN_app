// lib/fetchItems.ts
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase"; // 初期化されたfirestoreをインポート
import { enableIndexedDbPersistence } from "firebase/firestore";

// Item型を定義
export interface Item {
	id: string;
	category: string;
	createdAt: string;
	detail: string;
	imageUrl: string;
	name: string;
	price: number;
	url?: string | undefined;
}

// IndexedDBキャッシュを有効にする
enableIndexedDbPersistence(firestore).catch((err) => {
	if (err.code === "failed-precondition") {
		console.log("キャッシュが既に有効化されています");
	} else if (err.code === "unimplemented") {
		console.log("このブラウザではキャッシュがサポートされていません");
	}
});

export const fetchItems = async (): Promise<Item[]> => {
	const itemsCollection = collection(firestore, "item");
	const snapshot = await getDocs(itemsCollection);

	const itemsList: Item[] = snapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Item, "id">),
	}));

	return itemsList;
};
