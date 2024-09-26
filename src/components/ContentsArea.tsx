import React, { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

const ContentsArea = ({children}:Props) => {
	return (
		<>
			<div style={{ borderRadius: "8px", background: "#FF5E2A",padding:"16px" }}>
				{children}
			</div>
		</>
	);
};

export default ContentsArea;
