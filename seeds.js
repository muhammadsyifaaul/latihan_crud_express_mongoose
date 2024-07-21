const mongoose = require('mongoose')
const Anime = require('./model/animes')


mongoose.connect('mongodb://127.0.0.1/anime_db2')
.then(res => console.log('connected to mongodb'))
.catch(err => console.log(err))

const animeSeeds = [
    {
    title: 'Kimi No Na Wa',
    genre: ['romance','supernatural'],
    rating: 9,
    status: 'finished',
    type: 'movie',
    description: 'sajndj dsad djasd jsakd'
    },
    {
    title: 'Boku No Hero',
    genre: ['romance','supernatural'],
    rating: 9,
    status: 'finished',
    type: 'movie',
    description: 'sajndj dsad djasd jsakd'
    }
]

Anime.insertMany(animeSeeds,{ runValidators: true})
.then(res => console.log('data added succesfully'))