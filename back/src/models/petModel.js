const mongoose = require('mongoose');

const petSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'Nome do pet e obrigatorio'],
      trim: true,
      minlength: [2, 'Nome deve ter pelo menos 2 caracteres'],
      maxlength: [120, 'Nome deve ter no maximo 120 caracteres'],
    },
    especie: {
      type: String,
      required: [true, 'Especie do pet e obrigatoria'],
      trim: true,
      maxlength: [80, 'Especie deve ter no maximo 80 caracteres'],
    },
    raca: {
      type: String,
      trim: true,
      maxlength: [100, 'Raca deve ter no maximo 100 caracteres'],
    },
    sexo: {
      type: String,
      required: [true, 'Sexo do pet e obrigatorio'],
      enum: {
        values: ['MACHO', 'FEMEA'],
        message: 'Sexo deve ser MACHO ou FEMEA',
      },
    },
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutor',
      required: [true, 'Tutor do pet e obrigatorio'],
    },
  },
  {
    timestamps: {
      createdAt: 'criadoEm',
      updatedAt: 'atualizadoEm',
    },
  },
);

petSchema.index({ tutorId: 1 });

module.exports = mongoose.model('Pet', petSchema);
