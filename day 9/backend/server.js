const express = require('express');//handle HTTP request
const mysql = require('mysql');
const cors = require('cors');//making API accessible from different domains

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({  
  host: 'localhost',
  user: 'root',
  password: '#Dharshan237',
  database: 'form'
});

db.connect((err) => {  
  if (err) {  
    console.error("Error connecting to database:",err);
    return;
  }  
  console.log("Database connected successfully");
});

app.post('/user', (req, res) => {
  const { name,email,gender,locat,project} = req.body;//use data from (1)
  const sql = "INSERT INTO user (name,email,gender,locat,language,project) VALUES (?,?,?,?,?,?)";
  const language = Array.isArray(req.body.language) ? req.body.language.join(', ') : req.body.language;
  db.query(sql,[name,email,gender,locat,language,project], (err, result) => {
    try{
      return res.send(result);
    }
    catch(error){
    console.error("Error in post method",err);}
  });
});

app.get('/users',(req,res) => {
  const sql = "SELECT*FROM user";
  db.query(sql,(err,rows) => {
    try{
      return res.send(rows);
    }
    catch(error){
    console.error("Error in get method",err);}
  });
});

app.delete('/del/:id',(req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM user WHERE id = ?";
  db.query(sql,id,(err,result) => {
    try{
      return res.send(result);
    }
    catch(error){
    alert("Error in delete method",err);}
  });
});

app.put('/userupdate/:id',(req,res) => {
  const { id } = req.params;
  const { name,email,gender,locat,project} = req.body;
  const sql = "UPDATE user SET name = ?,email = ?,gender = ?,locat = ?,language = ?,project = ? WHERE id = ?";
  const language = Array.isArray(req.body.language) ? req.body.language.join(', ') : req.body.language;
  db.query(sql,[name,email,gender,locat,language,project,id],(err,rows) => {
    try{
      return res.send(rows);
    }
    catch(error){
    console.error("Error in put method",err);}
  });
});

app.listen(8081, () => {  
  console.log("Server is running on port...");
});
