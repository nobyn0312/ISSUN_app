// lib/fetchItems.ts
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase";

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


export const fetchItems = async (): Promise<Item[]> => {
	const itemsCollection = collection(firestore, "item");
	const snapshot = await getDocs(itemsCollection);

	const itemsList: Item[] = snapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Item, "id">),
	}));

	return itemsList;
};
