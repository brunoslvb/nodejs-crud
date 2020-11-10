const express = require('express');
const app = express();

app.get('/', (req, res) => {

  return res.json({ message: 'Hello World' });

});

app.get('/customers', (req, res) => {

  return res.json({ message: 'Hello Customer' });

});

app.listen(3333, () => {

  console.log('Server running ...');

});
