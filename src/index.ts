import express from 'express';
import mainRoute from './routes';
import resizeImg from './routes/api/resizeImage';

const imageAPI = express();
const port = 3000;
const server = imageAPI.listen(port, (): void => {
  console.log(`Connected to server, \nRunning on local-host ${port}`);
});

imageAPI.use('/', mainRoute);
imageAPI.use('/', resizeImg);

export default imageAPI;
