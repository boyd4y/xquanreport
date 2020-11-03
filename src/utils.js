

import { tsvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData() {
	return function(d) {
		return {
			date: timeParse("%Y-%m-%d")(d.date),
			open: parseFloat(d.open),
			high: parseFloat(d.high),
			low: parseFloat(d.low),
			close: parseFloat(d.close),
			volume: parseFloat(d.volume)
		}
	};
}

export function getData() {
	const node = document.querySelector("script[id='ohlc']");
	let text = '';
	if (node) {
		text = node.textContent.replace(/[ ]/g, '').trim();
		return tsvParse(text, parseData());
	} else {
		console.warn('Missing OHLC data...')
	}
	return null;
}


export function getOrders() {
	const node = document.querySelector("script[id='orders']");
	let text = '';
	if (node) {
		text = node.textContent.trim();
		return JSON.parse(text);
	} else {
		console.warn('Missing orders data...')
	}
	return null;
}
