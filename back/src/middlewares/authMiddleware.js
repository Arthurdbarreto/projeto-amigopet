const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError('Token de autenticacao nao informado', 401, 'AUTH_TOKEN_MISSING'));
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new AppError('Formato do token invalido', 401, 'AUTH_TOKEN_INVALID'));
  }

  let payload;

  try {
    payload = jwt.verify(token, env.jwtSecret);
  } catch (error) {
    return next(new AppError('Token invalido ou expirado', 401, 'AUTH_TOKEN_EXPIRED'));
  }

  if (payload.type !== 'access') {
    return next(new AppError('Tipo de token invalido', 401, 'AUTH_TOKEN_INVALID'));
  }

  let user;

  try {
    user = await User.findById(payload.sub).select('_id nome email perfil ativo');
  } catch (error) {
    return next(error);
  }

  if (!user || !user.ativo) {
    return next(new AppError('Usuario nao autorizado', 401, 'USER_UNAUTHORIZED'));
  }

  req.user = {
    id: user._id.toString(),
    nome: user.nome,
    email: user.email,
    perfil: user.perfil,
  };

  return next();
}

module.exports = authMiddleware;
