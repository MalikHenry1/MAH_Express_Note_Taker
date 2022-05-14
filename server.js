const express = require('express');
const path = require('path');
const fs = require('fs');
const { json } = require('express');
const { randomInt } = require('crypto');
const uuidv1 = require('uuid').v1;
const util = require('util');
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// POST route for writing note to page Math.floor(Math.random()*500000)
app.post('/api/notes', (req, res) => {
    let allNotes = JSON.parse(fs.readFileSync('./db/db.json'));
    req.body.id = uuidv1();
    allNotes.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(allNotes));
    res.json(allNotes);
});

app.delete('/api/notes/:id', (req, res) => {
  var data = fs.readFileSync('./db/db.json')
      const requestedId = req.params.id;
      let noteInfo = JSON.parse(data);

     const filterNotes = noteInfo.filter(note => note.id !== requestedId) 
        

       
        fs.writeFileSync('./db/db.json', JSON.stringify(filterNotes));
        const response = {
          status: 'success',
        };
        res.json(response);
  
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);



module.exports = app;
