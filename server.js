const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

// App
const app = express()
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/hello', (req, res) => res.send('Pakapaki'))

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

  

const port = process.env.PORT || 4200;
app.listen(port, () => console.log(`App listening at ${port} : Time: ${formatDate(new Date)}`))