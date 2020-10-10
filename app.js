const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./utils/path');


//const adminRoutes = require("./routes/admin");
//const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");

const mongoConnect = require('./utils/database');

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(rootDir, 'public')))

app.use((req, res, next) => {
    // User.findByPk(1)
    //     .then(user => {
    //         req.user = user;
    //         next();
    //   })
    //   .catch((err) => console.log(err));;
})

// app.use('/admin', adminRoutes);

// app.use(shopRoutes);

//for 404 page

app.use('/', errorController.get404);

mongoConnect((client) => {
    //console.log(client);
    app.listen(3001);
});


