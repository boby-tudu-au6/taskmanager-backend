import mongoose from 'mongoose';

require('dotenv').config();

mongoose.connect(process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database connected succesfully');
  }).catch((err) => { console.log(err.message); });


// const { logExecutionTime } = require('mongoose-execution-time');
// mongoose.plugin(logExecutionTime);
// const mongoose = require("mongoose")
// "mongodb+srv://js903783:apple4648@formfillup-zasik.mongodb.net/nilu"
