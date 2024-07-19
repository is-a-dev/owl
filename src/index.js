const express = require("express");
const app = express();

require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require('multer');
const ejs = require("ejs");


const port = process.env.PORT || 3000;

const router = require("./util/router");

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/", router);

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
});