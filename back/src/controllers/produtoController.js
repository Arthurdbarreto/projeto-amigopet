const produtoService = require('../services/produtoService');

async function create(req, res, next) {
  try {
    const data = await produtoService.create(req.body);
    return res.status(201).json({ success: true, data, message: 'Produto criado com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function findAll(req, res, next) {
  try {
    const data = await produtoService.findAll();
    return res.status(200).json({ success: true, data, message: 'Produtos listados com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function findById(req, res, next) {
  try {
    const data = await produtoService.findById(req.params.id);
    return res.status(200).json({ success: true, data, message: 'Produto encontrado com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const data = await produtoService.update(req.params.id, req.body);
    return res.status(200).json({ success: true, data, message: 'Produto atualizado com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    await produtoService.remove(req.params.id);
    return res.status(200).json({ success: true, data: null, message: 'Produto removido com sucesso' });
  } catch (error) {
    return next(error);
  }
}

module.exports = { create, findAll, findById, update, remove };
