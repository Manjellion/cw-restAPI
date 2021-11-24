const express = require('express')
const doc1 = require('./index')
const covid_Doc = require('./index')

const app = express();
const PORT = 8080;

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Covid restAPI")
})

app.get('/all-covid-Data', (req, res) => {
    covid_Doc.find({})
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
})

app.listen(PORT, function() {
    console.log(`Server started ${PORT}`);
})