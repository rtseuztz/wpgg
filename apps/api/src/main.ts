/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
 import 'dotenv/config'
 import * as express from 'express';
 import * as tools from './tools';
 const app  = express();
 
 app.get('/api', async (req: tools.Req, res) => {
   res.send(await tools.t.processGet(req))
 });
 
 const port = process.env.port || 3333;
 const server = app.listen(port, () => {
   console.log(`Listening at http://localhost:${port}/api`);
 });
 server.on('error', console.error);
 