const express = require('express')
const router = express.Router()


router.get('/', (req,res) => {
    res.redirect('/home')
})
router.get('/home',(req,res) => {
    res.render('index', {
        layout: 'layouts/main-layout'
    })
    // res.send('hello world')
})

router.get('/detail',(req,res) => {
    res.render('detail', {
        layout: 'layouts/main-layout'
    })
})

router.get('/edit',(req,res) => {
    res.render('edit', {
        layout: 'layouts/main-layout'
    })
})

module.exports = router