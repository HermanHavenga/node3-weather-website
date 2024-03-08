const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bb9cd878100e58b62e69f102ba72cd12&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast