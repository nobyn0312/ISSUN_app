// hooks/useUploadFile.ts
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firestore, storage } from "@/firebase";
import { v4 as uuidv4 } from "uuid";

interface UploadFileHook {
	progress: number;
	loading: boolean;
	uploadFile: (file: File, data: any) => Promise<void>;
}

export const useUploadFile = (): UploadFileHook => {
	const [progress, setProgress] = useState(0);
	const [loading, setLoading] = useState(false);

	const uploadFile = async (file: File, data: any) => {
		setLoading(true);
		const storageRef = ref(storage, "images/" + file.name);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progressPercent =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProgress(progressPercent);
			},
			(err) => {
				console.error(err);
				setLoading(false);
			},
			async () => {
				const downloadURL = await getDownloadURL(storageRef);
				await addDoc(collection(firestore, "item"), {
					...data,
					id: uuidv4(),
					imageUrl: downloadURL,
					createdAt: Timestamp.now(),
				});
				setLoading(false);
			}
		);
	};

	return { progress, loading, uploadFile };
};
