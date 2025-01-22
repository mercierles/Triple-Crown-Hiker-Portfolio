// Variables
import express from 'express';
import path from 'path';
import miscController from './controllers/miscController.js';
import middleware from './routes/middleware.js';
import defaultRoutes from './routes/defaultRoutes.js';
import trailRoutes from './routes/trailRoutes.js';

// main.js
const app = express();

// Setup Views/Paths Application 
app.set('view engine','ejs'); //set templating engine
app.set('views','views');
app.use('/public', express.static(path.join(import.meta.dirname, 'public'))); //'/public' creates an alias to the folder path to be used
app.use('/views', express.static(path.join(import.meta.dirname, 'views')));
// app.use(cookieParser()); //Cookie parser to get api token easily

//Setup Middleware (send only on failures in middleware)
app.use(middleware);
//Setup Routes (send on each route)
app.use('/trail', trailRoutes);
app.use(defaultRoutes);
app.use(miscController);
//Launch Server
console.log("Starting Server");
app.listen(3000);