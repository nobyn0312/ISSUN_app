import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase";
import mockData from "@/mockdata.json"; // ルートがsrcの場合 "@/mockdata.json"でアクセス

// Item型を定義
export interface Item {
	id: string;
	category: string;
	createdAt?: string;
	detail: string;
	imageUrl: string;
	name: string;
	price: number;

	url?: string | undefined;
}

// export const fetchItems = async (): Promise<Item[]> => {
// 	const itemsCollection = collection(firestore, "item");
// 	const snapshot = await getDocs(itemsCollection);

// 	const itemsList: Item[] = snapshot.docChanges().map((change) => ({
// 		id: change.doc.id,
// 		...(change.doc.data() as Omit<Item, "id">),
// 	}));

// 	return itemsList;
// };



export const fetchItems = async (): Promise<Item[]> => {
	// mockdata.jsonのデータをそのまま返す
	const itemsList: Item[] = mockData.map((item) => ({
		...item,
		price: Number(item.price), // priceを数値に変換
	}));

	return itemsList;
};