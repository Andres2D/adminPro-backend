require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Creating the express server
const app = express();

// CORS Configuration
app.use(cors());

// Data Base
dbConnection();

// Routes
app.use('/api/users', require('./routes/user'));

app.listen( process.env.PORT, () => {
  console.log('Server runnig on port ' + process.env.PORT );
} )