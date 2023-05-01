const MongoClient = require('mongodb').MongoClient;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


app.use(bodyParser.urlencoded({extended: true }));

const url = 'mongodb+srv://madhurmanekar:atlasuser01@nutri-poshan.t2pg1xv.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

// Define a schema for the data
const instituteSchema = new mongoose.Schema({
  instituteName: String,
  instituteEmail: String,
  instituteAddress: String,
  moderatorName: String,
  moderatorEmail: String,
  moderatorPhone: String
});

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/signup.html'));
})

app.post('/signup', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db('mydb').collection('mycollection');
    const result = await collection.insertOne(req.body);

    if (result && result.insertedId) {
      res.status(200).send(`Inserted document with _id: ${result.insertedId}`);
    } else {
      res.status(500).send('Error inserting document');
    }

  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting document');
  } finally {
    await client.close();
  }
});


// Start the server
  const server = app.listen(5000, () => {
    console.log(`Server started on port 3000`);
  });

process.on('SIGINT', () => {
  console.log('Received SIGTERM, shutting down server...');
  server.close(() => {
    console.log('Server has been shut down');
    process.exit(0);
  });
});
