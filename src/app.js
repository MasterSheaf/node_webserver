const path = require('path');
// express is actually a function, not an object
const express = require('express');
const hbs = require('hbs');

const app = express();

// set express variables
// setup express to use the hbs templating engine
app.set('view engine','hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// tell express where to find static content
app.use(express.static(path.join(__dirname, '../public')));


// empty routenode
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
        title: 'About Page',
        name:'Scott Sheaf'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name:'Scott Sheaf',
        helpText: "You need too much help for me to help."
    });
});

app.get('/weather', (req, res) => {
    res.send('Weather Page');
});

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});

