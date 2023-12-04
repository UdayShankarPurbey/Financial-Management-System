const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    label : {
        type: String,
    },
    money : {
        type : Number,
        required : true
    },
    tag : {
        type: String,
        required: true
    },
    description : {
        type: String,  
    },
    transactionType : {
        type: String, 
        required : true 
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Transaction = mongoose.model('trans', TransactionSchema);
Transaction.createIndexes();
module.exports = Transaction;


