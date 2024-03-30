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

app.get("/v1/random/:num?", async (req, res) => {
	const { num } = req.params;
	res.status(200).send(getRandomQuotes(Number(num) ? Number(num) : 1));
});

app.get("/v1/character/:slug/:num?", async (req, res) => {
	const { slug, num } = req.params;
	const choiceNum = Number(num) ? Number(num) : 1;
	res.status(200).send(getRandomQuotesByCharacter(slug, choiceNum));
});

app.get("/v1/episode/:episode", async (req, res) => {
	const { episode } = req.params;
	res.status(200).send(getQuotesByEpisode(episode));
});

app.listen(port, () => {
	console.log(`server is listening on ${port}`);
});