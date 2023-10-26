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
            callback( undefined , {
                description : body.current.weather_descriptions[0],
                temperature : body.current.temperature,
                feels_like : body.current.feelslike
            })
        }
    })
}

module.exports = forecast