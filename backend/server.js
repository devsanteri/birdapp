const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
console.log(uri);
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true, 
                       useCreateIndex: true, useFindAndModify: false }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection is working");
});

const birdRouter = require('./routes/birds');

app.use('/birds', birdRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);

});