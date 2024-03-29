import * as jsonData from '../../data.json';

type QuoteData = {
  characters: { [key: string]: { name: string } },
  quotes: { quote: string, character: string }[]
};

const data: QuoteData = jsonData;

const randomize = (): { quote: string; character: string } => {
    const randomIndex = Math.floor(Math.random() * data.quotes.length);
    return {
        quote: data.quotes[randomIndex].quote,
        character: data.characters[data.quotes[randomIndex].character]?.name
    };
};

const getRandomQuotes = (numOfQuotes: number): { quote: string; character: string }[] => {
    const out: { quote: string; character: string }[] = [];
    const quotesLen = data.quotes.length;

    if (numOfQuotes > quotesLen) {
        numOfQuotes = quotesLen;
    }

    while (out.length < numOfQuotes) {
        const randomQuote = randomize();
        const existingQuote = out.find(quote => quote.quote === randomQuote.quote);
        if (!existingQuote) {
            out.push(randomQuote);
        }
    }

    return out;
};

console.log(getRandomQuotes(20));

