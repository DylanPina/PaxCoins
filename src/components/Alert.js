import { Snackbar } from "@mui/material";
import React, { useState } from "react";
import { CryptoState } from "../context/CryptoContext";
import MuiAlert from '@mui/material/Alert';

const Alert = () => {
	const { alert, setAlert } = CryptoState();
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setAlert({
			open: false,
		});
	};

	return (
		<Snackbar open={alert.open} autoHideDuration={2500} onClose={handleClose}>
			<MuiAlert onClose={handleClose} elevation={10} variant="filled" severity={alert.type}>
				{alert.message}
			</MuiAlert>
		</Snackbar>
	);
};

export default Alert;
