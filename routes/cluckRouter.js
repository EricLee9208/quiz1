const express = require("express");
const knex = require("../db/client");
const router = express.Router();

router.get("/", (req, res) => {
  knex("cluckr")
    .orderBy("createdAt", "desc")
    .then((cluck) => {
      res.render("cluck/cluckList", { cluck: cluck });
    });
});

router.get("/new", (req, res) => {
  if (res.locals.username) {
    res.render("cluck/new");
  } else {
    res.render("cluck/sign_in");
  }
});

router.post("/new", (req, res) => {
  knex("cluckr")
    .insert({
      username: res.locals.username,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
    })
    .returning("*")
    .then(() => res.redirect("/cluck"));
});

module.exports = router;
