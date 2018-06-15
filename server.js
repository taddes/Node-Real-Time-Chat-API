// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

app = express();

// Server listen
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
