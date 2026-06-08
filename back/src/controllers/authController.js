const authService = require('../services/authService');

async function register(req, res, next) {
  try {
    const data = await authService.register(req.body);

    return res.status(201).json({
      success: true,
      data,
      message: 'Usuario cadastrado com sucesso',
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const data = await authService.login(req.body);

    return res.status(200).json({
      success: true,
      data,
      message: 'Login realizado com sucesso',
    });
  } catch (error) {
    return next(error);
  }
}

async function refresh(req, res, next) {
  try {
    const data = await authService.refresh(req.body.refreshToken);

    return res.status(200).json({
      success: true,
      data,
      message: 'Token renovado com sucesso',
    });
  } catch (error) {
    return next(error);
  }
}

async function me(req, res, next) {
  try {
    const data = await authService.getProfile(req.user.id);

    return res.status(200).json({
      success: true,
      data,
      message: 'Usuario autenticado',
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login,
  refresh,
  me,
};
