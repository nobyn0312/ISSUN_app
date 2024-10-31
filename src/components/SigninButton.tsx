import { auth, provider, firestore } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // getDocを追加
import Image from "next/image";

function SigninButton() {
	const signInWithGoogle = async () => {
		try {
			if (typeof window !== "undefined") {
				const result = await signInWithPopup(auth, provider);
				const user = result.user;
				const userDocRef = doc(firestore, "profile", user.uid);

				// 既存データがあるか確認
				const userDocSnapshot = await getDoc(userDocRef);

				// データが存在しない場合にのみ新規作成
				if (!userDocSnapshot.exists()) {
					await setDoc(userDocRef, {
						uid: user.uid,
						email: user.email || "No Email",
						password: "",
						username: user.displayName || "",
						age: "",
						height: 0,
						shape: "",
					});
					console.log(user.displayName);
				} else {
					console.log("既に存在します");
				}
			}
		} catch (error) {
			console.error("Google ログインエラー:");
		}
	};

	return (
		<>
			<button onClick={signInWithGoogle} style={{ color: "#ff5e2a" }}>
				<span className='flex'>
					<Image
						style={{ marginRight: "8px" }}
						src='/images/google_icon.svg'
						width={20}
						height={20}
						alt='googleアイコン'
					/>
					Googleログイン / 新規登録
				</span>
			</button>
		</>
	);
}

export default SigninButton;
