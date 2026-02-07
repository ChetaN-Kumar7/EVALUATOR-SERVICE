import express from 'express';
import serverConfig from './config/serverConfig';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('TypeScript + Express working 🚀');
});

app.listen(serverConfig.PORT, () => {
  console.log(`Server running on http://localhost:${serverConfig.PORT}`);
});
