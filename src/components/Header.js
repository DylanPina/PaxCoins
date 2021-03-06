import React from "react";

import { useNavigate } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";
import { AppBar, Container, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider } from "@material-ui/core";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";

import { ReactComponent as Logo } from "../assets/PAX_Logo.svg";

const useStyles = makeStyles(() => ({
	title: {
		flex: 1,
		color: "rgba(139, 69, 255, 0.8)",
		fontFamily: "Montserrat",
		fontWeight: "bold",
		cursor: "pointer",
	},
	logo: {
		height: "1.5rem",
		width: "1.5rem",
		margin: ".5rem",
	},
}));

const Header = () => {
	const classes = useStyles();
	const navigate = useNavigate();

	const { currency, setCurrency, user, symbol } = CryptoState();

	const darkTheme = createTheme({
		palette: {
			primary: {
				main: "#fff",
			},
			type: "dark",
		},
	});

	const homePageRoute = () => {
		navigate("/");
	};

	const setCurrencyHandler = (e) => {
		setCurrency(e.target.value);
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<AppBar color="transparent" position="static">
				<Container>
					<Toolbar>
						<Logo className={classes.logo} onClick={homePageRoute} style={{ cursor: "pointer" }} />
						<Typography onClick={homePageRoute} className={classes.title} variant="h6">
							PaxCoins
						</Typography>
						<Select
							variant="outlined"
							style={{
								width: 100,
								height: 40,
								marginRight: 15,
								color: "white",
								fontFamily: "Montserrat",
								backgroundColor: "transparent",
							}}
							value={currency}
							onChange={setCurrencyHandler}
						>
							<MenuItem value={"USD"} style={{ fontFamily: "Montserrat" }}>
								USD $
							</MenuItem>
							<MenuItem value={"EUR"} style={{ fontFamily: "Montserrat" }}>
								EUR €
							</MenuItem>
						</Select>
						{user ? <UserSidebar /> : <AuthModal />}
					</Toolbar>
				</Container>
			</AppBar>
		</ThemeProvider>
	);
};

export default Header;
