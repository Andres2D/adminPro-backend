require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Creating the express server
const app = express();

// CORS Configuration
app.use(cors());

// Read and parse of the body
app.use(express.json());

// Data Base
dbConnection();

// Public directory
app.use(express.static('public'));

// Routes
app.use('/api/users', require('./routes/user'));
app.use('/api/hospitals', require('./routes/hospital'));
app.use('/api/doctors', require('./routes/doctor'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/all', require('./routes/searchs'));
app.use('/api/upload', require('./routes/uploads'));

app.listen( process.env.PORT, () => {
  console.log('Server runnig on port ' + process.env.PORT );
})
