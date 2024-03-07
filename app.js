const express = require('express')
const ejs = require('ejs');
const app = express()
const port = 3000


app.set('view engine','ejs')
app.set('views','./views')

//routing
app.get('/', (req, res) => {
  res.render('index') // ./views/index.ejs
})

app.get('/profile', (req, res) => {
  res.render('profile') // ./views/index.ejs
})

app.get('/map', (req, res) => {
  res.render('map') // ./views/index.ejs
})

app.get('/contact', (req, res) => {
  res.render('contact') // ./views/index.ejs
})

app.get('/test', (req, res) => {
  res.send('<h1>test<h1>')
})

app.listen(port, () => {
  console.log(`test1 adress : http://localhost:${port}`)
})