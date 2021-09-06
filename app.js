const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const RouterC = require("./routes/module_c.js");
const RouterH = require('./routes/module_h');
const RouterW = require('./routes/module_w');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/search_posts", RouterC);
app.use('/new_post', RouterW);
app.use('/foro', RouterH);

app.get("/", (req, res) => {
  res.render('index')
});

app.get("*", (req, res) => {
  res.render('not_found')
});

app.listen(3000, (req, res) => {
  console.log("Server running at PORT:",3000);
});
