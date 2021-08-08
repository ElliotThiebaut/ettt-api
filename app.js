import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import {mongoConnect} from "./db-connexion.js";

import {router as routerMessagesGet} from "./routes/messages/messages-get.js";
import {router as routerMessagesPost} from "./routes/messages/messages-post.js";
import {router as routerMessagesDelete} from "./routes/messages/messages-delete.js";

// Configuring express and its middleware
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Using the router to register all the routes
app.use(routerMessagesGet)
app.use(routerMessagesPost)
app.use(routerMessagesDelete)

//Connecting to the mongoDB database
mongoConnect().catch(console.error);

//Listening to port 3000 for new requests
app.listen(port, () => console.log(`API running and listening on port ${port}!`));