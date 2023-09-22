const httpConstants = require('http2').constants;
const Movie = require('../models/movie');
const BadRequestError = require('../errors/badRequest');
const NotFoundError = require('../errors/notFound');
const ForbiddenError = require('../errors/forbidden');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(httpConstants.HTTP_STATUS_OK).send(movies))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const data = req.body;
  data.owner = req.user._id;

  Movie.create(data)
    .then((movie) => res.status(httpConstants.HTTP_STATUS_CREATED).send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ForbiddenError('Неправильный запрос'));
      } else {
        next(error);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError('Карточка другого пользователя');
      }
      Movie.deleteOne(movie)
        .orFail()
        .then(() => {
          res
            .status(httpConstants.HTTP_STATUS_OK)
            .send({ message: 'Карточка удалена' });
        })
        .catch((error) => {
          if (error.name === 'DocumentNotFoundError') {
            next(
              new NotFoundError('Карточка с указанным индификатором не найдена'),
            );
          } else if (error.name === 'CastError') {
            next(new BadRequestError('Некорректный индификатор'));
          } else {
            next(error);
          }
        });
    })
    .catch((error) => {
      if (error.name === 'DocumentNotFoundError') {
        next(
          new NotFoundError('Карточка с указанным индификатором не найдена'),
        );
      } else {
        next(error);
      }
    });
};
