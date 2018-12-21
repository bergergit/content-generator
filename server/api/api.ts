/**
 * API ROUTES
 */
import * as express from 'express';
import { Menu } from '../models/Menu';
import { Field } from '../models/Field';
import * as jwt from 'express-jwt';
import * as jwks from 'jwks-rsa';

export const api = express();

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://fabioberger.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:8083/api/',
    issuer: "https://fabioberger.auth0.com/",
    algorithms: ['RS256']
});

// GET all menus and fields
api.get('/menusAndFields', async (req, res) => { 
    try {
        let menus = await Menu.find({}).populate('menus').exec();
        res.send(menus);
    } catch (err) {
        return res.status(500).send({message: err.message});
    }
    // let menus = Menu.find({}).populate('menus').exec((err: any, menus) => {
    //     if (err) { 
    //         return res.status(500).send({message: err.message});
    //     }

    //     res.send(menus);
    // });
});

api.post('/menu', async (req, res) => { 
    try {
        let savedMenu = await new Menu(req.body).save();
        res.send(savedMenu);
    } catch (err) {
        return res.status(500).send({message: err.message});
    }
});