const request = require('request')

const weather = (lat, lon, callback) => {

    var url = 'http://api.weatherstack.com/current?access_key=6ebcb1a94a8e01ad5aed80366d95ce80';
    url += `&query=${lat},${lon}`;
    url += '&units=f';

    //console.log("URL = " + url);

    //var url = 'http://api.weatherstack.com/current?access_key=6ebcb1a94a8e01ad5aed80366d95ce80&query=40.7831,-73.9712&units=f'

    request({ url, json: true }, (error, {body} = {}) => {

        //console.log("Error: ", error);

        //console.log(body);
        
        if (error) {

            callback('Unable to connect to weather service', undefined)

        } else if (body.success === false) {
            
            //console.log("Error Reported from API:");
            //console.log(body.error);
            callback("Error reported from API: " + body.error.code + ". " + body.error.info, undefined);
        
        } else {

            if (body.current.weather_descriptions.length <=0) {
                callback(undefined, {
                    temperature: body.current.temperature,
                    description: 'No Decsription Provided'
                })
            }
            else {
                callback(undefined, {
                    temperature: body.current.temperature,
                    description: body.current.weather_descriptions[0]
                })
            }
        }
    })
}

// this will get you everything
// https://api.weatherbit.io/v2.0/forecast/daily?key=923808928f8f47c1bc350f49d8972b15&lat=38.123&lon=-78.543

const forecast = (lat, lon, callback) => {

    var url = 'https://api.weatherbit.io/v2.0/forecast/daily?units=I&key=923808928f8f47c1bc350f49d8972b15';
    url += `&lat=${lat}&lon=${lon}`;

    //console.log("URL = " + url);

    request({ url, json: true }, (error, {body} = {}) => {

        //console.log("Error: ", error);

        //console.log(body);
        
        if (error) {

            callback('Unable to connect to forecast service', undefined)

        } else if (body.success === false) {
            
            //console.log("Error Reported from API:");
            //console.log(body.error);
            callback("Error reported from API: " + body.error.code + ". " + body.error.info, undefined);
        
        } else {

            //console.log("body.data size = " + body.data.length);

            if (body.data <=0) {
                callback("Error getting forecast");
            }
            else {
                // callback(undefined, {
                //     temperature: body.current.temperature,
                //     description: body.current.weather_descriptions[0]
                // })

                // build the object we'll send back with a subset of the data we 
                // care about
                forecastData = {
                    location: body.city_name,
                    forecast: []
                };

                body.data.forEach(element => {
                    forecastData.forecast.push(
                        {
                            date: element.datetime,
                            lowtemp: element.low_temp,
                            highTemp: element.max_temp,
                            description: element.weather.description
                        }
                    );
                });

                callback(undefined,forecastData);
            }
        }
    })
}


module.exports = {weather, forecast};