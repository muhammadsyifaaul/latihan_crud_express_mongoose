const express = require('express')
const router = express.Router()
const Anime = require('../model/animes')
const ErrorHandler = require('../utils/ErrorHandler')

// app.use(express.urlencoded({extended: true}))
function wrapAsync(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(err => next(err));
    }
}
router.get('/', (req,res) => {
    res.redirect('/home')
})
router.get('/home', async (req,res) => {
    const {msg} = req.query
    try {
        const animes = await Anime.find()
        
    res.render('index', {
        title: 'Home',
        layout: 'layouts/main-layout',
        animes,
        msg
    })
    // res.send(animes)
    } catch(err) {
        res.send(err)
    }
    // res.send('hello world')
})

router.get('/detail',wrapAsync( async (req,res,next) => {
    const title = req.query
    const anime = await Anime.findOne(title)
    if(!anime) {
        next(new ErrorHandler(404, 'Anime not found'))
    }
    res.render('detail', {
        layout: 'layouts/main-layout',
        anime,
        title: 'Details'
    })
}))

router.get('/edit',(req,res) => {
    res.render('edit', {
        layout: 'layouts/main-layout'
    })
})
router.get('/add',(req,res) => {
    res.render('addAnime', {
        layout: 'layouts/main-layout',
        title: 'Add Anime'
    })
})

router.post('/addAnime', async(req,res) => {
    try {
        const anime = new Anime(req.body)
    await anime.save()
    res.redirect('/home')
    } catch(err) {
        console.log(err)
    }
    
})

router.delete('/delete/:id', async (req,res) => {
    try {
        const anime = await Anime.findByIdAndDelete(req.params.id)
        if(anime) {
            res.redirect('/home?msg="data berhasil dihapus"')
        } else {
            throw new Error
        }
    } catch(err) {
        res.redirect('/home?msg=data gagal dihapus')
    }
})
module.exports = router