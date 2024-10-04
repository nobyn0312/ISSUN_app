import { fetchItems, Item } from "@/libs/fetchItems";

// 特定のIDを持つアイテムを取得する関数
export const fetchItemDetail = (id: string): Promise<Item | null> => {
	return fetchItems()
		.then((items: Item[]) => {
			const item = items.find((item) => item.id === id) || null;
			return item; // 見つからない場合は null を返す
		})
		.catch((error) => {
			console.error("Error fetching item: ", error);
			return null;
		});
};
