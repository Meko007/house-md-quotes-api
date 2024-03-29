import express from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.get('/', (_, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});