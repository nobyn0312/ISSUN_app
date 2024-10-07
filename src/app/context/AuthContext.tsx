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


interface UserProfile {
	username: string | null;
	userId: string | null;
	age: number | null;
	height: number | null;
	shape: string | null;
}


interface AuthContextType {
	user: User;
	username: string;
	userId: string | null;
	age: number;
	height: number;
	shape: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [userProfile, setUserProfile] = useState<UserProfile>({
		username: null,
		userId: "",
		age: 0,
		height: 0,
		shape: "",
	});

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
			if (currentUser) {
				setUser(currentUser);

				const authUid = currentUser.uid;
				const userDocRef = doc(firestore, "profile", authUid);
				const userDocSnap = await getDoc(userDocRef);

				if (userDocSnap.exists()) {
					const userData = userDocSnap.data();

					setUserProfile({
						username: userData.username || null,
						userId: userData.userId || authUid,
						age: userData.age || null,
						height: userData.height || null,
						shape: userData.shape || null,
					});

					console.log(
						"ログイン中:",
						currentUser.email,
						"ユーザーネーム:",
						userData.username,
						"年齢:",
						userData.age,
						"身長:",
						userData.height,
						"体型:",
						userData.shape,
						"Firestore のfirestore profileコレクションID:",
						userData.userId || authUid
					);
				} else {
					console.error("firestore profileコレクションにidがなし");
					console.log("Authentication の uid:", authUid);
				}
			} else {
				// ログアウト
				setUser(null);
				setUserProfile({
					username: null,
					userId: null,
					age: null,
					height: null,
					shape: null,
				});
				console.log("ログインしていません");
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ user, userProfile, setUserProfile }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("エラー");
	}
	return context;
};
