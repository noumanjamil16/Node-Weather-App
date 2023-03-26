const request = require('request')
const forecast = (lattitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=b77981cfb392dd621a927d7ab6a15b12&query=' +lattitude + ',' + longitude + '&units=m'
    request({url, json : true}, (error,response)=> {
        if(error){
            callback('Unable to connect to weather service',
            undefined)
        }else if(response.body.error){
            callback('Unable to find location',
            undefined)
        }else{
            callback(undefined,
                'it is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + " degrees.")

        }
    })
}

module.exports = forecast