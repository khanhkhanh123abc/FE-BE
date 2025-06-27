import express from 'express';
import bodyParser from 'body-parser';
import configViewEngine from './config/viewEngine.js';
import initWebRoutes from './routes/web.js';
import connectDB from './config/connectDB.js';



let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
initWebRoutes(app);

connectDB();


let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});