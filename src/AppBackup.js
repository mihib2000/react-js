import React, { useState, useRef, useEffect } from "react";
import ConvertHistory from "./ConvertHistory";
import { v4 as uuidv4 } from "uuid";
import SelectCurrency from "./SelectCurrency";
import { Button } from "@material-ui/core";

function App() {
	const [ConversionHistory, setConversionHistory] = useState([]);
	const convAmountRef = useRef();
	const [base, setBase] = useState("");
	const [end, setEnd] = useState("");

	const LOCAL_STORAGE_KEY = "ConversionApp.ConversionHistory";
	const getSelectedBase = (base) => {
		setBase(base);
	};

	const getSelectedEnd = (end) => {
		setEnd(end);
	};

	useEffect(() => {
		const storedHistory = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
		if (storedHistory) setConversionHistory(storedHistory);
	}, []);

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ConversionHistory));
	}, [ConversionHistory]);

	function handleConvert(e) {
		let amount = convAmountRef.current.value;
		const baseURL = "https://api.exchangeratesapi.io/latest?";
		//base = base + "EUR".repeat(!Boolean(base));
		//end = end + "USD".repeat(!Boolean(end));
		amount = !Boolean(amount) + Number(amount);

		fetch(baseURL + "symbols=" + end + "&base=" + base)
			.then((response) => response.json())
			.then((data) => {
				setConversionHistory((prevHistory) => {
					return [{ id: uuidv4(), base: base, amount: amount, end: end, rate: data.rates[end], date: Date().toLocaleString() }, ...prevHistory];
				});
			});
	}

	return (
		<>
			<h1>Currency Convertor</h1>

			<SelectCurrency callback={getSelectedBase} />
			<input ref={convAmountRef} type="number" min="0" placeholder="Amount" />
			<SelectCurrency callback={getSelectedEnd} />
			{/* <button onClick={handleConvert}>Convert!</button> */}
			<Button variant="contained" color="primary" size="small" onClick={handleConvert} disableElevation>
				My first button
			</Button>
			<h2>Results</h2>
			<table>
				<tr>
					<th>Base</th>
					<th>End</th>
					<th>Amount</th>
					<th>Rate</th>
					<th>Result</th>
					<th>Date</th>
				</tr>
				<ConvertHistory history={ConversionHistory} />
			</table>
		</>
	);
}

export default App;
