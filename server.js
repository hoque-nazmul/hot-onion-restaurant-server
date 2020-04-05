const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

// App
const app = express()
app.use(bodyParser.json())
app.use(cors())

const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });

app.post('/addAllFoods', (req, res)=> {
    const foods = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("hotOnion").collection("foods");
    collection.insert(foods, (error, result) => {
        if(error) {
            console.log(error);
            res.status(500).send({message:error});
        }
        else {
            res.send(result.ops[0]);
        }
    })
    client.close();
    });
});

app.post('/addFood', (req, res) => {
    const food = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("hotOnion").collection("foods");
    collection.insertOne(food, (error, result) => {
        if(error) {
            console.log(error);
            res.status(500).send({message:error});
        }
        else {
            res.send(result.ops[0]);
        }
    })
    client.close();
    });
});

app.get('/getFoods', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("hotOnion").collection("foods");
    collection.find().toArray((error, documents) => {
        if(error) {
            console.log(error);
            res.status(500).send({message:error});
        }
        else {
            res.send(documents);
        }
    })
    client.close();
    });
});

app.get('/getFood', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("hotOnion").collection("foods");
    collection.find({name : "Nzmul Hoque" }).toArray((error, result) => {
        if(error) {
            console.log(error);
            res.status(500).send({message:error});
        }
        else {
            res.send(result);
        }
    })
    client.close();
    });
});

app.get('/', (req, res) => res.send("Hello Word, I am from server."));

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

  

const port = process.env.PORT || 4200;
app.listen(port, () => console.log(`App listening at ${port} : Time: ${formatDate(new Date)}`))