import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const fieldSchema = new Schema({
    restField: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    menu: { type: Schema.Types.ObjectId, ref: 'Menu' }
});

export const Field = mongoose.model('Field', fieldSchema);