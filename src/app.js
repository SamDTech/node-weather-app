const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./util/forecast');
const geoCode = require('./util/geocode')

// call the express function
const app = express();

app.set('views', path.join(__dirname, '../templates/views'))
app.set('view engine','hbs')
//app.use(express.static('public'))

hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static('../public'))

app.get('', (req, res)=>{
    res.render('./index', {
        title: 'Weather',
        name: 'Samuel',
        age: 20
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'My about page',
        name: 'Samuel'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {

        title: 'help page',
        name: 'oyinkansola',
        age: 20
    })
})



app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'input a search term'
        })
    }
      
geoCode(req.query.search, (error, {latitude, longitude, location})=>{
    if(error){
        return res.send({error})
    }
     forecast(Math.floor(latitude), Math.floor(longitude), (error, forecastData)=>{
         if (error) {
             return res.send({error})
         }
          res.send({
              location: latitude,
              forecast: forecastData,
              address: req.query.address
          }) 
        
         } )
})
});

app.get('/product', (req, res)=>{
    if (!req.query.search) {
       return res.send({
            error: 'error, provide a search'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('help/*', (req, res)=>{
    res.render('error-404', {
        error: 'error 404, page cannot be found'
    })
})

app.get('*', (req, res)=>{
    res.render('error-404', {
        error: 'sorry no page found'
    })
})

app.listen(3000, ()=>{
    console.log('app listening')
});