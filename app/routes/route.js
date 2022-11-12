const express = require("express")
const textDoc = require("../controllers/controller")

const router = express.Router()

router.route("/find?:id")
    .get(textDoc.findOne)

router.route("/")
    .get(textDoc.getAll)
    .post(textDoc.create)

router.route("/:id")
    .get(textDoc.get)
    .put(textDoc.update)
    .delete(textDoc.delete)

module.exports = router
