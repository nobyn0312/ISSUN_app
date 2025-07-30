import { useState } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/lib/config/firebase";
import { useAuthContext } from "@/app/context/AuthContext";
import { useSearchParams } from "next/navigation";

export const useSubmitReview = () => {
	const { user, username } = useAuthContext();
	const searchParams = useSearchParams();
	const itemId = searchParams.get("itemId");

	const [title, setTitle] = useState("");
	const [rate, setRate] = useState("");
	const [size, setSize] = useState("");
	const [comment, setComment] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!user) {
			alert("ログインが必要です");
			return;
		}

		try {
			const docRef = await addDoc(collection(firestore, "review"), {
				uid: user.uid,
				username: username,
				itemId: itemId,
				title: title,
				rate: rate,
				size: size,
				comment: comment,
				createdAt: new Date(),
			});

			await updateDoc(doc(firestore, "review", docRef.id), {
				reviewId: docRef.id,
			});

			alert("レビューを送信しました");
			window.location.href = "/top";

			// フォームのリセット
			setTitle("");
			setRate("");
			setSize("");
			setComment("");
		} catch (error) {
			console.error(error);
			alert("レビューの送信に失敗しました");
		}
	};

	return {
		title,
		setTitle,
		rate,
		setRate,
		size,
		setSize,
		comment,
		setComment,
		handleSubmit,
	};
};
