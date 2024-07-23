const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const userRoutes = require('./routes/userRoutes')
const expressLayouts = require('express-ejs-layouts')
const ErrorHandler = require('./utils/ErrorHandler')

app.use(expressLayouts)
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')



mongoose.connect('mongodb://127.0.0.1/anime_db2')
.then(res => console.log('connected to mongodb'))
.catch(err => console.log(err))
app.use('/',userRoutes)


app.use((err,req,res) => {
    const status = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(status).send(message)
})

app.use((req,res) => {
    res.send('you are in the black hole')
})
app.listen(3000, () => {
    console.log('server is running')
})