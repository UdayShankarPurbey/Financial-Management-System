const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Transaction = require('../models/Transaction');
const {body , validationResult} =  require('express-validator')


//Route 1 : Fetch all Transaction using : GET: "/api/trans/fetchalltransaction".Login Required.
router.get('/fetchalltransaction', fetchuser, async (req, res) => {
    try {
        const transactionData = await Transaction.find({ user: req.user.id });
        res.json(transactionData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error occured");
    }

});


//Route 2 : Add a new Transaction using : POST: "/api/trans/addtransaction".Login Required.
router.post('/addtransaction', fetchuser, [ 
    body('label'),
    body('money'),
    body('tag', "Enter a Tag "),
    body('description', "Enter a Description (must be atleast 5 Character.").isLength({ min: 5 }),
    body('transactionType'),

], async (req, res) => {
    try {
        const {label, money, description, tag , transactionType } = req.body;

        //if error occured return bad request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const transaction = new Transaction({
            label,money, description, tag, transactionType, user: req.user.id
        })
        const savedTransaction = await transaction.save();

        res.json(savedTransaction);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error occured");
    }

});

//Route 3 : Update an Existing Transaction using : PUT: "/api/trans/updatetransaction".Login Required.
router.put('/updatetransaction/:id', fetchuser, async (req, res) => {
    const {label, money, description, tag , transactionType } = req.body;

    try {
        //Create a newTransaction Object.
        const newTransaction = {};

        if (label) {newTransaction.label = label};
        if (money) { newTransaction.money = money };
        if (description) { newTransaction.description = description };
        if (tag) { newTransaction.tag = tag };
        if (transactionType) {newTransaction.transactionType = transactionType};

        //find the Transaction to be updated and update it.
        let transactionData = await Transaction.findById(req.params.id);
        if (!transactionData) { return res.status(404).send("Not Found") }

        //Allow user to update Transaction ,if Transaction belong to the user.
        if (transactionData.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        transactionData = await Transaction.findByIdAndUpdate(req.params.id, { $set: newTransaction }, { new: true })

        res.json({ transactionData })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error occured");
    }
})

//Route 4 : Delete an Existing Transaction using : DELETE: "/api/trans/deletetransaction".Login Required.
router.delete('/deletetransaction/:id', fetchuser, async (req, res) => {
    try {
        //find the notes  and delete it.
        let transactionData = await Transaction.findById(req.params.id);
        if (!transactionData) { return res.status(404).send("Not Found") }

        //Allow user to delete notes if notes belong to the user.
        if (transactionData.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        transactionData = await Transaction.findByIdAndDelete(req.params.id);
        res.json({ "successs": "Transaction Deleted Successfully", transactionData: transactionData });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server error occured");
    }
})  

module.exports = router;