import React, { useState } from "react";

import { CryptoState } from "../../context/CryptoContext";
import { Box, Button, TextField } from "@material-ui/core";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { setAlert } = CryptoState();

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
			<Button variant="contained" size="large" style={{ backgroundColor: "rgba(139, 69, 255, 0.8)" }} onClick={handleSubmit}>
				Sign up
			</Button>
		</Box>
	);
};

export default Signup;
