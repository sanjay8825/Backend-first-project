const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

// mongoose.Promise = Promise;
app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/studenttest', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connected to mongodb');
}).catch((err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ');
    process.exit();
});

// app.get('/', (req, res, next) => {
//     return res.sendFile(path.join(__dirname, 'login.html'));
// });

// app.get('/home', (req, res, next) => {
//     const names = ["guru", "sanjay", "hari", "kavya"];
//     return res.render('math', { students: names });
// });

app.get('/login', (req, res, next) => {
    console.log('GET method...........');
    return res.render('login');
});

app.post('/login', (req, response, next) => {
    console.log(req.body);
    let err;
    if (req.body.email !== '8888@gmail.com') {
        err = 'User not found';
    } else if (req.body.password !== '8888') {
        err = 'Wrong Password';
    }
    if (err) {
        return response.render('login', {err: err});
    }
    return response.redirect('/home');
});

app.get('/home', (req, res, next) => {
    const dogs = [
        {id: 1, name: 'fighter', imageUrl: './images/fighter.jpg'},
        {id: 2, name: 'Angel', imageUrl: './images/10.jpg'},
        {id: 4, name: 'Anemone', imageUrl: './images/15.jpg'},
        {id: 3, name: 'Tiger', imageUrl: './images/17.jpg'},
    ];
    return res.render('home', {dogs});
});

app.get('/dog/:id', (req, res, next) => {
    const dogs = [
        {id: 1, name: 'fighter', imageUrl: './images/fighter.jpg'},
        {id: 2, name: 'Angel', imageUrl: './images/10.jpg'},
        {id: 4, name: 'Anemone', imageUrl: './images/15.jpg'},
        {id: 3, name: 'Tiger', imageUrl: './images/17.jpg'},
    ];
    const dog = dogs[req.params.id - 1];
    return res.render('dog', {dog});
});

app.listen(3000, () => {
    console.log('Server listening in port 3000');
});
