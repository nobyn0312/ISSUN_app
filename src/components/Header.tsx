import Image from "next/image";
import Link from "next/link";
import HamburgerMenu from "./Hamburger";
import UserInfo from "./Userinfo/UserInfo";
import { Container } from "./Container";

const Header = () => {
	return (
		<>
			<header
				className=''
				style={{
					borderTop: "2px solid rgb(255, 94, 42)",
					borderBottom: "2px solid rgb(255, 94, 42)",
					position: "relative",
				}}
			>
				<Container>
					<div
						className='flex align-middle justify-between py-4'
						style={{ height: "70px" }}
					>
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
									src='/images/headerLogo2.svg'
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
				</Container>
			</header>
		</>
	);
};

export default Header;
