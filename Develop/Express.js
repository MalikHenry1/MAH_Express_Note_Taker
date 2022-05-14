const express = require('express');
const path = require('path');
const fs = require('fs');
const { json } = require('express');
const { randomInt } = require('crypto');

// const api = require('./routes/index.js');
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api', api);
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Get route for accessing entered note data
app.get('/api/notes', (req,res) => {
    let allNotes = JSON.parse(fs.readFileSync('./db/db.json'));
    res.json(allNotes);
})

// POST route for writing note to page
app.post('/api/notes', (req, res) => {
    let allNotes = JSON.parse(fs.readFileSync('./db/db.json'));
    req.body.id = Math.floor(Math.random()*500000);
    allNotes.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(allNotes));
    res.json(allNotes);
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
