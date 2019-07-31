const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsShema = new Schema({ name: String});
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    comments: [commentsShema],//Cuando puede haber más de uno
    user:{

        type:Schema.Types.ObjectId,

        ref:'user'

    }
});

module.exports = mongoose.model('Posts', postSchema);