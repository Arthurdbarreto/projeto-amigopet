const AppError = require('../utils/AppError');

function notFoundMiddleware(req, res, next) {
  return next(new AppError('Recurso nao encontrado', 404, 'RESOURCE_NOT_FOUND'));
}

module.exports = notFoundMiddleware;
