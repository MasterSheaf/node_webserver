const request = require('request')

// My Access Token for MapBox is pk.eyJ1IjoibWFzdGVyc2hlYWYiLCJhIjoiY2t3anl5azN4MW42ajJwcWkyeWtjbGZ0cyJ9.SbjBbZOpFJlGFxpG8rN28g

// to use this function
// address = some address you want lat/lon for something like Ohio or Columbus Ohio will work
// callback = your provided callback method which should take two parameters.
//        error - undefined or a string with an error message
//        response - an object with three fields (we destructure into just the body field)
//                   lat, lon, and place name <- this is the full place name that MapBox uses instead of the search string we provided

// Powell lat = 40.15748885673399, lon = -83.07281424991821

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFzdGVyc2hlYWYiLCJhIjoiY2t3anl5azN4MW42ajJwcWkyeWtjbGZ0cyJ9.SbjBbZOpFJlGFxpG8rN28g&limit=1'

    //console.log("Geocode URL = " + url);


    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode