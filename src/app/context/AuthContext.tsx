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
	user: User | null;
	isLogin: boolean;
	username: string | null;
	userId: string | null;
	age: number | null;
	height: number | null;
	shape: string | null;
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
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				isLogin: user !== null,
				username: userProfile.username,
				userId: userProfile.userId,
				age: userProfile.age,
				height: userProfile.height,
				shape: userProfile.shape,
			}}
		>
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
