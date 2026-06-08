const agendamentoService = require('../services/agendamentoService');

async function create(req, res, next) {
  try {
    const data = await agendamentoService.create(req.body);
    return res.status(201).json({ success: true, data, message: 'Agendamento criado com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function findAll(req, res, next) {
  try {
    const data = await agendamentoService.findAll();
    return res.status(200).json({ success: true, data, message: 'Agendamentos listados com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function findById(req, res, next) {
  try {
    const data = await agendamentoService.findById(req.params.id);
    return res.status(200).json({ success: true, data, message: 'Agendamento encontrado com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const data = await agendamentoService.update(req.params.id, req.body);
    return res.status(200).json({ success: true, data, message: 'Agendamento atualizado com sucesso' });
  } catch (error) {
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    await agendamentoService.remove(req.params.id);
    return res.status(200).json({ success: true, data: null, message: 'Agendamento removido com sucesso' });
  } catch (error) {
    return next(error);
  }
}

module.exports = { create, findAll, findById, update, remove };
