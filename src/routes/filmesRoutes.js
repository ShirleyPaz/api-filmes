const express = require('express');
const router = express.Router();
const filmesController = require('../controllers/filmesController')

router.get('/', filmesController.get)
router.get('/buscar', filmesController.getByGenre)
router.get('/:director', filmesController.getByDirector)
router.get('/duration/:duration', filmesController.getByDuration)
router.get('/:director/:genre', filmesController.getGenderByDirector)

router.post('/', filmesController.post)
router.post('/:index/genre', filmesController.postGenreByMovie)
router.post('/:index/genre', filmesController.postGenreByMovie)
router.post('/:index/genre', filmesController.postGenreByMovie)

module.exports = router;