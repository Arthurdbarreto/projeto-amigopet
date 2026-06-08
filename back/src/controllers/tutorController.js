const tutorService = require('../services/tutorService');

async function create(req, res, next) {
  try {
    const data = await tutorService.create(req.body);
    return res.status(201).json({ success: true, data, message: 'Tutor criado com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function findAll(req, res, next) {
  try {
    const data = await tutorService.findAll();
    return res.status(200).json({ success: true, data, message: 'Tutores listados com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function findById(req, res, next) {
  try {
    const data = await tutorService.findById(req.params.id);
    return res.status(200).json({ success: true, data, message: 'Tutor encontrado com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const data = await tutorService.update(req.params.id, req.body);
    return res.status(200).json({ success: true, data, message: 'Tutor atualizado com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    await tutorService.remove(req.params.id);
    return res.status(200).json({ success: true, data: null, message: 'Tutor removido com sucesso' });
  } catch (error) {
    return next(error);
  }
}

module.exports = { create, findAll, findById, update, remove };
