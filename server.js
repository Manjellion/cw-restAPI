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

app.get('/total-reports', (req, res) => {
    covid_Doc.count( {}, function(err, result) {
        if(err) {
            res.send(err)
        } else {
            res.json(result)
        }
    });
});

app.get('/all-data', (req, res) => {
    covid_Doc.find(function(err, allData) {
        if (err) {
            console.log(err);
        } else {
            res.json(allData)
        }
    })
})

app.get('/all-covid-Data', (req, res) => {
    covid_Doc.find({})
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
});

// async is used as data is being manipulated in the mongodb
app.post('/add-data', (req, res) => {
    console.log(req.body);
    const newData = new covid_Doc(req.body);
    console.log('New Data = ' + newData);
    newData.save()
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        res.status(400).send(err);
    })
})

app.delete("/delete/:id", (req, res) => {
    covid_Doc.findByIdAndRemove(req.params.id).exec((error, deletedData) => {
        if (error) {
            res.send(error)
        } 
        return res.json(deletedData);
    });
});

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
    const newDataJSON = JSON.stringify(newData);
    console.log('New Covid Data ' + newDataJSON)
    newDataJSON.save()
        .then(data => {
            res.status(200).json({ 'Data': 'Data added succesfully' })
            console.log(data);
        })
        .catch(err => {
            res.status(400).send(err)
            console.log(err);
        });
});

app.use('/Data', routes);

app.listen(PORT, function() {
    console.log(`Server started ${PORT}`);
});