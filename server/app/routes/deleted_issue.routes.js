//api/deleted_issues/ POST

module.exports = app => {

    const deleted_issues = require("../controllers/deleted_issue.controller");

    var router = require("express").Router();

    router.post("/", deleted_issues.create);

    app.use('/api/deleted_issues', router);
}

