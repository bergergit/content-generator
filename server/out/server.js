"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const api_1 = require("./api/api");
/**
 * MONGO DB INITIALIZATION
 */
let connection = mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/contentgenerator", { useNewUrlParser: true }).then(() => { console.info(`${new Date()} - Connected to MongoDB: ${process.env.MONGODB_URI}`); }, err => { console.error('MongoDB Connection Error. Please make sure that', process.env.MONGODB_URI, 'is running.'); });
/**
 * APP INITIALIZATION
 */
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());
/**
 * APP FILES
 */
app.use('/api', api_1.api);
/**
 * SERVER INITIALIZATION
 */
const port = process.env.PORT || '8083';
app.set('port', port);
app.listen(port, () => console.log(`Server running on localhost:${port}`));
