const connectToMongo = require("./db");
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

connectToMongo();

app.use(cors());
app.use(express.json());


// //Available Routes 
app.use('/api/admin/auth',require('./routes/adminauth'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/trans',require('./routes/trans'));


app.listen(port,()=>{
    console.log(`"Financial Management" listen at port: http://localhost:${port}`);
})