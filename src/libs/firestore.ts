// src/libs/firestore.ts

// import { firestore } from "@/firebase";
// import { collection, getDocs } from "firebase/firestore";

// export const fetchItems = async () => {
// 	try {
// 		const querySnapshot = await getDocs(collection(firestore, "item"));
// 		const items = querySnapshot.docs.map((doc) => ({
// 			id: doc.id,
// 			...doc.data(),
// 		}));
// 		return items;
// 	} catch (error) {
// 		console.error("Error fetching items: ", error);
// 		return [];
// 	}
// };
