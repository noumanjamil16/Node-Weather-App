const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibW9pemtoYW4xNCIsImEiOiJjbGRuMTB2M3YwNTV4M3Bwd3RlczM0NnZ5In0.E0Ifk4qYxApZ8p-_NkR6-Q&limit=1'

    request({ url: url, json: true }, (error,{body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }  else {
            callback(undefined, {
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode