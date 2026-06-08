const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');

const SALT_ROUNDS = 12;

function signAccessToken(user) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      nome: user.nome,
      email: user.email,
      perfil: user.perfil,
      type: 'access',
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  );
}

function signRefreshToken(user) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      type: 'refresh',
    },
    env.jwtRefreshSecret,
    { expiresIn: env.jwtRefreshExpiresIn },
  );
}

async function issueTokens(user) {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  user.refreshTokenHash = await bcrypt.hash(refreshToken, SALT_ROUNDS);
  await user.save();

  return {
    accessToken,
    refreshToken,
    tokenType: 'Bearer',
    expiresIn: env.jwtExpiresIn,
  };
}

function assertStrongPassword(password) {
  const hasMinimumLength = typeof password === 'string' && password.length >= 8;
  const hasLetter = /[A-Za-z]/.test(password || '');
  const hasNumber = /\d/.test(password || '');

  if (!hasMinimumLength || !hasLetter || !hasNumber) {
    throw new AppError(
      'A senha deve ter no minimo 8 caracteres, com letras e numeros',
      400,
      'WEAK_PASSWORD',
    );
  }
}

async function register(payload) {
  const { nome, email, senha, perfil } = payload;

  if (!nome || !email || !senha) {
    throw new AppError('Nome, email e senha sao obrigatorios', 400, 'VALIDATION_ERROR');
  }

  assertStrongPassword(senha);

  const normalizedEmail = email.trim().toLowerCase();
  const userAlreadyExists = await User.exists({ email: normalizedEmail });

  if (userAlreadyExists) {
    throw new AppError('Email ja cadastrado', 409, 'EMAIL_ALREADY_EXISTS');
  }

  const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);
  const user = await User.create({
    nome,
    email: normalizedEmail,
    senhaHash,
    perfil,
  });

  const tokens = await issueTokens(user);

  return {
    user: user.toSafeObject(),
    tokens,
  };
}

async function login(payload) {
  const { email, senha } = payload;

  if (!email || !senha) {
    throw new AppError('Email e senha sao obrigatorios', 400, 'VALIDATION_ERROR');
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+senhaHash +refreshTokenHash');

  if (!user || !user.ativo) {
    throw new AppError('Credenciais invalidas', 401, 'INVALID_CREDENTIALS');
  }

  const passwordMatches = await user.comparePassword(senha);

  if (!passwordMatches) {
    throw new AppError('Credenciais invalidas', 401, 'INVALID_CREDENTIALS');
  }

  const tokens = await issueTokens(user);

  return {
    user: user.toSafeObject(),
    tokens,
  };
}

async function refresh(refreshToken) {
  if (!refreshToken) {
    throw new AppError('Refresh token nao informado', 400, 'REFRESH_TOKEN_MISSING');
  }

  let payload;

  try {
    payload = jwt.verify(refreshToken, env.jwtRefreshSecret);
  } catch (error) {
    throw new AppError('Refresh token invalido ou expirado', 401, 'REFRESH_TOKEN_INVALID');
  }

  if (payload.type !== 'refresh') {
    throw new AppError('Tipo de token invalido', 401, 'REFRESH_TOKEN_INVALID');
  }

  const user = await User.findById(payload.sub).select('+refreshTokenHash');

  if (!user || !user.ativo || !user.refreshTokenHash) {
    throw new AppError('Refresh token invalido', 401, 'REFRESH_TOKEN_INVALID');
  }

  const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshTokenHash);

  if (!refreshTokenMatches) {
    throw new AppError('Refresh token invalido', 401, 'REFRESH_TOKEN_INVALID');
  }

  const tokens = await issueTokens(user);

  return {
    user: user.toSafeObject(),
    tokens,
  };
}

async function getProfile(userId) {
  const user = await User.findById(userId);

  if (!user || !user.ativo) {
    throw new AppError('Usuario nao encontrado', 404, 'USER_NOT_FOUND');
  }

  return user.toSafeObject();
}

module.exports = {
  register,
  login,
  refresh,
  getProfile,
};
