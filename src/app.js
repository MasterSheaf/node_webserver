const path = require('path');
// express is actually a function, not an object
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const {weather, forecast} = require('./utils/weather');

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

    if (!req.query.address) {
        res.send({error:"must provide an address"});
        return;
    }

    // geocode an address
    // Note that when destructuring we need to provide a default parameter for the
    // second parameter of an empty object if error is defined in our callback
    // code we usually set the second parameter to undefined which causes the 
    // destructuring to fail, so we add the default
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            console.log("Geolocation Query Error ", error);
            res.send({error}); 
        } else {
            // now we can get the weather
            weather(latitude, longitude, (error, {temperature, description} = {}) => {
                if (error) {
                    console.log("Weather Query Error ", error);
                    res.send({error});
                } else {
                    console.log(`In ${location} it is ${temperature} deg and ${description}`);

                    res.send({
                        description,
                        temperature,
                        location
                    });
                }
            });

        }
    });
});

app.get('/forecast', (req, res) => {

    if (!req.query.address) {
        res.send({error:"must provide an address"});
        return;
    }

    // geocode an address
    // Note that when destructuring we need to provide a default parameter for the
    // second parameter of an empty object if error is defined in our callback
    // code we usually set the second parameter to undefined which causes the 
    // destructuring to fail, so we add the default
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            console.log("Geolocation Query Error ", error);
            res.send({error}); 
        } else {



            // now we can get the forecast
            forecast(latitude, longitude, (error, result = {}) => {
                if (error) {
                    console.log("Forecast Query Error ", error);
                    res.send({error});
                } else {
                    //console.log(`In ${location} it is ${temperature} deg and ${description}`);
                    res.send(result);
                }
            });




        }
    });
});

app.get('/products', (req, res) => {
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('*', (req, res) => {
    res.send('Page not found');
});



app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});

