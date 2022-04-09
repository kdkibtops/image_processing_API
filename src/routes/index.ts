import express from 'express';
const mainRoute = express.Router();

const sendFileOptions: object = {
  root: 'src/HTML',
};
mainRoute.get('/', (req: express.Request, res: express.Response): void => {
  res.sendFile('index.html', sendFileOptions);
});

export default mainRoute;

