const filmes = require("../models/filmes.json");
const fs = require("fs");

exports.get = (req, res) => {
  console.log(filmes.length)
  res.status(200).send(filmes);
};

exports.getByDirector = (req, res) => {
  const director = req.params.director;
  const movies = filmes.filter(filme => filme.director === director);
  res.status(200).send(movies);
};

exports.getByGenre = (req, res) => {
  const genre = req.query.genre;
  const movies = filmes.filter(filme => filme.genre.includes(genre));
  console.log(movies.length, 'x')
  res.status(200).send(movies);
};

exports.getByGenre = (req, res) => {
  const genre = req.query.genre;
  const movies = filmes.filter(filme => filme.genre.includes(genre));
  res.status(200).send(movies);
};

exports.post = (req, res) => {
  const { title, year, director, duration, genre, rate } = req.body;
  filmes.push({ title, year, director, duration, genre, rate });

  fs.writeFile(
    "src/models/filmes.json",
    JSON.stringify(filmes),
    "utf-8",
    err => {
      if (err) {
        return res.status(500).send({ message: err });
      }
    }
  );

  res.status(201).send(filmes);
};

exports.postGenreByMovie = (req, res) => {
    const index = req.params.index;
    const filme = filmes[index-1];

    const { genre } = req.body;
    filme.genre.push( genre );
    filmes.splice(index -1, 1, filme)
  
    fs.writeFile(
      "src/models/filmes.json",
      JSON.stringify(filmes),
      "utf-8",
      err => {
        if (err) {
          return res.status(500).send({ message: err });
        }
      }
    );
  
    res.status(201).send(filmes);
  };