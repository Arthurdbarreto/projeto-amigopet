const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'Nome do tutor e obrigatorio'],
      trim: true,
      minlength: [2, 'Nome deve ter pelo menos 2 caracteres'],
      maxlength: [120, 'Nome deve ter no maximo 120 caracteres'],
    },
    telefone: {
      type: String,
      required: [true, 'Telefone do tutor e obrigatorio'],
      trim: true,
      maxlength: [30, 'Telefone deve ter no maximo 30 caracteres'],
    },
    contato: {
      type: String,
      trim: true,
      maxlength: [160, 'Contato deve ter no maximo 160 caracteres'],
    },
    endereco: {
      type: String,
      required: [true, 'Endereco do tutor e obrigatorio'],
      trim: true,
      maxlength: [240, 'Endereco deve ter no maximo 240 caracteres'],
    },
  },
  {
    timestamps: {
      createdAt: 'criadoEm',
      updatedAt: 'atualizadoEm',
    },
  },
);

module.exports = mongoose.model('Tutor', tutorSchema);
