"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const menuSchema = new Schema({
    restField: { type: String, required: true },
    title: { type: String, required: true },
    menus: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
    fields: [{ type: Schema.Types.ObjectId, ref: 'Field' }]
});
exports.Menu = mongoose.model('Menu', menuSchema);
