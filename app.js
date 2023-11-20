const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('<h1>Hola</h1>')
})

app.get('/movies', (req, res)=>{
    const { genre } = req.query
    console.log(genre)
    
    if (genre){
        const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase()))
        return res.json(filteredMovies)
    } 
    res.json(movies)
})

app.get('/movies/:id', (req, res)=>{
    const { id } = req.params
    const movie = movies.find((movie => movie.id === id))
    if (movie) return res.json(movie)
    res.status(404).json({message: 'not found'})
})

app.post('/movies', (req, res) => {
    const {title, genre, year, director, duration, rate, poster} = req.body

    const newMovies = {
        id: crypto.randomUUID(),
        title,
        genre,
        year,
        director,
        duration,
        rate: rate ?? 0,
        poster
    } 

    movies.push(newMovies)
    res.status(201).json(newMovies)
})

app.use((req, res)=>{
    res.status(404).send('<h1>404</h1>')
})

app.listen(1234, ()=>{
    console.log('Running')
})