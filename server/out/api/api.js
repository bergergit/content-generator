"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * API ROUTES
 */
const express = require("express");
const Menu_1 = require("../models/Menu");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
exports.api = express();
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
exports.api.get('/menusAndFields', (req, res) => {
    Menu_1.Menu.find({}).populate('menus').exec((err, menus) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        res.send(menus);
    });
});
exports.api.post('/users', (req, res) => {
    res.send({ body: req.body });
});
