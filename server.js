const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(formidable());

// CONNECT MONGODB

mongoose.connect(process.env.MONGODB_URI);

// Importing models

const User = require("./Models/User");

app.post("/form", async (req, res) => {
    try {
        console.log(req.fields);
        const user = new User({
            firstName: req.fields.firstName,
            lastName: req.fields.lastName,
            email: req.fields.email,
            message: req.fields.message
        })
        await user.save();
        res.status(200).json({message: "Contact form received"});
    }
    catch(error) {
        res.status(400).json({message: error.message});
    }
})

app.listen(PORT, () => {
    console.log("Server has started...")
});