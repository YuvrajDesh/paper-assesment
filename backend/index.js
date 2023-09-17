const {connectMongo} = require('./db')
const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const cors = require('cors'); // Import the cors package
const port = 5000

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
connectMongo()
// Enable CORS for all routes (for development purposes)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/pdfs', require('./routes/pdfs'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  