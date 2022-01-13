import React from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
	banner: {
		backgroundImage: "url(./Images/banner2.jpg)",
		height: "100%",
		backgroundPosition: "35% 42%",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
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
	const classes = useStyles();

	return (
		<div className={classes.banner}>
			<Container className={classes.bannerContent}>
				<div className={classes.tagline}>
					<Typography variant="h2" style={{ fontWeight: "bold", marginBottom: 15, fontFamily: "Montserrat" }}>
						PaxCoins
					</Typography>
					<Typography variant="subtitle2" style={{ color: "darkgrey", textTransform: "capitalize", fontFamily: "Montserrat" }}>
						Get All the Info regarding your favorite crypto currency
					</Typography>
				</div>
				<Carousel />
			</Container>
		</div>
	);
};

export default Banner;
