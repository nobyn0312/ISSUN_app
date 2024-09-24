"use client";

import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { auth, firestore } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
	user: string | null;
	username: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<string | null>(null);
	const [username, setUsername] = useState<string | null>(null);

	useEffect(() => {
		// Firebase Authの状態を監視
		const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
			if (currentUser) {
				const userEmail = currentUser.email;
				setUser(userEmail);


				const userDocRef = doc(firestore, "profile", currentUser.uid);
				const userDocSnap = await getDoc(userDocRef);

				if (userDocSnap.exists()) {
					const userData = userDocSnap.data(); // Firestoreから取得したデータ
					setUsername(userData?.username); // Firestoreのusernameを設定
					console.log(
						"ログイン中:",
						userEmail,
						"ユーザーネーム:",
						userData?.username
					);
				} else {
					console.error("ユーザーデータが存在しません");
				}
			} else {
				setUser(null);
				setUsername(null);
				console.log("ログインしていません");
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ user, username }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error(
			"useAuthContext must be used within an AuthContextProvider"
		);
	}
	return context;
};
