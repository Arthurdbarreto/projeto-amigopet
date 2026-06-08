function errorMiddleware(error, req, res, next) {
  let statusCode = error.statusCode || 500;
  let code = error.code || 'INTERNAL_SERVER_ERROR';
  let message = error.message || 'Erro interno do servidor';

  if (error.name === 'ValidationError') {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    message = Object.values(error.errors)
      .map((item) => item.message)
      .join('; ');
  }

  if (error.name === 'CastError') {
    statusCode = 400;
    code = 'INVALID_ID';
    message = 'Identificador invalido';
  }

  if (error.code === 11000) {
    statusCode = 409;
    code = 'DUPLICATE_VALUE';
    message = 'Registro duplicado';
  }

  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
    },
  });
}

module.exports = errorMiddleware;
