const request = require('request');

const geoCode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibGV1bWFzY29kZSIsImEiOiJja2FyOGNxM2QwNHZpMnJxZGE3aWY0dG55In0.MFW5tkydTiAT1t6fl7Q9QA';
    request({url, json: true}, (error, {body})=>{
        if (error) {
            callback('unable to connect to location services', undefined)
        }else if (body.features.length === 0) {
            callback('unable to find location. Try another Search', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    } )
}

module.exports = geoCode;