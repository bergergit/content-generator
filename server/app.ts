import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as methodOverride from 'method-override';
import { api } from './api/api';

/**
 * APP INITIALIZATION
 */
// export const app = express();
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());

/**
 * APP FILES
 */
app.use('/api', api);

/**
 * SERVER INITIALIZATION
 */
const port = process.env.PORT || '8083';
app.set('port', port);
export const server = app.listen(port, () => console.log(`Server running on localhost:${port}`));