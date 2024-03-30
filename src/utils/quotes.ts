import * as jsonData from "../../data.json";

type QuoteData = {
  "characters": { [key: string]: string },
  "quotes": { "quote": string, "character": string, "episode": string }[]
};

const data: QuoteData = jsonData;

interface quoteType {
    "quote": string;
    "character": string;
    "episode": string;
}

const randomize = (quotes: quoteType[]): quoteType => {
	const randomIndex = Math.floor(Math.random() * quotes.length);
	return {
		"quote": quotes[randomIndex].quote,
		"character": data.characters[quotes[randomIndex].character],
		"episode": quotes[randomIndex].episode
	};
};

export const getRandomQuotes = (numOfQuotes: number): quoteType[] => {
	const out: quoteType[] = [];
	const quotesLen = data.quotes.length;

	if (numOfQuotes > quotesLen) {
		numOfQuotes = quotesLen;
	}

	while (out.length < numOfQuotes) {
		const randomQuote = randomize(data.quotes);
		const existingQuote = out.find(quote => quote.quote === randomQuote.quote);
		if (!existingQuote) {
			out.push(randomQuote);
		}
	}

	return out;
};

export const getRandomQuotesByCharacter = (slug: string, numOfQuotes: number): quoteType[] => {
	const characterQuotes = data["quotes"].filter(quote => quote.character === slug);

	if (characterQuotes.length === 0) {
		return [];
	}

	const out: quoteType[] = [];

	if (numOfQuotes > characterQuotes.length) {
		numOfQuotes = characterQuotes.length;
	}

	while (out.length < numOfQuotes) {
		const randomQuote = randomize(characterQuotes);
		const existingQuote = out.find(quote => quote.quote === randomQuote.quote);
		if (!existingQuote) {
			out.push(randomQuote);
		}
	}

	return out;
};

export const getQuotesByEpisode = (episode: string): quoteType[] => {
	const filteredQuotes = data["quotes"].filter(quote => quote.episode === episode);

	for (const quote of filteredQuotes) {
		quote.character = data.characters[quote.character];
	}

	return filteredQuotes;
};