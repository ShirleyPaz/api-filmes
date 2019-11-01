const express = require('express');
const app = express();

//routes
const index = require('./routes/index');
const filmesRoutes = require('./routes/filmesRoutes');

app.use(express.json())

app.use('/', index);
app.use('/filmes', filmesRoutes);

module.exports = app;