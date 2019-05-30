const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//nowadays variant
const connectDB = async () => {
  try {
    await mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true});

    console.log('MongoDB connected');
  } catch(err){
    console.log(err.message);
  //  Exit process with failure
    process.exit(1);
  }
};

//old variant
/*const connectDB = () => {
     mongoose.connect(db, {useNewUrlParser: true})
       .then(() => {console.log('MongoDB connected');})
       .catch((err) => {console.log('Pizdec: ', err.message); process.exit(1);});
};*/

module.exports = connectDB;