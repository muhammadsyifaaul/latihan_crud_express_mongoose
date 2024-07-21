const express = require('express')
const router = express.Router()
const Anime = require('../model/animes')

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

router.get('/detail', async (req,res) => {
    const title = req.query
    const anime = await Anime.findOne(title)
    res.render('detail', {
        layout: 'layouts/main-layout',
        anime,
        title: 'Details'
    })
})

router.get('/edit',(req,res) => {
    res.render('edit', {
        layout: 'layouts/main-layout'
    })
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