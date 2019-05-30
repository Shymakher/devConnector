const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

// Init Middleware
//like body-parser middleware for parsing incoming req.body object. Now it`s included in express
// (Parse incoming request bodies in a middleware before your handlers, available under the req.body property)
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API running'));
// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));