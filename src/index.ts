import express from "express";
import {
	getRandomQuotes,
	getRandomQuotesByCharacter,
	getQuotesByEpisode
} from "./utils/quotes";
import "dotenv/config";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/", (_, res) => {
	res.send("Hello World!");
});

app.all("*", (_, res, next) => {
	res.set("Access-Control-Allow-Origin", "*");
	next();
});

app.get("/v1/random/:num?", async (req, res) => {
	try {
		const { num } = req.params;
		const showEpisode = req.query.showEpisode === "true";
		const quotes = getRandomQuotes((Number(num) ? Number(num) : 1));
		res.status(200).json(showEpisode ? quotes : quotes.map(quote => ({
			"quote": quote.quote,
			"character": quote.character
		})));
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
		console.error(error);
	}
});

app.get("/v1/character/:slug/:num?", async (req, res) => {
	try {
		const { slug, num } = req.params;
		const showEpisode = req.query.showEpisode === "true";
		const quotes = getRandomQuotesByCharacter(slug, (Number(num) ? Number(num) : 1));
		res.status(200).json(showEpisode ? quotes : quotes.map(quote => ({
			"quote": quote.quote,
			"character": quote.character
		})));
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
		console.error(error);
	}
});

app.get("/v1/episode/:episode", async (req, res) => {
	try {
		const { episode } = req.params;
		res.status(200).json(getQuotesByEpisode(episode));
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
		console.error(error);
	}
});

app.listen(port, () => {
	console.log(`server is listening on ${port}`);
});