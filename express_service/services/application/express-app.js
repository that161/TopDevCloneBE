const express = require("express");
const bodyParser = require("body-parser");
const routers = require("./Application/routers");

module.exports = async (app) => {
    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded({ extended: true, limit: "1mb" }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(__dirname + "/public"));

    routers(app);
};
