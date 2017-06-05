const express=require("express");
const bodyParser=require("body-parser");
const {MongoClient,ObjectId}=require("mongodb");
const _=require("lodash");
const mongojs=require("mongojs");
var db=mongojs("contactList",["contactList"]);

const app=express();
var port=process.env.PORT||3000;
app.use(express.static(__dirname+"/index"));
app.use(bodyParser.json());


app.get("/meanGet",(req,res)=>{

db.contactList.find(function(err,doc){
  res.json(doc);
})

});

app.post("/meanPost",(req,res)=>{

db.contactList.insert(req.body,function(err,data){
  res.json(data);
})
});


app.delete("/meanDel/:id",(req,res)=>{

console.log(ObjectId(req.params.id));
db.contactList.remove({_id:ObjectId(req.params.id)},(err,doc)=>{
  res.json(doc);
});

});
app.get("/meanGet/:id",(req,res)=>{

  console.log(ObjectId(req.params.id));
  db.contactList.find({_id:ObjectId(req.params.id)},(err,doc)=>{
    res.json(doc);
})

});


app.put("/meanUpdate/:id",(req,res)=>{

var id=req.params.id;
db.contactList.findAndModify({query:{_id:ObjectId(id)},
update:{$set:{name:req.body.name,email:req.body.email}},
new:true},function(err,data){
  res.json(data);
});

});




app.listen(port,()=>{
  console.log(`app is running on port : ${port}`)
});
