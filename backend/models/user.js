const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [30, 'Максимальная длина поля "about" - 30'],
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => /^(https|http):\/\/(www.)?[-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]+\.[-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]#?/.test(v),
      message: 'Некорректный URL',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный Email',
    },
    required: [true, 'поле Email должно быть заполнено'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'поле password должно быть заполнено'],
    select: false,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
