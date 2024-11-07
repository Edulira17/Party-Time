const router = require("express").Router();

const partyController = require("../controllers/partyController");

// create party:
router.route("/parties").post((req, res) => partyController.create(req, res));

// returns all parties
router.route("/parties").get((req, res) => partyController.getAll(req, res));

// returns individual parties
router.route("/parties/:id").get((req, res) => partyController.get(req, res));

module.exports = router;
