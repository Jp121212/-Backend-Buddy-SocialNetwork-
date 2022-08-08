import express from 'express';
import { PrismaClient } from '@prisma/client';
import bodyparser from 'body-parser';
import user from './routes/user.js';
import followers from './routes/followers.js';
import Post from './routes/Post.js';
import comment from './routes/comment.js';
import morgan from "morgan";
import cors from "cors";


const app = express()
const router = express.Router();
const prisma = new PrismaClient()
app.use('/api/v1', user);
app.use(express.json())
app.use(morgan("dev"));
app.set('port', (process.env.PORT || 5000));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(user);
app.use(followers);
app.use(Post);
app.use(comment);


//For avoidong Heroku $PORT error
app.get('/', function(req, response) {
  var result = 'App is running'
  response.send(result);
}).listen(app.get('port'), function() {
  console.log('App is running, server is listening on port ', app.get('port'));
});
 
