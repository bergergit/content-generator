import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as methodOverride from 'method-override';
import { api } from './api/api';

/**
 * APP INITIALIZATION
 */
// export const app = express();
export class Server { 
    private app: any;
    private listener: any;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(express.static(__dirname));
    
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(methodOverride('X-HTTP-Method-Override'));
        this.app.use(cors());
    
        /**
         * APP FILES
         */
        this.app.use('/api', api);
    }

    public get expressApp() {
        return this.app;
    }

    public initialize() {
        /**
         * SERVER INITIALIZATION
         */
        const port = process.env.PORT || '8083';
        this.app.set('port', port);
        this.listener = this.app.listen(port, () => console.log(`Server running on localhost:${port}`))
    }

    public close() {
        return this.listener.close();
    }
}