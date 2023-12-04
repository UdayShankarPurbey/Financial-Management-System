const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

const Admin = mongoose.model('admin', AdminSchema);
Admin.createIndexes();
module.exports = Admin;