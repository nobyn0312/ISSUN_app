import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export const Container = ({ children }: Props) => {
	const style = {
		maxWidth: "960px",
		margin: "0 auto",
	};

	return <div style={style}>{children}</div>;
};
