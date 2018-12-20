"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fieldSchema = new Schema({
    restField: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    menu: { type: Schema.Types.ObjectId, ref: 'Menu' }
});
exports.Field = mongoose.model('Field', fieldSchema);
