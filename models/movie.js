const mongoose = require('mongoose');
const { urlRegex } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    director: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    duration: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    year: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    description: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    image: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: {
        validator(image) {
          return urlRegex.test(
            image,
          );
        },
        message: 'Введен некорректный адрес',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: {
        validator(trailerLink) {
          return urlRegex.test(
            trailerLink,
          );
        },
        message: 'Введен некорректный адрес',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: {
        validator(thumbnail) {
          return urlRegex.test(
            thumbnail,
          );
        },
        message: 'Введен некорректный адрес',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
