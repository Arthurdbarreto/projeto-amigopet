const mongoose = require('mongoose');
const AppError = require('./AppError');

function validateObjectId(id, fieldName = 'id') {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(`${fieldName} invalido`, 400, 'INVALID_ID');
  }
}

module.exports = validateObjectId;
