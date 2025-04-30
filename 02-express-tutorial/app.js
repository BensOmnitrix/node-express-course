const express = require("express");
const app = express();
let { people } = require("./data");

//static assets
app.use(express.static("./methods-public"));
//Parse form data
app.use(express.urlencoded({ extended: false }));
//parse json data
app.use(express.json());

app.post("/login", function (req, res) {
  const { name } = req.body;
  if (!name) {
    return res.status(401).send("Please provide the valid credetials");
  }
  res.status(200).send(`Welcome to our platform ${name}`);
});

app.post("/api/people", function (req, res) {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  }
  res.status(201).json({ success: true, person: name });
});

app.post("/api/postman/people", function (req, res) {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  }
  res.status(201).send({success:true, data: [...people,name]});
});

app.get("/api/people", function (req, res) {
  res.status(200).json({ success: true, data: people });
});

app.put('/api/people/:id',function(req,res){
  const {id} = req.params;
  const {name} = req.body;

  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    return res
      .status(400)
      .json({ success: false, msg: "No person with the given id" });
  }
  const newPeople = people.map((person) =>{
    if(person.id === Number(id)){
      person.name = name;
    }
    return person;
  })
})

app.listen(5000, function () {
  console.log("Server is listening on the port 5000...");
});
