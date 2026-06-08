const Agendamento = require('../models/agendamentoModel');
const Servico = require('../models/servicoModel');
const AppError = require('../utils/AppError');
const validateObjectId = require('../utils/validateObjectId');

async function create(payload) {
  return Servico.create(payload);
}

async function findAll() {
  return Servico.find().sort({ nome: 1 });
}

async function findById(id) {
  validateObjectId(id);

  const servico = await Servico.findById(id);

  if (!servico) {
    throw new AppError('Servico nao encontrado', 404, 'SERVICO_NOT_FOUND');
  }

  return servico;
}

async function update(id, payload) {
  validateObjectId(id);

  const servico = await Servico.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!servico) {
    throw new AppError('Servico nao encontrado', 404, 'SERVICO_NOT_FOUND');
  }

  return servico;
}

async function remove(id) {
  validateObjectId(id);

  const hasAgendamentos = await Agendamento.exists({ servicoId: id });

  if (hasAgendamentos) {
    throw new AppError('Servico possui agendamentos vinculados', 409, 'SERVICO_IN_USE');
  }

  const servico = await Servico.findByIdAndDelete(id);

  if (!servico) {
    throw new AppError('Servico nao encontrado', 404, 'SERVICO_NOT_FOUND');
  }

  return servico;
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
