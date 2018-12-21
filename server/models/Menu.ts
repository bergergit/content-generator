import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const menuSchema = new Schema({
    restField: { type: String, required: true },
    title: { type: String, required: true },
    menus: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
    fields: [{ type: Schema.Types.ObjectId, ref: 'Field' }]
});

export const Menu = mongoose.model('Menu', menuSchema);