const express = require('express')
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')

app.get('/', (req, res)=>{
    res.send('<h1>Hola</h1>')
})

app.get('/movies', (req, res)=>{
    res.json(movies)
})

app.use((req, res)=>{
    res.status(404).send('<h1>404</h1>')
})

app.listen(1234, ()=>{
    console.log('Running')
})