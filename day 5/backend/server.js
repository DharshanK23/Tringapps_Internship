const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '#Dharshan237',
  database: 'formdb'
})

app.post('/formdb', (req, res) => {
  const sql = "INSERT INTO user (name, email, gender, locat, language, project) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.gender,
    req.body.locat,
    req.body.language,
    req.body.project,
  ]
  connection.query(sql, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error inserting data' });
    }
    return res.json({ success: true, data: data });
  });
});

app.listen(8081, () => {
  console.log("Listening...");
});
