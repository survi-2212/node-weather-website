const request = require('request');

//function definition
const geoCode = (address , callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic3VydmkyMjEyIiwiYSI6ImNsODJvc2IwZjByb3IzdXIzcXZ3ejZobGUifQ.C-kkunLoaP4RYsEmEKvWyQ&limit=1'
    request({url : url , json : true},(error,response)=>{
        if (error) {
            callback('Unable to connect',undefined)
        }
        else if (response.body.features.length === 0) {
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,{
                longitude : response.body.features[0].center[0],
                latitude : response.body.features[0].center[1],
                Location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode