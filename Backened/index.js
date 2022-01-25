const connectToMongo = require('./db');
const express = require('express')
const cors = require("cors")
connectToMongo();

const app = express()
const port = 5000

app.use(cors())

app.use(express.json())
//  Available routes

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes.js'))
// app.get('/a/b',(req,res) =>{
//     res.send("Welcome to Inotebok")
// }) 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

