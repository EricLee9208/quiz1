const { response } = require("express");
const path = require("path");
const express = require("express");
const app = express();

const logger = require("morgan");
app.use(logger("dev"));
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use((req, res, next) => {
  const username = req.cookies.username;
  res.locals.username = "";

  if (username) {
    res.locals.username = username;
  }
  next();
});

app.use(express.urlencoded({ extended: true }));

const methodOverride = require("method-override");

// ---------------Method Overrride Middleware--------------
app.use(
  methodOverride((req, res) => {
    if (req.body && req.body._method) {
      const method = req.body._method;
      return method;
    }
  })
);

app.use(express.static(path.join(__dirname, "public"))); // for public folder where you hold images or styling that will be used

// app.set("views", path.join(__dirname, "views")); // letting view know where to find the view files
app.set("view engine", "ejs");
app.set("views", "views");

const PORT = 3000;
const DOMAIN = "localhost";

app.listen(PORT, DOMAIN, () => {
  console.log(`Server is listening on http://${DOMAIN}:${PORT}`);
});

//============ LOGIC START HERE ============

app.get("/sign_in", (req, res) => {
  res.render("cluck/sign_in");
});

app.post("/sign_in", (req, res) => {
  const username = req.body.username;
  const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24;
  res.cookie("username", username, { maxAge: COOKIE_MAX_AGE });
  res.redirect("/");
});

app.post("/sign_out", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.redirect("/cluck");
});

app.get("/new", (req, res) => {
  res.render("cluck/new");
});

const cluckRouter = require("./routes/cluckRouter");
app.use("/cluck", cluckRouter);
