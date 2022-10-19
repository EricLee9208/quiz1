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
  const content = req.body.content.toString();
  let hashtagObj = {};

  if (content.indexOf("#") > -1) {
    let contentArr = content.split(" ");
    for (const word of contentArr) {
      if (word.indexOf("#") > -1) {
        if (hashtagObj[word]) {
          hashtagObj[word] += 1;
        } else {
          hashtagObj[word] = 1;
        }
      }
    }
  }
  //   console.log(hashtagObj);

  knex("cluckr")
    .insert({
      username: res.locals.username,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
    })
    // .then(() => {
    //   for (const key in hashtagObj) {
    //     knex
    //       .select("count")
    //       .from("hashtag")
    //       .where("tag", key)
    //       .then((counts) => {
    //         // then inside for loop 11111
    //         console.log(counts);
    //         console.log(key);
    //         console.log(hashtagObj[key]);
    //         if (counts.length === 0) {
    //           knex("hashtag").insert({
    //             tag: key,
    //             count: hashtagObj[key],
    //           }); // closing insert
    //         } // closing if
    //         else {
    //           knex("hashtag")
    //             .where("tag", key)
    //             .increment("count", hashtagObj[key]); // closing update
    //         } // closing else
    //       }); // then inside for loop 1111
    //   } // closing for loop
    // }) // closing then
    .then(() => res.redirect("/cluck"));
}); // closing post function

module.exports = router;
