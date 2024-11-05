// components/SnackbarComponent.tsx

import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

type SnackbarProps = {
	message: string;
	isOpen?: boolean;
	onClose: () => void;
	severity?: "success" | "error" | "warning" | "info";
	duration?: number;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
	function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
	}
);

const SnackbarComponent: React.FC<SnackbarProps> = ({
	message,
	isOpen,
	onClose,
	severity = "info",
	duration = 3000,
}) => {
	return (
		<Snackbar
			open={isOpen}
			autoHideDuration={duration}
			onClose={onClose}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			sx={{ zIndex: 1300 }}
		>
			<Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default SnackbarComponent;
