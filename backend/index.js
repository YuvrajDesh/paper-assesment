const connectMongo = require('./db')
const express = require('express')
const app = express()
const port = 5000
app.use(express.json());
connectMongo()
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./routes/auth'))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  