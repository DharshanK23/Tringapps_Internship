const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '#Dharshan237',
  database: 'formdb',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database');
});


app.post('/user', (req, res) => {
  const { name, email, gender, locat, language, project } = req.body;
  const sql = "INSERT INTO user (name, email, gender, locat, language, project) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [name, email, gender, locat, language.join(', '), project];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.json({ success: false, error: err.message });
    }
    return res.json({ success: true, result });
  });
});


app.get('/users', (res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
    return res.status(200).json(rows);
  });
});


app.put('/user', (req, res) => {
  const { id, name, email, gender, locat, language, project } = req.body;
  const sql = "UPDATE user SET name=?, email=?, gender=?, locat=?, language=?, project=? WHERE id=?";
  const values = [name, email, gender, locat, language.join(', '), project, id];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.json({ success: false, error: err.message });
    }
    return res.json({ success: true, result });
  });
});


app.delete('/user', (req, res) => {
  const { id } = req.body;
  const sql = "DELETE FROM user WHERE id=?";
  db.query(sql, id, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.json({ success: false, error: err.message });
    }
    return res.json({ success: true, result });
  });
});

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
