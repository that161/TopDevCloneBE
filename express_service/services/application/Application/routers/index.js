const applicationRouter = require("./application");

module.exports = (app) => {
    app.use("/", applicationRouter);
};
