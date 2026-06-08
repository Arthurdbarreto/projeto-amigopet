const Agendamento = require('../models/agendamentoModel');
const Pet = require('../models/petModel');
const Servico = require('../models/servicoModel');
const Tutor = require('../models/tutorModel');
const AppError = require('../utils/AppError');
const validateObjectId = require('../utils/validateObjectId');

const POPULATE_FIELDS = [
  { path: 'tutorId', select: 'nome telefone contato' },
  { path: 'petId', select: 'nome especie raca sexo tutorId' },
  { path: 'servicoId', select: 'nome descricao preco' },
];

async function validateRelationships(payload) {
  validateObjectId(payload.tutorId, 'tutorId');
  validateObjectId(payload.petId, 'petId');
  validateObjectId(payload.servicoId, 'servicoId');

  const [tutor, pet, servico] = await Promise.all([
    Tutor.findById(payload.tutorId),
    Pet.findById(payload.petId),
    Servico.findById(payload.servicoId),
  ]);

  if (!tutor) {
    throw new AppError('Tutor nao encontrado', 404, 'TUTOR_NOT_FOUND');
  }

  if (!pet) {
    throw new AppError('Pet nao encontrado', 404, 'PET_NOT_FOUND');
  }

  if (!servico) {
    throw new AppError('Servico nao encontrado', 404, 'SERVICO_NOT_FOUND');
  }

  if (pet.tutorId.toString() !== tutor._id.toString()) {
    throw new AppError('Pet nao pertence ao tutor informado', 400, 'PET_TUTOR_MISMATCH');
  }
}

function validateDataHora(dataHora) {
  if (!dataHora || Number.isNaN(new Date(dataHora).getTime())) {
    throw new AppError('Data e hora do agendamento invalidas', 400, 'INVALID_SCHEDULE_DATE');
  }
}

async function create(payload) {
  validateDataHora(payload.dataHora);
  await validateRelationships(payload);

  const agendamento = await Agendamento.create(payload);

  return Agendamento.findById(agendamento._id).populate(POPULATE_FIELDS);
}

async function findAll() {
  return Agendamento.find().populate(POPULATE_FIELDS).sort({ dataHora: 1 });
}

async function findById(id) {
  validateObjectId(id);

  const agendamento = await Agendamento.findById(id).populate(POPULATE_FIELDS);

  if (!agendamento) {
    throw new AppError('Agendamento nao encontrado', 404, 'AGENDAMENTO_NOT_FOUND');
  }

  return agendamento;
}

async function update(id, payload) {
  validateObjectId(id);

  const current = await Agendamento.findById(id);

  if (!current) {
    throw new AppError('Agendamento nao encontrado', 404, 'AGENDAMENTO_NOT_FOUND');
  }

  const nextPayload = {
    tutorId: payload.tutorId || current.tutorId,
    petId: payload.petId || current.petId,
    servicoId: payload.servicoId || current.servicoId,
  };

  if (payload.tutorId || payload.petId || payload.servicoId) {
    await validateRelationships(nextPayload);
  }

  if (payload.dataHora) {
    validateDataHora(payload.dataHora);
  }

  const agendamento = await Agendamento.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate(POPULATE_FIELDS);

  return agendamento;
}

async function remove(id) {
  validateObjectId(id);

  const agendamento = await Agendamento.findByIdAndDelete(id);

  if (!agendamento) {
    throw new AppError('Agendamento nao encontrado', 404, 'AGENDAMENTO_NOT_FOUND');
  }

  return agendamento;
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
