const path = require('path')
const express = require('express')
const hbs =  require('hbs')
const geocode = require('./utils/geocode')
const forecast =  require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//setup static directory for use 
app.use(express.static(publicDirectoryPath))

//setup handlebars engine and custom views directory location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.get('',(req,res) =>{
    res.render('index',{
        title : 'Weather App',
        name : 'Nouman Jamil'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About',
        name : 'Nouman Jamil'

    })
})

app.get('/help',(req,res) => {
    res.render('help',{
    title : "Help",
    name : "Nouman Jamil"
})
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
           error : 'Please provide location'
        })
    }

    geocode(req.query.address,(geocodeError,
        {
        lattitude,
        longitude,
        location
    }) =>  {
        if(geocodeError){
            return res.send({geocodeError})
        }
        forecast(lattitude,longitude,(forecastError,forecastData) => {
            if(forecastError){
                return res.send({error})
            }

          return  res.send({
                forecast : forecastData,
                location,
                address : req.query.address

            })
        })
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia'
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})