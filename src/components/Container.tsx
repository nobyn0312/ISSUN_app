import React, { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export const Container = ({ children }: Props) => {
	const style = {
		maxWidth: "480px",
		margin: "0 auto",
	};

	return <div style={style}>{children}</div>;
};
