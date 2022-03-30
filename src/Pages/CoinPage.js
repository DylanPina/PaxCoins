import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { CryptoState } from "../context/CryptoContext";
import { SingleCoin } from "../config/api";
import { Button, LinearProgress, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import CoinInfo from "../components/CoinInfo";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

function numberWithCommas(x) {
	x = Number(x).toFixed(2);
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberWithCommasNoDecimal(x) {
	x = Number(x).toFixed();
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinPage = () => {
	const { id } = useParams();
	const [coin, setCoin] = useState();

	const { currency, symbol, user, watchlist, setAlert } = CryptoState();

	const fetchCoin = async () => {
		const { data } = await axios.get(SingleCoin(id));
		setCoin(data);
	};

	const useStyles = makeStyles((theme) => ({
		container: {
			display: "flex",
			"@media (max-width: 1279.95px)": {
				flexDirection: "column",
				alignItems: "center",
			},
		},
		sidebar: {
			width: "30%",
			"@media (max-width: 1279.95px)": {
				width: "100%",
			},
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			marginTop: 25,
			borderRight: "2px solid grey",
		},
		heading: {
			fontWeight: "bold",
			marginBottom: 20,
			fontFamily: "Montserrat",
		},
		description: {
			width: "100%",
			fontFamily: "Montserrat",
			padding: 25,
			paddingBottom: 15,
			paddingTop: 0,
			textAlign: "justify",
		},
		marketData: {
			alignSelf: "start",
			padding: 25,
			paddingTop: 10,
			width: "100%",
			"@media (max-width: 1279.95px)": {
				display: "flex",
				justifyContent: "space-around",
			},
			'@media (max-width:959.95px)': {
				flexDirection: "column",
				alignItems: "center",
			},
			'@media (min-width:600px)': {
				alignItems: "start",
			},
		},
	}));

	useEffect(() => {
		fetchCoin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log(coin);

	const inWatchlist = watchlist.includes(coin?.id);

	const addToWatchlist = async () => {
		const coinRef = doc(db, "watchlist", user.uid);
		try {
			await setDoc(coinRef, { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] }, { merge: true });

			setAlert({
				open: true,
				message: `${coin.name} Added to the Watchlist !`,
				type: "success",
			});
		} catch (error) {
			setAlert({
				open: true,
				message: error.message,
				type: "error",
			});
		}
	};

	const removeFromWatchlist = async () => {
		const coinRef = doc(db, "watchlist", user.uid);
		try {
			await setDoc(coinRef, { coins: watchlist.filter((wish) => wish !== coin?.id) }, { merge: true });

			setAlert({
				open: true,
				message: `${coin.name} Removed from the Watchlist`,
				type: "success",
			});
		} catch (error) {
			setAlert({
				open: true,
				message: error.message,
				type: "error",
			});
		}
	};
	const classes = useStyles();

	if (!coin) return <LinearProgress style={{ backgroundColor: "rgba(139, 69, 255, 0.8)" }} />;

	return (
		<div className={classes.container}>
			<div className={classes.sidebar}>
				<img src={coin?.image.large} alt={coin?.name} height="200" style={{ marginBottom: 20, cursor: "pointer" }} onClick={() => window.open(`${coin.links?.homepage?.[0]}`)}/>
				<Typography variant="h3" className={classes.heading}>
					{coin?.name}
				</Typography>
				<Typography
					variant="subtitle1"
					className={classes.description}
					dangerouslySetInnerHTML={{ __html: coin?.description.en.split(". ")[0] }}
				></Typography>
				<div className={classes.marketData}>
					<span style={{ display: "flex" }}>
						<Typography variant="h5" className={classes.heading}>
							Rank:
						</Typography>
						&nbsp; &nbsp;
						<Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
							{coin?.market_cap_rank}
						</Typography>
					</span>
					<span style={{ display: "flex" }}>
						<Typography variant="h5" className={classes.heading}>
							Current Price:
						</Typography>
						&nbsp; &nbsp;
						<Typography
							variant="h5"
							style={{
								fontFamily: "Montserrat",
							}}
						>
							{symbol}
							{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
						</Typography>
					</span>
					<span style={{ display: "flex" }}>
						<Typography variant="h5" className={classes.heading}>
							Market Cap:
						</Typography>
						&nbsp; &nbsp;
						<Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
							{symbol}
							{numberWithCommasNoDecimal(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
						</Typography>
					</span>
					<span style={{ display: "flex" }}>
						<Typography variant="h5" className={classes.heading}>
							Total Volume:
						</Typography>
						&nbsp; &nbsp;
						<Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
							{symbol}
							{numberWithCommasNoDecimal(coin?.market_data.total_volume[currency.toLowerCase()].toString().slice(0, -6))}M
						</Typography>
					</span>
					{user && (
						<Button
							variant="outlined"
							style={{ width: "100%", height: 40, borderRadius: "50px", backgroundColor: inWatchlist ? "#ff0000" : "rgba(139, 69, 255, 0.8)", fontFamily: "Montserrat", fontWeight: 600}}
							onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
						>
							{inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
						</Button>
					)}
				</div>
			</div>
			<CoinInfo coin={coin} />
		</div>
	);
};

export default CoinPage;
