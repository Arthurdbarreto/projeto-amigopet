const servicoService = require('../services/servicoService');

async function create(req, res, next) {
  try {
    const data = await servicoService.create(req.body);
    return res.status(201).json({ success: true, data, message: 'Servico criado com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function findAll(req, res, next) {
  try {
    const data = await servicoService.findAll();
    return res.status(200).json({ success: true, data, message: 'Servicos listados com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function findById(req, res, next) {
  try {
    const data = await servicoService.findById(req.params.id);
    return res.status(200).json({ success: true, data, message: 'Servico encontrado com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const data = await servicoService.update(req.params.id, req.body);
    return res.status(200).json({ success: true, data, message: 'Servico atualizado com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    await servicoService.remove(req.params.id);
    return res.status(200).json({ success: true, data: null, message: 'Servico removido com sucesso' });
  } catch (error) {
    return next(error);
  }
}

module.exports = { create, findAll, findById, update, remove };
