const express = require("express");
const router = express.Router();
const fs = require('fs');
const { title } = require("process");

const json_post = fs.readFileSync('models/posts.json' , 'utf-8');
const Post = JSON.parse(json_post);


router.get("/", (req, res) => {
  res.render('module_w')
});


router.post("/", (req, res) => {
  var cont=0;
  Post.forEach(function(word) {
  console.log(word.id);
    cont=word.id;
  });
  cont++;
  console.log('tu id sera ' +cont);
  const {id,title ,date,city,Numbers_Contact,Name,Last_Name,poster,description} = req.body;
  var d = new Date();
  if (!title || !city || !Numbers_Contact || !Name || !Last_Name || !poster  || !description) {
    console.log('datos no ingresados por campos vacios');
    res.render('module_w');
    return;

  }


    let newPost = {

    id :cont,
    title,
    date : d,
    city,
    Numbers_Contact,
    Name,
    Last_Name,
    poster,
    comentarios : [],
    description
  }

  Post.push(newPost);

   const json_Post = JSON.stringify(Post);

 

   fs.writeFileSync('models/posts.json', json_Post , 'utf-8');


   console.log(req.body);
   console.log('datos ingresados');
   res.render('module_w');
});

module.exports = router;