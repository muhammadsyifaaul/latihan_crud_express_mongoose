const mongoose = require('mongoose')

const scemaAnime = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['finished', 'ongoing']
    },
    type: {
        type: String,
        enum: ['tv','ona','ova','movie']
    },
    description: {
        type: String,
        max: 150,
        required: true
    }
})


const Anime = mongoose.model('Anime',scemaAnime)
module.exports = Anime