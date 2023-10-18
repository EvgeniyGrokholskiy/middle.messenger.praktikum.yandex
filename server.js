import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import fallback from 'express-history-api-fallback';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
const root = `${__dirname}/dist`;
const PORT = process.env.PORT || 3000;

app.use(express.static(root));
app.use(fallback('index.html', { root }));

app.listen(PORT, () => {
  // console.log(`Example app listening on port ${PORT}!`);
});
