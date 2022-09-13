const express = require('express');
const path = require('path');
const hbs = require('hbs');
const listRouter = require('./routes/toDo.route');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './public/views'));
hbs.registerPartials(path.join(__dirname, './public/layouts'));
app.use(express.static(path.join(__dirname, './public/static')));
app.use(listRouter);

app.all('*', (req, res) => {
    res.render('error404', {
        pageTitle: 'Page Not Found',
        pageContent: 'Error 404 This Page Not Found!'
    });
});

module.exports = app;