const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routers');
const cors = require('cors');
const path = require('path');

const app = express();


mongoose.connect('mongodb+srv://omnistack:Maringa04@cluster0-qecvi.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);


app.listen(3333);