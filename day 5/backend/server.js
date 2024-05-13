const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '#Dharshan237',
  database: 'formdb'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to database');
});

app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM user';
  console.log(query);

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving users: ', error);
      res.status(500).json({ error: 'Failed to retrieve users' });
      return;
    }
    res.status(200).json(results); 
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
