const express = require('express');
const router = express.Router();
const Anime = require('../model/animes');
const { ErrorHandler } = require('../utils/errorHandler');

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
}

router.get('/', (req, res) => {
    res.redirect('/home');
});

router.get('/home', wrapAsync(async (req, res) => {
    const { msg } = req.query;
    const animes = await Anime.find();
    res.render('index', {
        title: 'Home',
        layout: 'layouts/main-layout',
        animes,
        msg
    });
}));

router.get('/detail', wrapAsync(async (req, res, next) => {
    const title = req.query;
    const anime = await Anime.findOne(title);
    if (!anime) {
        return next(new ErrorHandler(404, 'Anime not found'));
    }
    res.render('detail', {
        layout: 'layouts/main-layout',
        anime,
        title: 'Details'
    });
}));

router.get('/edit', (req, res) => {
    res.render('edit', {
        layout: 'layouts/main-layout'
    });
});

router.get('/add', (req, res) => {
    res.render('addAnime', {
        layout: 'layouts/main-layout',
        title: 'Add Anime'
    });
});

router.post('/addAnime', wrapAsync(async (req, res) => {
    const anime = new Anime(req.body);
    await anime.save();
    res.redirect('/home');
}));

router.delete('/delete/:id', wrapAsync(async (req, res, next) => {
    const anime = await Anime.findByIdAndDelete(req.params.id);
    if (anime) {
        res.redirect('/home?msg="Data berhasil dihapus"');
    } else {
        return next(new ErrorHandler(404, 'Anime not found'));
    }
}));

module.exports = router;
