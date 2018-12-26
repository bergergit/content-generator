// import * as express from 'express';
// import * as bodyParser from 'body-parser';
// import * as cors from 'cors';
import * as mongoose from 'mongoose';
// import * as methodOverride from 'method-override';
// import { api } from './api/api';
import { Server } from './app';

/**
 * MONGO DB INITIALIZATION
 */
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/contentgenerator", { useNewUrlParser: true }).then(
    () => { console.info(`${new Date()} - Connected to MongoDB: ${process.env.MONGODB_URI}`); },
    err => { console.error('MongoDB Connection Error. Please make sure that', process.env.MONGODB_URI, 'is running.'); }
);

new Server().initialize();
