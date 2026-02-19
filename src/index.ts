import express from 'express';
import serverConfig from './config/serverConfig';
import { serverAdapter } from './config/bullBoard';
import sampleQueueProducer from './producers/sampleQueueProducer';
import SampleWorker from './workers/SampleWorker';
import apiRouter from './routes';


const app = express();


app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.raw());
app.use(express.text());


app.get('/', (_req, res) => {
  res.send('TypeScript + Express working 🚀');
});
app.use('/ui', serverAdapter.getRouter());
app.use('/api',apiRouter)
app.listen(serverConfig.PORT, () => {
  console.log(`Server running on http://localhost:${serverConfig.PORT}`);
  SampleWorker('SampleQueue')
  sampleQueueProducer('SampleJob',{name:"Chetan",company:"Google",position:"SDE 1",location:"switzerland"})
});
