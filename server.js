const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
  origin: 'http://localhost:4200', // replace with the origin of your Angular app
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

let methode = {
  idMethode: 1,
  introduction: 'Initial introduction text.'
};

// Endpoint to get the methodology
app.get('/methodes', (req, res) => {
  res.json(methode);
});

// Endpoint to update the methodology
app.put('/methodes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (id === methode.idMethode) {
    methode = { ...methode, ...req.body };
    res.json(methode);
  } else {
    res.status(404).send('Methode not found');
  }
});

const port = 8089;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
