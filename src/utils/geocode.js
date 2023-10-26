const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=b4918e80e4d1190cc15ca8910c9d618e&query=' + encodeURIComponent(address) + '&output=json&limit=1'

    request( { url , json : true} , (error,{body}) => {
        if(error){
            callback('Unable to access location services!' , undefined)
        }
        else if ( body.error || body.data.length === 0) {
            callback('Unable to find location. Try search again.' , undefined)
        }
        else{
            callback(undefined , {
                latitude : body.data[0].latitude,
                longitude : body.data[0].longitude,
                location : body.data[0].name
            })
        }
    })
}


module.exports = geocode