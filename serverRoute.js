const express = require('express')
const covid_doc = require('./index')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
const routes = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

const PORT = 8080;

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

app.listen(8080, function() {
    console.log(`Server has begun at port ${PORT}`);
})
