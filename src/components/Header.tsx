import Image from "next/image";
import Link from "next/link";
import React from "react";
import Hamburger from "./Hamburger";
import HamburgerMenu from "./Hamburger";
import UserInfo from "./UserInfo";

const Header = () => {
	return (
		<>
			<header className='' style={{ background: "#D9D9D9" }}>
				<div className='flex align-middle justify-between py-4'>
					<HamburgerMenu />

					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Link href='/'>
							<Image
								src='/images/headerLogo.svg'
								alt='ヘッダーロゴ'
								width={100}
								height={30}
							/>
						</Link>
					</div>

					<div style={{ paddingRight: "16px" }}>
						<UserInfo />
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
