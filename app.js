const express = require('express')
const app = express()
const mongoose = require('mongoose')

const userRoutes = require('./routes/userRoutes')
const expressLayouts = require('express-ejs-layouts')

app.use(expressLayouts)
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')



mongoose.connect('mongodb://127.0.0.1/anime_db2')
.then(res => console.log('connected to mongodb'))
.catch(err => console.log(err))
app.use('/',userRoutes)

app.listen(3000, () => {
    console.log('server is running')
})