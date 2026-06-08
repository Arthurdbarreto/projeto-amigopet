const petService = require('../services/petService');

async function create(req, res, next) {
  try {
    const data = await petService.create(req.body);
    return res.status(201).json({ success: true, data, message: 'Pet criado com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function findAll(req, res, next) {
  try {
    const data = await petService.findAll();
    return res.status(200).json({ success: true, data, message: 'Pets listados com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function findById(req, res, next) {
  try {
    const data = await petService.findById(req.params.id);
    return res.status(200).json({ success: true, data, message: 'Pet encontrado com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const data = await petService.update(req.params.id, req.body);
    return res.status(200).json({ success: true, data, message: 'Pet atualizado com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    await petService.remove(req.params.id);
    return res.status(200).json({ success: true, data: null, message: 'Pet removido com sucesso' });
  } catch (error) {
    return next(error);
  }
}

module.exports = { create, findAll, findById, update, remove };
