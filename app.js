const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

// const expressHbs = require('express-handlebars');

const rootDir = require('./utils/path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();


// app.engine('hbs', expressHbs({layoutsDir:'views/layouts', defaultLayout:'main-layout', extname:'hbs'}));

// app.set('view engine', 'pug');
// app.set('view engine', 'hbs');
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(rootDir, 'public')))

app.use('/admin', adminRoutes);

app.use(shopRoutes);

//for 404 page

app.use('/', (req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
    res.status(404).render('404', {
        pageTitle: 'Page Not Found'
    });
});

app.listen(3000);