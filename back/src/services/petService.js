const Agendamento = require('../models/agendamentoModel');
const Pet = require('../models/petModel');
const Tutor = require('../models/tutorModel');
const AppError = require('../utils/AppError');
const validateObjectId = require('../utils/validateObjectId');

async function ensureTutorExists(tutorId) {
  validateObjectId(tutorId, 'tutorId');

  const tutorExists = await Tutor.exists({ _id: tutorId });

  if (!tutorExists) {
    throw new AppError('Tutor nao encontrado', 404, 'TUTOR_NOT_FOUND');
  }
}

async function create(payload) {
  await ensureTutorExists(payload.tutorId);

  const pet = await Pet.create(payload);

  return Pet.findById(pet._id).populate('tutorId', 'nome telefone contato');
}

async function findAll() {
  return Pet.find().populate('tutorId', 'nome telefone contato').sort({ nome: 1 });
}

async function findById(id) {
  validateObjectId(id);

  const pet = await Pet.findById(id).populate('tutorId', 'nome telefone contato');

  if (!pet) {
    throw new AppError('Pet nao encontrado', 404, 'PET_NOT_FOUND');
  }

  return pet;
}

async function update(id, payload) {
  validateObjectId(id);

  if (payload.tutorId) {
    await ensureTutorExists(payload.tutorId);
  }

  const pet = await Pet.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('tutorId', 'nome telefone contato');

  if (!pet) {
    throw new AppError('Pet nao encontrado', 404, 'PET_NOT_FOUND');
  }

  return pet;
}

async function remove(id) {
  validateObjectId(id);

  const hasAgendamentos = await Agendamento.exists({ petId: id });

  if (hasAgendamentos) {
    throw new AppError('Pet possui agendamentos vinculados', 409, 'PET_IN_USE');
  }

  const pet = await Pet.findByIdAndDelete(id);

  if (!pet) {
    throw new AppError('Pet nao encontrado', 404, 'PET_NOT_FOUND');
  }

  return pet;
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
