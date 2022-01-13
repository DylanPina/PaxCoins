import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import "./App.css";
import CoinPage from "./Pages/CoinPage";
import HomePage from "./Pages/HomePage";
import { makeStyles } from "@material-ui/core/styles";

function App() {
	const useStyles = makeStyles(() => ({
		App: {
			backgroundColor: "#14161a",
			color: "white",
			minHeight: "100vh",
		},
	}));

	const classes = useStyles();
	return (
		<React.Fragment>
			<div className={classes.App}>
				<Header />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/coins/:id" element={<CoinPage />} />
				</Routes>
			</div>
		</React.Fragment>
	);
}

export default App;
