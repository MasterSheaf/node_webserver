const path = require('path');
// express is actually a function, not an object
const express = require('express');

const app = express();

// set express variables
// setup express to use the hbs templating engine
app.set('view engine','hbs');

// tell express where to find static content
app.use(express.static(path.join(__dirname, '../public')));

// empty route
app.get('', (req, res) => {
    // express knows everything it needs to given 
    // the rendering engine set up above
    // the second parameter is an object that contains
    // all the data we want the HTML to have access to
    res.render('index', {
        title: 'Weather App',
        name: 'Scott Sheaf'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {

    });
});

app.get('/help', (req, res) => {
    res.render('help', {

    });
});

app.get('/weather', (req, res) => {
    res.send('Weather Page');
});

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});

