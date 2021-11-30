const path = require('path');
// express is actually a function, not an object
const express = require('express');

const app = express();

// tell express where to find static content
// root url route also comes from here
app.use(express.static(path.join(__dirname, '../public')));

app.get('/weather', (req, res) => {

    res.send('Weather Page');

});

app.listen(3000, () => {

    console.log("Server Running on Port 3000");

});

