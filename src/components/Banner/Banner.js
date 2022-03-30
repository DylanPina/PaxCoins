import React from "react";

import { Container, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { CryptoState } from "../../context/CryptoContext";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
	banner: {
		backgroundImage: "url(./assets/banner2.jpg)",
		height: "100%",
		backgroundPosition: "35% 42%",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
	},
	loginBlock: {
		opacity: "0.9",
		height: "30px",
		backgroundColor: "rgba(139, 69, 255, 0.8)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	bannerContent: {
		height: 400,
		display: "flex",
		flexDirection: "column",
		paddingTop: 25,
		justifyContent: "space-around",
	},
	tagline: {
		display: "flex",
		height: "40%",
		flexDirection: "column",
		justifyContext: "center",
		textAlign: "center",
	},
}));

const Banner = () => {
	const { user } = CryptoState();

	const classes = useStyles();

	return (
		<div className={classes.banner}>
			{!user && <div className={classes.loginBlock}>Sign in to add coins to your watchlist!</div>}
			<Container className={classes.bannerContent}>
				<div className={classes.tagline}>
					<Typography variant="h2" style={{ fontWeight: "bold", marginBottom: 15, fontFamily: "Montserrat", textShadow: "5px 5px 10px black" }}>
						PaxCoins
					</Typography>
					<Typography
						variant="h5"
						style={{ color: "white", fontFamily: "Montserrat", textShadow: "5px 5px 10px black" }}
					>
						All the latest information on top crypto currencies
					</Typography>
				</div>
				<Carousel />
			</Container>
		</div>
	);
};

export default Banner;
