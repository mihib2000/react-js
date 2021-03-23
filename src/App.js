import React, { useState, useRef, useEffect } from "react";
import ConvertHistory from "./ConvertHistory";
import { v4 as uuidv4 } from "uuid";
import SelectCurrency from "./SelectCurrency";
import {
	Snackbar,
	Typography,
	Input,
	makeStyles,
	styled,
	Button,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Card,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
const StyledTableHead = styled(TableHead)({
	background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
});
const default_base = "USD";
const default_end = "EUR";
const useStyles = makeStyles({
	head: {
		"& th": {
			color: "black",
			fontWeight: "bold",
			fontSize: "1rem",
		},
	},
	tabel: {
		width: "100%",
	},
	container: {
		width: "80%",
		margin: "0 auto",
	},
	inputs: {
		textAlign: "center",
	},
});

function App() {
	const [ConversionHistory, setConversionHistory] = useState([]);
	const convAmountRef = useRef();
	const [base, setBase] = useState(default_base);
	const [end, setEnd] = useState(default_end);
	const [amount, setAmount] = useState(1);
	const [alerta, setAlerta] = useState(false);

	const LOCAL_STORAGE_KEY = "ConversionApp.ConversionHistory";
	const classes = useStyles();
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
	function popAlert() {
		setAlerta(true);
		setTimeout(() => {
			setAlerta(false);
		}, 2000);
	}
	function handleConvert(e) {
		const baseURL = "https://api.exchangeratesapi.io/latest?";
		setAmount(!Boolean(amount) + Number(amount));

		if (base === end) {
			popAlert();
			setConversionHistory((prevHistory) => {
				return [{ id: uuidv4(), base: base, amount: amount, end: end, rate: 1, date: Date().toLocaleString() }, ...prevHistory];
			});
		} else {
			fetch(baseURL + "symbols=" + end + "&base=" + base)
				.then((response) => response.json())
				.then((data) => {
					popAlert();
					setConversionHistory((prevHistory) => {
						return [{ id: uuidv4(), base: base, amount: amount, end: end, rate: data.rates[end], date: Date().toLocaleString() }, ...prevHistory];
					});
				})
				.catch((error) => alert("A intervenit o eroare, va rugam reincercati!"));
		}
	}

	return (
		<>
			<Typography component="div" className={classes.container}>
				<h1 style={{ textAlign: "center" }}>Currency Convertor</h1>
				<Typography component="div" className={classes.inputs}>
					<SelectCurrency def={default_base} callback={getSelectedBase} />
					<Input
						style={{ minWidth: "300px", minHeight: "50px", fontSize: "1.3rem" }}
						placeholder="Amount"
						inputref={convAmountRef}
						type="number"
						defaultValue="1"
						onChange={(e) => {
							setAmount(e.target.value);
						}}
					></Input>
					<SelectCurrency def={default_end} callback={getSelectedEnd} />
					<Button variant="contained" color="primary" size="small" onClick={handleConvert} disableElevation>
						Convert
					</Button>
				</Typography>
				<h2 style={{ textAlign: "center" }}>Results</h2>
				<Snackbar anchorOrigin={{ vertical: "top", horizontal: "left" }} open={alerta}>
					<Alert variant="filled" severity="success">
						Datele au fost introduse cu succes !
					</Alert>
				</Snackbar>
				<TableContainer component={Card} elevation={3}>
					<Table aria-label="simple table" className={classes.tabel}>
						<StyledTableHead>
							<TableRow className={classes.head}>
								<TableCell>Base</TableCell>
								<TableCell>End</TableCell>
								<TableCell>Amount</TableCell>
								<TableCell>Rate</TableCell>
								<TableCell>Result</TableCell>
								<TableCell>Date</TableCell>
							</TableRow>
						</StyledTableHead>
						<TableBody>
							<ConvertHistory history={ConversionHistory} />
						</TableBody>
					</Table>
				</TableContainer>
			</Typography>
		</>
	);
}

export default App;
