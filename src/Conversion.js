import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
export default function Conversion({ conversion }) {
	return (
		<TableRow>
			<TableCell>{conversion.base}</TableCell>
			<TableCell>{conversion.end}</TableCell>
			<TableCell>{conversion.amount}</TableCell>
			<TableCell>{conversion.rate}</TableCell>
			<TableCell>{(conversion.rate * conversion.amount).toFixed(3)}</TableCell>
			<TableCell>{conversion.date}</TableCell>
		</TableRow>
	);
}
