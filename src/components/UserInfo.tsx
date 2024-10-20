import { auth } from "@/firebase";
import Image from "next/image";

import { useAuthContext } from "@/app/context/AuthContext";
// import Link from "next/link";

const UserInfo = () => {
	const defaultPhotoURL = "/images/defaultUser.svg";

	const photoURL = auth.currentUser?.photoURL || defaultPhotoURL;
	const { username } = useAuthContext();

	return (
		<div>
			{photoURL && (
				<>
					<div style={{ margin: "0 auto" }}>
						<Image
							src={photoURL}
							width={24}
							height={24}
							alt='ユーザーアイコン'
							className='rounded-full'
							style={{ display: "block", margin: "0 auto" }}
						/>
						<p style={{ fontSize: "10px", color: "black" }}>{username}</p>
					</div>
				</>
			)}
		</div>
	);
};

export default UserInfo;
