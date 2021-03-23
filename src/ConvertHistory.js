import React from "react";
import Conversion from "./Conversion";

export default function ConvertHistory({ history }) {
	return history.map((conv) => {
		return <Conversion key={conv.id} conversion={conv} />;
	});
}
