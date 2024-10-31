import { auth } from "@/firebase";
import Image from "next/image";
import { useAuthContext } from "@/app/context/AuthContext";
import { useState } from "react";
import SignOutButton from "./SignoutButton";

const UserInfo = () => {
	const defaultPhotoURL = "/images/defaultUser.svg";
	const photoURL = auth.currentUser?.photoURL || defaultPhotoURL;
	const { username } = useAuthContext();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { isLogin } = useAuthContext();

	function toggleLogin() {
		setIsOpen((prevState) => !prevState);
	}

	return (
		<>
			<div onClick={() => toggleLogin()}>
				{photoURL && (
					<div style={{ margin: "0 auto" }}>
						<Image
							src={photoURL}
							width={30}
							height={30}
							alt='ユーザーアイコン'
							className='rounded-full'
							style={{ display: "block", margin: "0 auto" }}
						/>
						<p style={{ fontSize: "10px", color: "black", paddingTop: "4px" }}>
							{isLogin ? username : "ゲストユーザー"}
						</p>
					</div>
				)}
			</div>

			{isOpen && (
				<div style={{ position: "absolute", right: "0", top: "70px" }}>
					<ul
						style={{
							width: "190px",
							height: "130px",
							backgroundColor: "#fff",
							padding: "10px",
							borderRadius: "5px",
						}}
					>
						<li
							style={{
								color: "#ff5e2a",
								fontWeight: "bold",
								padding: "15px 0",
								borderBottom: " 2px solid #ff5e2a",
							}}
						>
							<a href='/user/signIn'>ログイン / 新規登録</a>
						</li>
						<li
							style={{
								padding: "15px 0",
								color: "#ff5e2a",
								fontWeight: "bold",
							}}
						>
							<SignOutButton />
						</li>
					</ul>
				</div>
			)}
		</>
	);
};

export default UserInfo;
