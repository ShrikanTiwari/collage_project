const express = require('express');
const app = express();
const port = 8080;



app.use(express.static('public'));
app.use(express.json());

let players = [];


const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'shrikant_47',
  database: 'scoresnap'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});


app.post('/add-player', (req, res) => {
  const { name, score } = req.body;
  const query = 'INSERT INTO players (name, score) VALUES (?, ?) ON DUPLICATE KEY UPDATE score = ?';
  connection.query(query, [name, score, score], (err) => {
    if (err) return res.status(500).send('DB error');
    res.json({ success: true });
  });
});



app.get('/players', (req, res) => {
  connection.query('SELECT name, score FROM players ORDER BY score DESC', (err, results) => {
    if (err) return res.status(500).send('DB error');
    res.json(results);
  });
});


app.listen(port,'0.0.0.0', () => console.log(`🎮 ScoreSnap running on port ${port}`));
