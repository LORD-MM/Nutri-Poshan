// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();

// const uri = "mongodb+srv://madhurmanekar:atlasuser01@nutri-poshan.t2pg1xv.mongodb.net/test";

// async function connect() {
//     try {
//         await mongoose.connect(uri);
//         console.log("connected to Mongodb")
//     } catch (error) {
//         console.error(error);
//     }
// }

// connect();

// app.listen(8000, () => {
//     console.log("Server started on post 8000");
// })

const express = require('express');
const mongoose = require('mongoose');

// Create an instance of the express application
const app = express();

// Connect to the MongoDB Atlas cluster
mongoose.connect('mongodb+srv://madhurmanekar:atlasuser01@nutri-poshan.t2pg1xv.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error(error);
  });

// Define the MongoDB schema and model for the institute collection
const InstituteSchema = new mongoose.Schema({
  instituteName: {
    type: String,
    required: true
  },
  instituteEmail: {
    type: String,
    required: true
  },
  instituteAddress: {
    type: String,
    required: true
  },
  moderatorName: {
    type: String,
    required: true
  },
  moderatorEmail: {
    type: String,
    required: true
  },
  moderatorPhone: {
    type: String,
    required: true
  },
  /*institutePass: {
    type: String,
    required: true
  }*/
});

//console.log(InstituteSchema.instituteName);
const Institute = mongoose.model('Institute', InstituteSchema);

// Parse incoming form data
app.use(express.urlencoded({ extended: true }));

// Handle form submission
app.get('/signup', async (req, res) => {
  
  console.log(req.body);
  
  const {
    instituteName,
    instituteEmail,
    instituteAddress,
    moderatorName,
    moderatorEmail,
    moderatorPhone,
    //institutePass
  } = req.body;

  // Create a new institute document
  const institute = new Institute({
    instituteName,
    instituteEmail,
    instituteAddress,
    moderatorName,
    moderatorEmail,
    moderatorPhone,
    //institutePass
  });

  try {
    // Save the document to the database
    await institute.save();
    res.send('Form submitted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
