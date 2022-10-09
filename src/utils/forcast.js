const request = require('request')


const forcast = (lat,lon,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=71de2936e6929961d1b3e4369934cac0&query=' + lat + ','+ lon +'&units=m'
    request({url, json : true},(error,response)=>{
        if(error){
            callback('Unable to connect',undefined)
        }
        else if (response.body.error) {
            callback('Unable to find location',undefined)
        }
        else{
            const temp = response.body.current.temperature;
            const feelsLike = response.body.current.feelslike;
            const humidity = response.body.current.humidity;
            const weather = response.body.current.weather_descriptions[0];

            callback(undefined,{
                Temperature : temp,
                FeelsLike : feelsLike,
                Humidity : humidity,
                Weather: weather
            })
        }
    })
}


module.exports = forcast