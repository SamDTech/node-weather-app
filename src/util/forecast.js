const request = require('request')
const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&' + 'lon=' + longitude + ',&appid=3f088d79449cdb68e1166a8bb4b5289b&units=metric';
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('unable to access the weather api', undefined)
        }else if(body.message){
            callback('invalid location', undefined)
        }else{
            const check = body.list[0].main
            callback(undefined, 'the temperature is ' + check.temp + ', but the pressure  is ' + check.humidity)
        }
    })
}

module.exports = forecast;