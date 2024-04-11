const express = require("express");
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;
const uri = "mongodb+srv://dharanireddii08:@cluster0dharanireddy08.mw6j9kb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let collection;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function connectToDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully");
        const database = client.db('your_database_name');
        collection = database.collection('formEntries');
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

app.post('/submit-form', async (req, res) => {
    try {
        const formData = req.body;
        await collection.insertOne(formData);
        console.log("Form data inserted into MongoDB:", formData);
        res.status(200).json({ success: true, message: "Form submitted successfully" });
    } catch (error) {
        console.error("Error inserting form data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectToDB();
});
