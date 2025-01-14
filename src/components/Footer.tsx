"use client";

import { Container } from "./Container";

const Footer = () => {
	return (
		<footer
			style={{
				borderTop: "2px solid rgb(255, 94, 42)",
				borderBottom: "2px solid rgb(255, 94, 42)",
			}}
		>
			<Container>
				<div style={{ padding: "16px" }}>
					<p style={{ color: "rgb(255, 94, 42)", textAlign: "center" }}>
						&copy;ISSUN 2024
					</p>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
