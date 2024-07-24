const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const userRoutes = require('./routes/userRoutes');
const expressLayouts = require('express-ejs-layouts');
const { handleError, ErrorHandler } = require('./utils/errorHandler');

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');

mongoose.connect('mongodb://127.0.0.1/anime_db2')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.use('/', userRoutes);

// Handle 404


// Error handler middleware
app.use((err, req, res, next) => {
    handleError(err, req, res);
});
app.use((req, res) => {
    res.send('you are now in the black hole')
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
