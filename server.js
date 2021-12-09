const express = require('express')
var cors = require('cors')
const covid_Doc = require('./index')
const bodyParser = require('body-parser')

const app = express();
const PORT = 8080;
const routes = express.Router();

// Data Parsing
// Enabling Middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/all-covid-Data', (req, res) => {
    covid_Doc.find({})
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
});

app.post('/add-data', (req, res) => {
    console.log(req.body);
    const newData = new covid_Doc(req.body);
    console.log('New Data = ' + newData);
    newData.save()
    .then(function(value) {
        console.log(value);
    })
    .catch(err => {
        res.status(400).send('Adding new Data failed');
    })
})

routes.route('/').get(function(req, res) {
    covid_doc.find(function(err, docs) {
        if(err) {
            console.log(err);
        } else {
            res.json(docs);
        }
    });
});

routes.route('/add-data').post(function(req, res) {
    console.log(req.body);
    const newData = new covid_doc(req.body);
    console.log('New Covid Data ' + newData)
    newData.save()
        .then(docs => {
            res.status(200).json({ 'Data': 'Data added succesfully' })
        })
        .catch(err => {
            res.status(400).send('adding new data has failed')
        });
});

app.use('/docs', routes);

app.listen(PORT, function() {
    console.log(`Server started ${PORT}`);
});