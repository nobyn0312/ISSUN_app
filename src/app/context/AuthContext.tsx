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
import { User } from "firebase/auth";

interface AuthContextType {
	user: User | null;
	username: string | null;
	userId: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [username, setUsername] = useState<string | null>(null);

	//userのuid
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
			if (currentUser) {
				setUser(currentUser);

				const authUid = currentUser.uid;
				setUserId(authUid);

				const userDocRef = doc(firestore, "profile", authUid);
				const userDocSnap = await getDoc(userDocRef);

				if (userDocSnap.exists()) {
					const userData = userDocSnap.data();
					setUsername(userData?.username);
					if (userData?.userId) {
						setUserId(userData.userId);
					}
					console.log(
						"ログイン中:",
						currentUser.email,
						"ユーザーネーム:",
						userData?.username,
						"Firestore のユーザーID:",
						userData?.userId || authUid
					);
				} else {
					console.error("ユーザーデータが存在しません");
					console.log("Authentication の uid:", authUid);
				}
			} else {
				// ユーザーがログアウト
				setUser(null);
				setUsername(null);
				setUserId(null);
				console.log("ログインしていません");
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ user, username, userId }}>
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
