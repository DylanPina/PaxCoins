import { makeStyles } from "@material-ui/core";

const SelectButton = ({ children, selected, onClick }) => {
	const useStyles = makeStyles({
		selectbutton: {
			border: "1px solid rgba(139, 69, 255, 0.8)",
			borderRadius: 5,
			padding: 10,
			paddingLeft: 20,
			paddingRight: 20,
			fontFamily: "Montserrat",
			cursor: "pointer",
			backgroundColor: selected ? "rgba(139, 69, 255, 0.8)" : "",
			color: selected ? "black" : "",
			fontWeight: selected ? 700 : 500,
			"&:hover": {
				backgroundColor: "rgba(139, 69, 255, 0.8)",
				color: "black",
			},
			width: "22%",
			//   margin: 5,
		},
	});

	const classes = useStyles();

	return (
		<span onClick={onClick} className={classes.selectbutton}>
			{children}
		</span>
	);
};

export default SelectButton;
