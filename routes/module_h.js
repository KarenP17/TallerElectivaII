const express = require("express");
const router = express.Router();
const { readFile } = require("fs");
const path = require("path");
const fs = require('fs');


const pathPosts = "../models/posts.json";


const valorPost=[];

router.get("/", (req, res,next) => {
  res.render('module_h')
});


router.post("/", (req, res,next) => {
  console.log("aqui vamos11 ");
  let posts = "";
  let a= req.body;
  let id1;
  console.log(a);
  readFile(path.join(__dirname, pathPosts), function (err, data) {
    posts = JSON.parse(data);
     let newArr = posts.filter(function (el) {
       let fin =el.comentarios;
      //a.id===posts[0].id
      if (el.id==a.id) {
        let posts1= el.comentarios;
        id1=el.id;
        res.render('module_h',{
          posts1,posts,id1
       });
      }
      if (a.name!=""&&a.Phone!=""&&a.message!="") { 

       if ((a.id)== "`"+el.id) {
        
        posts.forEach(element => {
          console.log((a.id) +" "+"`"+element.id );
          if ((a.id)=="`"+element.id){
            console.log("sssss")
            element.comentarios.push({nombre:a.name,telefono:a.Phone,comentario:a.message});
            const json_Post = JSON.stringify(posts);
            console.log(element.comentarios);
            fs.writeFileSync('models/posts.json', json_Post , 'utf-8');
          }
        });
        res.render('index' ); 
       }

      }
     });      

  });


});


module.exports = router;