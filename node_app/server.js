const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routers/api/users');

const app = express();


//DB config
const db = require('./config/key').mongoURL;
//db connection
mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MongoDB connected");

    }).catch(() => {
        console.log(err);

    })

//body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


//routers中间件
app.use('/api/users', users);

//passport初始化
app.use(passport.initialize());

require('./config/passport')

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})