const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// path for express configuration
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

// set up handlebars engine and views location (both set are needed one to provide template, another to provide locn)
app.set('view engine','hbs') //to use dynamic templates like hbs (handlebar) (template engine)
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Riya Bajaj'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me!',
        name: 'Riya Bajaj'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Riya Bajaj',
        help1: 'For about section go to /about',
        help2: 'For homepage go to home'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'address was not given'
        })
    }

    // callback chaining
    geocode( req.query.address ,  (error, {latitude, longitude, location} = {}) => {
        // if geocode doesn't work properly
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude , longitude , (error, forecastData) => {
            // if geocode works but forecast doesn't
            if(error) {
                return res.send({
                    error
                })
            }
            // when everything goes correct ie. we have locn and error
            // console.log(location)
            // console.log(forecastData)
            res.send({
                location,
                forecastData,
                address: req.query.address
            })
        })
    })
})


// app.get('/products', (req,res) => {
//     if(!req.query.search){
//         return res.send({
//             error: 'cannot find the search term'
//         })
//     }
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req,res) =>{
    res.render('404_page', {
        title: '404 page',
        name: 'Riya Bajaj',
        error_mes: 'Help article not found'
    })
})
// it needs to be last since it will first check the static webpages, if not there, it will check app.get wale routes sequentially
app.get('*', (req,res) => {
    res.render('404_page', {
        title: '404 page',
        name: 'Riya Bajaj',
        error_mes: 'Page not found'
    })
})
// configures our app what to do when someone accesses a resource of specific url
// app.get('' , (req , res) => { // root page since no partial route is given in the string // app.com
//     res.send('Hello Express!')
// })

// app.get('/help' , (req, res) =>{
//     res.send('Help section!')
// })

// app.get('/about' , (req, res) => {
//     res.send('<h1>About Section</h1>')
// })


app.listen(port , () => { //to start the web server, port=3000, callback fn= which will run when server starts
    console.log('Server is up on port '+port) //asynchronous but happens instantly
})