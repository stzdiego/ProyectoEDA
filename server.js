const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const functions = require('./scripts/util.js');

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/calculate', (req, res) => {
  const inputData = req.body.data;
  let result = functions.resolverConcurso(inputData);
  res.json(result);
});

app.post('/calculate2', (req, res) => {
  const inputData = req.body.data;
  let result = functions.calculateInformation(inputData);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
