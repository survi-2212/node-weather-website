const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forcast = require('./utils/forcast');

const app = express();


//for static page
const publicDirPath = path.join(__dirname,'../public' )
//define path 
const viewsPath = path.join(__dirname,'../templets/views');
// console.log(viewsPath)
const partialPath = path.join(__dirname , '../templets/partials');



//for dynamic pages and setup the handlebars and views location
app.set('view engine' , 'hbs')
app.set('views' , viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirPath))


app.get('' , (req, res)=>{
    res.render('index',{
        title: "Weather app",
        name: 'survi',
        message: 'weather information'
    })
})


app.get('/about' , (req,res)=>{
    res.render('about',{
        title: 'about page',
        name: 'survi',
        message: 'about us'
    })
})

app.get('/help' , (req,res)=>{
    res.render('help',{
        title:'help page',
        name: 'survi',
        message: 'help information'
    })  
})

app.get('/weather' , (req,res)=>{

    const loc = req.query.search;
    if(!loc)
    {
        return res.send({
            error : 'Location must given'
        })
    }
    geoCode(loc,(error,{latitude,longitude,Location} = {})=>{
        if(error){
            return res.send({
                error: error
            })
        }

        forcast(latitude,longitude,(error,{Temperature,FeelsLike,Humidity,Weather})=>{
            if(error)
            {
                req.send({
                    error : error
                })
            }

            res.send({
                Location: Location,
                Temperature: Temperature,
                FeelsLike: FeelsLike,
                Humidity: Humidity,
                Weather: Weather
        
            })
        })
    })
    
})

app.get('/help/*' , (req,res)=>{
    res.render('error',{
        title : 'ERROR',
        message : "help article not found",
        name : 'survi'
    })
})

app.get('/*' , (req,res)=>{
    res.render('error',{
        title : 'ERROR',
        message : '404 : Page not found',
        name : 'survi'
    })
})


app.listen(3000 , ()=>{
    console.log('app hosted successfully')
})