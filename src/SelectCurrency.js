import React from "react";
import { Select, MenuItem } from "@material-ui/core";
export default function SelectCurrency({ def, callback }) {
	let val = def;
	let sendData = (event) => {
		console.log(event.target.value);
		val = event.target.value;
		callback(val);
	};

	return (
		<>
			<Select
				labelId="select-label"
				onChange={sendData}
				defaultValue={val}
				style={{ margin: "0px 20px", minWidth: "300px", minHeight: "50px", fontSize: "1.3rem" }}
			>
				<MenuItem value={"USD"}>United States Dollars</MenuItem>
				<MenuItem value={"EUR"}>Euro</MenuItem>
				<MenuItem value={"GBP"}>United Kingdom Pounds</MenuItem>
				<MenuItem value={"AUD"}>Australia Dollars</MenuItem>
				<MenuItem value={"CAD"}>Canada Dollars</MenuItem>
				<MenuItem value={"CNY"}>China Yuan Renmimbi</MenuItem>
			</Select>
		</>
	);
}
