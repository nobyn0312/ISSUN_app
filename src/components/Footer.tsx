"use client";

import { Container } from "./Container";

const Footer = () => {
	return (
		<Container>
			<footer>
				<div style={{ background: "#D9D9D9", padding: "16px" }}>
					<p style={{ color: "#333333", textAlign: "center" }}>
						&copy;ISSUN 2024
					</p>
				</div>
			</footer>
		</Container>
	);
};

export default Footer;
