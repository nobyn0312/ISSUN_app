import { ReactNode } from "react";

type AreaProps = {
	children: ReactNode;
	className?: string;
	style?: React.CSSProperties;
};

export const ContentsAreaOrange: React.FC<AreaProps> = ({
	children,
	className,
	style,
}) => {
	return (
		<div
			style={{ maxWidth: "540px", margin: "0 auto", padding: "0", ...style }}
			className={`${className}`}
		>
			<div
				style={{ padding: "16px", background: "#FF5E2A", borderRadius: "10px" }}
			>
				{children}
			</div>
		</div>
	);
};

export const ContentsAreaGray: React.FC<AreaProps> = ({
	children,
	className,
	style,
}) => {
	return (
		<div
			style={{ maxWidth: "540px", margin: "0 auto", padding: "0", ...style }}
			className={`${className}`}
		>
			<div
				style={{
					padding: "16px",
					background: "#D9D9D9",
					borderRadius: "10px",
					color: "#333",
				}}
			>
				{children}
			</div>
		</div>
	);
};
