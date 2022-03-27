import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { AppBar, Box, Button, Tab, Tabs } from "@material-ui/core";
import Login from "./Login";
import Signup from "./Signup";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../context/CryptoContext";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		width: 400,
		backgroundColor: "#14161a",
		color: "white",
		borderRadius: 10,
	},
	google: {
		padding: 24,
		paddingTop: 0,
		display: "flex",
		flexDirection: "column",
		textAlign: "center",
		gap: 20,
		fontSize: 20,
	},
	orContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	orText: {
		fontFamily: "Montserrat",
		fontSize: 16,
		fontWeight: 600,
		margin: " 0px 10px",

	},
	lineStroke: {
		width: "40%",
		height: ".5px",
		backgroundColor: "white"
	}
}));

const AuthModal = () => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState();

	const { setAlert } = CryptoState();

	const classes = useStyles();

	const handleOpen = () => {
		setOpen(true);
		setValue(0);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const googleProvider = new GoogleAuthProvider();

	const signInWithGoogle = () => {
		signInWithPopup(auth, googleProvider)
			.then((res) => {
				setAlert({
					open: true,
					message: `Sign up successful, welcome ${res.user.email}`,
					type: "success",
				});

				handleClose();
			})
			.catch((error) => {
				setAlert({
					open: true,
					message: error.message,
					type: "error",
				});
				return;
			});
	};

	return (
		<div>
			<Button variant="contained" style={{ width: 85, height: 40, fontFamily: "Montserrat", fontWeight: 600, backgroundColor: "rgba(139, 69, 255, 0.8)" }} onClick={handleOpen}>
				Login
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<AppBar position="static" style={{ backgroundColor: "transparent", color: "white" }}>
							<Tabs value={value} onChange={handleChange} variant="fullWidth" indicatorColor="primary" style={{ borderRadius: 10 }}>
								<Tab label="Login" />
								<Tab label="Sign up" />
							</Tabs>
						</AppBar>
						{value === 0 && <Login handleClose={handleClose} />}
						{value === 1 && <Signup handleClose={handleClose} />}
						<Box className={classes.google}>
							<div className={classes.orContainer}>
								<div className={classes.lineStroke}/>
								<span className={classes.orText}>OR</span>
								<div className={classes.lineStroke}/>
							</div>
							<GoogleButton style={{ width: "100%", outline: "none" }} onClick={signInWithGoogle} />
						</Box>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default AuthModal;
