const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/financial_management";

const connectToMongo = () =>{
    mongoose.connect(mongoURI)
    .then((res) => {
        console.log("Connected to Mongo");
    })
    .catch((err) => {
        console.log(err);
});
};

module.exports = connectToMongo;
