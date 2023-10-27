const request = require('request')

const forecast = (latitude , longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c9695afd4cc2c12078b89de319ae90a0&query=' + latitude + ',' + longitude + '&units=m'

    request( { url , json : true} , (error , {body}) => {
        if(error){
            callback('Unable to connect to weather service!' , undefined)
        }
        else if (body.error) {
            callback('Unable to find location' , undefined)
        }
        else {
            callback( undefined , "Weather is like "+ body.current.weather_descriptions[0]+ ". Temperature is " + body.current.temperature + " and it feels like " + body.current.feelslike + ". Precipitation tendency is " + body.current.precip + ". Humidity level is " + body.current.humidity + ".")
        }
    })
}

module.exports = forecast