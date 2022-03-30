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
import { Pagination } from "@material-ui/lab";

export function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);

	const navigate = useNavigate();

	const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

	const useStyles = makeStyles(() => ({
		row: {
			backgroundColor: "#16171a",
			cursor: "pointer",
			"&:hover": {
				backgroundColor: "#131111",
			},
			fontFamily: "Montserrat",
		},
		pagination: {
			"& .MuiPaginationItem-root": {
				color: "rgba(139, 69, 255, 0.8)",
			},
		},
	}));

	const classes = useStyles();

	useEffect(() => {
		fetchCoins();
		console.log("Coins fetched: ", coins);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

	const alignTableCells = (head) => {
		if (head === "Name") {
			return "left";
		} else if (head === "Rank") {
			return "left";
		} else {
			return "right";
		}
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
						<LinearProgress style={{ background: "rgba(139, 69, 255, 0.8)" }} />
					) : (
						<Table>
							<TableHead style={{ backgroundColor: "rgba(139, 69, 255, 0.8)" }}>
								<TableRow>
									{["Rank", "Name", "Price", `24h Change`, "Market Cap", "High (24h)", "Low (24h)"].map((head) => (
										<TableCell style={{ color: "black", fontWeight: "700", fontFamily: "Montserrat" }} key={head} align={alignTableCells(head)}>
											{head}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{handleSearch()
									.slice((page - 1) * 10, (page - 1) * 10 + 10)
									.map((row) => {
										const profit = row.price_change_percentage_24h > 0;

										return (
											<TableRow onClick={() => navigate(`/coins/${row.id}`)} className={classes.row} key={row.name}>
												<TableCell align="left" style={{ fontFamily: "Montserrat", fontSize: 20 }}>
													#{row.market_cap_rank}
												</TableCell>
												<TableCell component="th" scope="row" style={{ display: "flex", gap: 15 }}>
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
													<br />
													{profit ? "+" : "-"}{symbol}{Math.abs(row.price_change_24h.toFixed(5))}
												</TableCell>
												<TableCell align="right">
													{symbol}
													{numberWithCommas(row.market_cap.toString().slice(0, -6))}M
												</TableCell>
												<TableCell align="right">
													{symbol}
													{numberWithCommas(row.high_24h.toFixed(2))}
												</TableCell>
												<TableCell align="right">
													{symbol}
													{numberWithCommas(row.low_24h.toFixed(2))}
												</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					)}
				</TableContainer>
				<Pagination
					style={{
						padding: 20,
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
					classes={{ ul: classes.pagination }}
					count={(handleSearch()?.length / 10).toFixed(0)}
					onChange={(_, value) => {
						setPage(value);
						window.scroll(0, 600);
					}}
				/>
			</Container>
		</ThemeProvider>
	);
};

export default CoinsTable;
