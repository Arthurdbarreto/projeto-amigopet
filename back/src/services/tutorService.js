const Agendamento = require('../models/agendamentoModel');
const Pet = require('../models/petModel');
const Tutor = require('../models/tutorModel');
const AppError = require('../utils/AppError');
const validateObjectId = require('../utils/validateObjectId');

async function create(payload) {
  return Tutor.create(payload);
}

async function findAll() {
  return Tutor.find().sort({ nome: 1 });
}

async function findById(id) {
  validateObjectId(id);

  const tutor = await Tutor.findById(id);

  if (!tutor) {
    throw new AppError('Tutor nao encontrado', 404, 'TUTOR_NOT_FOUND');
  }

  return tutor;
}

async function update(id, payload) {
  validateObjectId(id);

  const tutor = await Tutor.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!tutor) {
    throw new AppError('Tutor nao encontrado', 404, 'TUTOR_NOT_FOUND');
  }

  return tutor;
}

async function remove(id) {
  validateObjectId(id);

  const hasPets = await Pet.exists({ tutorId: id });
  const hasAgendamentos = await Agendamento.exists({ tutorId: id });

  if (hasPets || hasAgendamentos) {
    throw new AppError('Tutor possui pets ou agendamentos vinculados', 409, 'TUTOR_IN_USE');
  }

  const tutor = await Tutor.findByIdAndDelete(id);

  if (!tutor) {
    throw new AppError('Tutor nao encontrado', 404, 'TUTOR_NOT_FOUND');
  }

  return tutor;
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
