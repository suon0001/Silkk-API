const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

require("dotenv-flow").config();
// DEFINITIONS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start Server
const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
    console.log("Server running on port: " + PORT);
})

// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// CONNECT TO MONGOdb
mongoose.connect(
    process.env.DBHOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
).catch(error => console.log("Error connecting to MongoDB: " + error));
mongoose.connection.once('open', () => console.log('Connected succesfully to MongoDB'));

// IMPORT ROUTES
const projectRoute = require('./routes/project');
const authRoute = require('./routes/auth');

// ROUTES
app.get("/api/welcome", (res) => {
    res.status(200).send({ message: "Welcome to the Silkk-API" });
})

// CRUD
app.use("/api/project", projectRoute);
app.use("/api/user", authRoute);

module.exports = app;