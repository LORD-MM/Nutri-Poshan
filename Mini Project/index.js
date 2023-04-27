const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri = "mongodb+srv://madhurmanekar:atlasuser01@nutri-poshan.t2pg1xv.mongodb.net/test";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("connected to Mongodb")
    } catch (error) {
        console.error(error);
    }
}

connect();

app.listen(8000, () => {
    console.log("Server started on post 8000");
})