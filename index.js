const mongoose = require('mongoose');

const mongo_URL = 'mongodb://localhost:27017/CovidData';
mongoose.connect(mongo_URL,  {useUnifiedTopology: true,useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', function(err) {
    console.log('Error occured during connection ' + err);
});

db.once('connected', function() {
    console.log((`Connected to ${mongo_URL}`));
})

// Creating the Schema for DATA

const Covid_Data_Schema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    cases: {
        type: Number,
        required: true
    },
    deaths: {
        type: Number,
        required: true
    }
})

// Creating the model 

const covid_Doc = mongoose.model('modelname', Covid_Data_Schema, 'CovidData');

// const doc1 = new covid_Doc({ date: '23/01/2020', state: 'Washington', cases: '1', deaths: '0' });

//doc1.save(function (err, doc) {
//   if (err) {
//        console.log('Saving single document', doc);
//    }
//})

covid_Doc.find({})
        .exec()
        .then(docs => {
            console.log('Showing multiple documents')
            docs.forEach(function(Doc) {
                console.log(Doc.date, Doc.state, Doc.cases, Doc.deaths);
            })
        })
        .catch(err => {
            console.error(err);
        })

module.exports = covid_Doc;