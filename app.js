const express = require('express')
const ejs = require('ejs');
const app = express()
const port = 3000
var bodyParser = require('body-parser')

const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "contact",
  password: "whdghks12",
  port: 5432,
});
client.connect();

app.set('view engine','ejs')
app.set('views','./views')
app.use(bodyParser.urlencoded({ extended: false }))

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

app.post('/contactProc', (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const memo = req.body.memo;

  const query = {
    text: 'INSERT INTO contact(name, phone, email, memo) VALUES($1,$2,$3,$4)',
    values: [name, phone, email, memo],
  };

  client.query(query, (err, result) => {
    if (err) {
      console.error('Error inserting data into PostgreSQL:', err);
      res.status(500).send('Error inserting data into PostgreSQL');
    } else {
      console.log('Data inserted successfully into PostgreSQL');
      res.send("<script> alert('문의사항이 등록되었습니다.'); location.href= '/'</script>");
    }
  });
});

app.get('/test', (req, res) => {
  res.send('<h1>test<h1>')
})



app.listen(port, () => {
  console.log(`test1 adress : http://localhost:${port}`)
 
  process.on('SIGINT', () => {
    console.log('Closing PostgreSQL client');
    client.end();
    process.exit();
  });
})