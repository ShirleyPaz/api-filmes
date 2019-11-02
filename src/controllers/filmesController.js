const filmes = require("../models/filmes.json");
const fs = require("fs");

exports.get = (req, res) => {
  console.log(filmes.length);
  res.status(200).send(filmes);
};

exports.getByDirector = (req, res) => {
  const director = req.params.director;
  const movies = filmes.filter(
    filme =>
      filme.director.replace(" ", "").toUpperCase() ===
      director.replace(" ", "").toUpperCase()
  );
  if (movies.length == 0) {
    return res.status(500).send("Diretor não encontrado");
  }
  res.status(200).send(movies);
};

exports.getByGenre = (req, res) => {
  const urlGenre = req.query.genre;

  movies = filmes.reduce((filteredFilmes, filme) => {
    const newGenre = filme.genre.filter(
      genre =>
        genre.replace(" ", "").toUpperCase() ===
        urlGenre.replace(" ", "").toUpperCase()
    );

    if (newGenre.length > 0) {
      filteredFilmes.push(filme);
    }

    return filteredFilmes;
  }, []);

  if (movies.length == 0) {
    return res.status(500).send("Não há filmes neste gênero");
  }

  res.status(200).send(movies);
};

// exports.getByGenre = (req, res) => {
//   const genre = req.query.genre;
//   const movies = filmes.filter(filme => filme.genre.includes(genre));
//   res.status(200).send(movies);
// };

exports.getGenderByDirector = (req, res) => {
  const { director, genre } = req.params;

  const filmesByDirector = filmes.filter(
    e =>
      e.director.replace(" ", "").toUpperCase() ===
      director.replace(" ", "").toUpperCase()
  );

  const movies = filmesByDirector.filter(e => {
    const newGender = e.genre.filter(a => {
      console.log(a)
      a.replace(" ", "").toUpperCase() == genre.replace(" ", "").toUpperCase();
    });
    console.log(newGender, 'newGender')
    return newGender.length > 0;
  });

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
  const filme = filmes[index - 1];

  const { genre } = req.body;
  filme.genre.push(genre);
  filmes.splice(index - 1, 1, filme);

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

exports.getByDuration = (req, res) => {};
