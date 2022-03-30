import React, { useState } from "react";
import { Box, Button, TextField} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { signInWithEmailAndPassword } from "firebase/auth";

import { CryptoState } from "../../context/CryptoContext";
import { auth } from "../../firebase";

const useStyles = makeStyles((theme) => ({
	login: {
		height: "5%",
		width: "80%",
		margin: "0px auto",
		backgroundColor: "rgba(139, 69, 255, 0.8)",
		boxShadow: "0 0 10px rgb(13, 13, 13, 0.8)",
		borderRadius: 100,
		fontFamily: "Montserrat",
		fontSize: 16,
		fontWeight: 700,
		"&:hover": {
			backgroundColor: "rgba(139, 69, 255, 0.8)",
			boxShadow: "0 0 10px rgb(13, 13, 13, 1)",
		},
	},
}));

const Login = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { setAlert } = CryptoState();

	const classes = useStyles();

	const handleSubmit = async () => {
		if (!email || !password) {
			setAlert({
				open: true,
				message: "Please fill all the required fields",
				type: "error",
			});
			return;
		}

		try {
			const result = await signInWithEmailAndPassword(auth, email, password);

			setAlert({
				open: true,
				message: `Sign up successful, welcome ${result.user.email}`,
				type: "success",
			});

			props.handleClose();
		} catch (error) {
			setAlert({
				open: true,
				message: error.message,
				type: "error",
			});
		}
	};

	return (
		<Box p={3} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
			<TextField variant="outlined" type="email" label="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
			<TextField variant="outlined" type="password" label="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
			<Button variant="contained" size="large" className={classes.login} onClick={handleSubmit}>
				Login
			</Button>
		</Box>
	);
};

export default Login;
