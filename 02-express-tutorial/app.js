const express = require("express");
const app = express();
let {people} = require('./data');

app.use(express.static('./methods-public'));

app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.post('/login',function(req,res){
  const {name} = req.body;
  if(name){
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send('Please provide credentials');
})

app.get('/api/people',function(req,res){
  res.status(200).json({success:true, data: people});
})

app.post('/api/people',function(req,res){
  const {name} = req.body;
  if(!name){
    return res.status(400).json({success:false, msg: 'Please provide name value'});
  }
  res.status(201).send({success:true,people});
})

app.listen(5000, function () {
  console.log("Server is listening on the port 5000...");
});
