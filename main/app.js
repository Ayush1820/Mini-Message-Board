const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();
const urlencoded = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'stylesheet')));

// logic
let message = [
    {
        User: "Ayush Thakur",
        Time: new Date().toString(),
        Message: "First Typed Message"
    },
    {
        User: "Piyush Thakur",
        Time: new Date().toString(),
        Message: "Second Typed Message"
    }
];

// Routers
app.get('/', (req, res) => {
    res.render('home', { message: message });
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.post('/new', urlencoded, (req, res) => {
    message.push({User:req.body.Username,Time:new Date().toString(),Message:req.body.message});
    res.redirect('/');
});

app.listen(port, (err) => {
    if (err) {
        return new Error(`Something went wrong in listening ${port}`);
    }
    console.log(`Listening on port ${port}`);
});