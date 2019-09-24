const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//Connect Database
connectDB();

// Init Middleware
//like body-parser middleware for parsing incoming req.body object. Now it`s included in express
// (Parse incoming request bodies in a middleware before your handlers, available under the req.body property)
app.use(express.json({extended: false}));

// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

//Serve static assets in production
if(process.env.NODE_ENV === 'production') {
  //  Set static folder
  //  express will serve up production assets like our main.js, or main.css file
  app.use(express.static('client/build'));

  //  express will serve up the index.html file if it does not recognize the route
 app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
 });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));