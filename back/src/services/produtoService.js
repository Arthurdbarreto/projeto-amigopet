const Produto = require('../models/produtoModel');
const AppError = require('../utils/AppError');
const validateObjectId = require('../utils/validateObjectId');

async function create(payload) {
  return Produto.create(payload);
}

async function findAll() {
  return Produto.find().sort({ nome: 1 });
}

async function findById(id) {
  validateObjectId(id);

  const produto = await Produto.findById(id);

  if (!produto) {
    throw new AppError('Produto nao encontrado', 404, 'PRODUTO_NOT_FOUND');
  }

  return produto;
}

async function update(id, payload) {
  validateObjectId(id);

  const produto = await Produto.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!produto) {
    throw new AppError('Produto nao encontrado', 404, 'PRODUTO_NOT_FOUND');
  }

  return produto;
}

async function remove(id) {
  validateObjectId(id);

  const produto = await Produto.findByIdAndDelete(id);

  if (!produto) {
    throw new AppError('Produto nao encontrado', 404, 'PRODUTO_NOT_FOUND');
  }

  return produto;
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
