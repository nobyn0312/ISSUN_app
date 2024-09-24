import React from "react";

type ButtonProps = {
	onClick?: () => void;
	children: React.ReactNode;
	className?: string; // 追加のクラスを受け取る
	type?: "button" | "submit" | "reset"; // typeプロパティを追加
	style?: React.CSSProperties; // styleをpropsとして追加
};

export const PrimaryButton: React.FC<ButtonProps> = ({
	onClick,
	children,
	className,
	style,
	type = "button",
}) => {
	return (
		<button
			onClick={onClick}
			className={`text-white font-bold rounded-full block w-full text-center p-3  ${className}`}
			style={{
				background: "#FF5E2A",
				maxWidth: "320px",
				height: "50px",
				...style,
			}}
		>
			{children}
		</button>
	);
};

export const SecondaryButton: React.FC<ButtonProps> = ({
	onClick,
	children,
	className,
	style,
	type = "button",
}) => {
	return (
		<button
			onClick={onClick}
			className={`font-bold rounded-full block w-full text-center p-3 bg-white ${className}`}
			style={{
				color: "#FF5E2A",
				border: "#FF5E2A solid 2px",
				maxWidth: "320px",
				height: "50px",
				...style,
			}}
		>
			{children}
		</button>
	);
};
