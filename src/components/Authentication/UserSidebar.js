import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { CryptoState } from "../../context/CryptoContext";
import { Avatar, Button } from "@material-ui/core";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../CoinsTable";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

const useStyles = makeStyles({
	container: {
		width: 350,
		padding: 25,
		height: "100%",
		display: "flex",
		flexDirection: "column",
		fontFamily: "monoscape",
	},
	profile: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "20px",
		height: "92%",
	},
	picture: {
		width: 200,
		height: 200,
		cursor: "pointer",
		backgroundColor: "rgba(139, 69, 255, 0.8)",
		objectFit: "contain",
	},
	logout: {
		height: "5%",
		width: "100%",
		backgroundColor: "rgba(139, 69, 255, 0.8)",
		marginTop: 20,
	},
	watchlist: {
		flex: 1,
		width: "100%",
		backgroundColor: "grey",
		borderRadius: 10,
		padding: 15,
		paddingTop: 10,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: 12,
		overflowY: "scroll",
	},
	coin: {
		padding: 10,
		borderRadius: 5,
		color: "black",
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "rgba(139, 69, 255, 0.8)",
		boxShadow: "0 0 3px black",
	},
});

const UserSidebar = () => {
	const [state, setState] = useState({
		right: false,
	});

	const { user, setAlert, watchlist, coins, symbol } = CryptoState();

	console.log(coins);

	const classes = useStyles();

	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const logOut = () => {
		signOut(auth);

		setAlert({
			open: true,
			type: "success",
			message: "Logout Successful!",
		});

		toggleDrawer();
	};

	const removeFromWatchlist = async (coin) => {
		const coinRef = doc(db, "watchlist", user.uid);
		try {
			await setDoc(coinRef, { coins: watchlist.filter((wish) => wish !== coin?.id) }, { merge: true });

			setAlert({
				open: true,
				message: `${coin.name} Removed from the Watchlist !`,
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

	return (
		<div>
			{["right"].map((anchor) => (
				<React.Fragment key={anchor}>
					<Avatar
						onClick={toggleDrawer(anchor, true)}
						style={{ height: 38, width: 38, cursor: "pointer", backgroundColor: "rgba(139, 69, 255, 0.8)" }}
						src={user.photoURL}
						alt={user.displayName || user.email}
					/>
					<Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
						<div className={classes.container}>
							<div className={classes.profile}>
								<Avatar className={classes.picture} src={user.photoURL} alt={user.displayName || user.email} />
								<span style={{ width: "100%", fontSize: 25, textAlign: "center", fontWeight: "bolder", wordWrap: "break-word" }}>
									{user.displayName || user.email}
								</span>
								<div className={classes.watchlist}>
									<span style={{ fontSize: 20, textShadow: "0 0 5px black" }}>Watch list</span>
									{coins.map((coin) => {
										if (watchlist.includes(coin.id))
											return (
												<div className={classes.coin}>
													<span>{coin.name}</span>
													<span style={{ display: "flex", gap: 8 }}>
														{symbol} {numberWithCommas(coin.current_price.toFixed(2))}
														<AiFillDelete style={{ cursor: "pointer" }} fontSize="16" onClick={() => removeFromWatchlist(coin)} />
													</span>
												</div>
											);
										else return <></>;
									})}
								</div>
							</div>
							<Button variant="container" className={classes.logout} onClick={logOut}>
								Log out
							</Button>
						</div>
					</Drawer>
				</React.Fragment>
			))}
		</div>
	);
};

export default UserSidebar;