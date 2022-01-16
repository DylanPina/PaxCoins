import { Box, Button, TextField } from "@material-ui/core";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

import { CryptoState } from "../../context/CryptoContext";
import { auth } from "../../firebase";

const Login = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { setAlert } = CryptoState();

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
			<Button variant="contained" size="large" style={{ backgroundColor: "rgba(139, 69, 255, 0.8)" }} onClick={handleSubmit}>
				Login
			</Button>
		</Box>
	);
};

export default Login;
