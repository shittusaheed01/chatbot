const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors')


const sessionMiddleware = require("./config/sessionMiddleware");

// app.use(cors())

app.use(express.static(path.join(__dirname, "public")));

app.use(sessionMiddleware);

module.exports = app;
