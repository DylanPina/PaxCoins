import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

import CryptoContext from "./context/CryptoContext";

ReactDOM.render(
	<BrowserRouter>
		<CryptoContext>
			<App />
		</CryptoContext>
	</BrowserRouter>,
	document.getElementById("root")
);
