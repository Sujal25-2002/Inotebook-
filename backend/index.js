const connectToMongo = require("./db");
const express = require('express')
connectToMongo();

const app = express()
const port = 5000


//if you want you use request body so for that you have to set middleware before it 
app.use(express.json())
//available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
