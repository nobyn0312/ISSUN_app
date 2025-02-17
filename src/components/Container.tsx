import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export const Container = ({ children }: Props) => {
	const style = {
		maxWidth: "960px",
		margin: "0 auto",
		borderRight: "2px solid rgb(255, 94, 42)",
		borderLeft: "2px solid rgb(255, 94, 42)",
	};

	return <div style={style}>{children}</div>;
};
