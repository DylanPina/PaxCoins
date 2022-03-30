import React, { useState } from "react";

import { CryptoState } from "../../context/CryptoContext";
import { Box, Button, TextField } from "@mui/material";
import {makeStyles} from "@mui/styles";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const useStyles = makeStyles((theme) => ({
	signUp: {
		height: "5%",
		width: "80%",
		margin: "0 auto",
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


const Signup = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { setAlert } = CryptoState();

	const classes = useStyles();

	const handleSubmit = async () => {
		if (password !== confirmPassword) {
			setAlert({
				open: true,
				message: "Passwords do not match",
				type: "error",
			});
			return;
		}

		try {
			const result = await createUserWithEmailAndPassword(auth, email, password);

			console.log(result);

			setAlert({
				open: true,
				message: `Sign Up Successful, Welcome ${result.user.email}`,
			});

			props.handleClose();
		} catch (error) {
			setAlert({
				open: true,
				message: error.message,
				type: "error",
			});
			return;
		}
	};

	return (
		<Box p={3} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
			<TextField variant="outlined" type="email" label="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
			<TextField variant="outlined" type="password" label="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
			<TextField
				variant="outlined"
				type="password"
				label="Confirm Password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				fullWidth
			/>
			<Button variant="contained" size="large" className={classes.signUp} onClick={handleSubmit}>
				Sign up
			</Button>
		</Box>
	);
};

export default Signup;
