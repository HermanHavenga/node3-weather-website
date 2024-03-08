const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dir to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Herman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Herman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Herman',
        helpMsg: 'This is the help msg.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide an address to search!"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error)
        {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, {temperature, feelsLike}) => {
            if(error) {
                return res.send({error})
            }
            
            res.send({
                location,
                weatrher: temperature,
                feelsLike
            })
        })
    })   
})

app.get('/help/*', (req, res) => {
    res.render('404_page', {
        title: '404',
        name: 'Herman',
        errorMsg: 'Help article not found. '
    })
})

app.get('*', (req, res) => {
    res.render('404_page', {
        title: '404',
        name: 'Herman',
        errorMsg: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})