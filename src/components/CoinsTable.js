import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../context/CryptoContext";
import {
	makeStyles,
	createTheme,
	ThemeProvider,
	Container,
	Typography,
	TextField,
	TableContainer,
	LinearProgress,
	Table,
	TableRow,
	TableHead,
	TableCell,
	TableBody,
} from "@material-ui/core";
import { numberWithCommas } from "./Banner/Carousel";

const CoinsTable = () => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("");

	const navigate = useNavigate();

	const { currency, symbol } = CryptoState();

	const useStyles = makeStyles(() => ({}));

	const classes = useStyles();

	const fetchCoins = async () => {
		setLoading(true);

		const { data } = await axios.get(CoinList(currency));

		setCoins(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchCoins();
	}, [currency]);

	const darkTheme = createTheme({
		palette: {
			primary: {
				main: "#fff",
			},
			type: "dark",
		},
	});

	const searchHandler = (e) => {
		setSearch(e.target.value);
	};

	const handleSearch = () => {
		return coins.filter((coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search));
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<Container style={{ textAlign: "center" }}>
				<Typography variant="h4" style={{ margin: 18, fontFamily: "Montserrat" }}>
					Cryptocurrency Prices by Market Cap
				</Typography>

				<TextField label="Search For a Crypto Currency.." variant="outlined" style={{ marginBottom: 20, width: "100%" }} onChange={searchHandler} />
				<TableContainer>
					{loading ? (
						<LinearProgress style={{ background: "gold" }} />
					) : (
						<Table>
							<TableHead style={{ backgroundColor: "rgba(139, 69, 255, 0.8)" }}>
								<TableRow>
									{["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
										<TableCell
											style={{ color: "black", fontWeight: "700", fontFamily: "Montserrat" }}
											key={head}
											align={head === "Coin" ? "" : "right"}
										>
											{head}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{handleSearch().map((row) => {
									const profit = row.price_change_percentage_24h > 0;

									return (
										<TableRow onClick={() => navigate(`/coins/${row.id}`)} className={classes.row} key={row.name}>
											<TableCell component="th" scope="row" styles={{ display: "flex", gap: 15 }}>
												<img src={row?.image} alt={row.name} height="50" style={{ marginBottom: 10 }} />
												<div style={{ display: "flex", flexDirection: "column" }}>
													<span style={{ textTransform: "uppercase", fontSize: 22 }}>{row.symbol}</span>
													<span style={{ color: "darkgrey" }}>{row.name}</span>
												</div>
											</TableCell>
											<TableCell align="right">
												{symbol}
												{numberWithCommas(row.current_price.toFixed(2))}
											</TableCell>
											<TableCell align="right" style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500 }}>
												{profit && "+"}
												{numberWithCommas(row.price_change_percentage_24h.toFixed(2))}%
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					)}
				</TableContainer>
			</Container>
		</ThemeProvider>
	);
};

export default CoinsTable;
