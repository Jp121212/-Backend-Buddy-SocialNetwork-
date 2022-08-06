import express from 'express';
import { PrismaClient } from '@prisma/client';

import user from './routes/user.js';
import followers from './routes/followers.js';
import post from './routes/post.js';
import comment from './routes/comment.js';
import morgan from "morgan";
import cors from "cors";

// const cors = require('cors');
const app = express()
const prisma = new PrismaClient()


app.use(express.json())
app.use(morgan("dev"));
app.set('port', (process.env.PORT || 5000));


app.use(cors());
app.use(express.json());
app.use(user);
app.use(followers);
app.use(post);
app.use(comment);


//For avoidong Heroku $PORT error
app.get('/', function(req, response) {
  var result = 'App is running'
  response.send(result);
}).listen(app.get('port'), function() {
  console.log('App is running, server is listening on port ', app.get('port'));
});
 








