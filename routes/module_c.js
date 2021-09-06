const express = require("express");
const router = express.Router();
const { readFile } = require("fs");
const path = require("path");

const filter = [
  { clave: "all", valor: "Sin filtro / Todos" },
  { clave: "city", valor: "Ciudad" },
];
const pathPosts = "../models/posts.json";

router.get("/", (req, res, next) => {
  let posts = "";
  readFile(path.join(__dirname, pathPosts), function (err, data) {
    if (err) {
      console.error("error: ", err);
      res.render("module_c", {
        posts: "",
        filter,
      });
    } else {
      posts = JSON.parse(data);
      res.render("module_c", {
        posts,
        filter,
      });
    }
  });
});

router.post("/", (req, res, next) => {
  const { filterBy, wordFilter } = req.body;
  let posts = "";
  if (filterBy == "all") {
    readFile(path.join(__dirname, pathPosts), function (err, data) {
      if (err) {
        console.error("error: ", err);
        res.render("module_c", {
          posts: "",
          filter,
        });
      } else {
        posts = JSON.parse(data);
        res.render("module_c", {
          posts,
          filter,
        });
      }
    });
  } else if (filterBy == "city" && wordFilter != "") {
    readFile(path.join(__dirname, pathPosts), function (err, data) {
      if (err) {
        console.error("error: ", err);
        res.render("module_c", {
          posts: "",
          filter,
        });
      } else {
        posts = JSON.parse(data);
        let postsFilter = filterDataBy(filterBy, wordFilter, posts);
        res.render("module_c", {
          posts: postsFilter,
          filter,
        });
      }
    });
  } else {
    res.render("module_c", {
      posts: "",
      filter,
    });
  }
});

function filterDataBy(filter, wordFilter, data) {
  let dataFilter = [];
  wordFilter = wordFilter.toLowerCase();
  dataFilter = data.filter((element) =>
    element[filter].toLowerCase().includes(wordFilter)
  );
  return dataFilter == [] ? "" : dataFilter;
}
module.exports = router;
