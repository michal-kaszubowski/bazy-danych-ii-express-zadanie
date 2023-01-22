const express = require('express');
const app = express();
const products = require('./routes/products');
const cors = require('cors')
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

app.use('/products', products);

require('dotenv').config();
const dbConnData = {
    user: process.env.MONGO_USER || 'admin',
    password: process.env.MONGO_PASSWORD || 'password',
    host: process.env.MONGO_HOST || "127.0.0.1",
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE || 'products'
};

const connectionURI = `mongodb://${dbConnData.user}:${dbConnData.password}@${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`

mongoose
    .connect(process.env.MONGODB_URI || connectionURI, {
        poolSize: 10,
        authSource: "admin",
        user: process.env.MONGO_USER || 'admin',
        pass: process.env.MONGO_PASSWORD || 'password',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(response => {
        console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)
        const port = process.env.PORT || 5000
        app.listen(port, () => {
            console.log(`API server listening at http://localhost:${port}`);
        });
    })
    .catch(error => console.error('Error connecting to MongoDB', error));