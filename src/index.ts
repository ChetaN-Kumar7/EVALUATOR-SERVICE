import express from 'express';
import serverConfig from './config/serverConfig';

import sampleQueueProducer from './producers/sampleQueueProducer';
import SampleWorker from './workers/SampleWorker';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('TypeScript + Express working 🚀');
});

app.listen(serverConfig.PORT, () => {
  console.log(`Server running on http://localhost:${serverConfig.PORT}`);
  SampleWorker('SampleQueue')
  sampleQueueProducer('sampleJob',{name:"Chetan",company:"Google",position:"SDE 1",location:"switzerland"})
});
