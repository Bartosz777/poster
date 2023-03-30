const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    comments: [
        {
            body: {
                type: String,
                required: true
            },
            author: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            }

        }, { timestamps: true }
    ],
    likes: [
        {
            type: String
        }
    ]
}, { timestamps: true })


module.exports = mongoose.model('Post', postSchema)