import express from 'express';
const ROUTER = express.Router();

// '/' just looks for paths that contain / (which all of them do and since we call next, it continues)
ROUTER.use('/', (req, res, next) => {
    //Get Module and call function
    console.log('Middleware is where we can execute things like authentication, '+
     'sitewide logs, and things everypage may want to make use of'+
     'This keep running with next(), until a send() command is called (typically in routes) but executes top to bottom');
    next();
});

export default ROUTER;
