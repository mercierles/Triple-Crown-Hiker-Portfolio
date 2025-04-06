// Variables
import express from 'express';
import path from 'path';
import miscController from './controllers/misc-controller.js';
import MIDDLEWARE from './routes/middleware.js';
import DEFAULTROUTES from './routes/default-routes.js';
import TRAILROUTES from './routes/trail-routes.js';

// main.js
const app = express();

// Setup Views/Paths Application 
app.set('view engine','ejs'); //set templating engine
app.set('views','views');
app.use('/public', express.static(path.join(import.meta.dirname, 'public'))); //'/public' creates an alias to the folder path to be used
app.use('/views', express.static(path.join(import.meta.dirname, 'views')));
app.use('/dist', express.static(path.join(import.meta.dirname, 'dist')));

//Setup Middleware (send only on failures in middleware)
app.use(MIDDLEWARE);
//Setup Routes (send on each route)
app.use('/trail', TRAILROUTES);
app.use(DEFAULTROUTES);
app.use(miscController);
//Launch Server
console.log("Starting Server");
app.listen(3000);