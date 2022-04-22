const express = require('express');
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Default response for any other request (Not Found)
// PLACE AT THE BOTTOM OF THE CODE
// Will override any routes placed below it such as GET POST, etc
app.use((req, res) => {
    res.status(404).end();
  });