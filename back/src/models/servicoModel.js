const mongoose = require('mongoose');

const servicoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'Nome do servico e obrigatorio'],
      trim: true,
      minlength: [2, 'Nome deve ter pelo menos 2 caracteres'],
      maxlength: [120, 'Nome deve ter no maximo 120 caracteres'],
    },
    descricao: {
      type: String,
      trim: true,
      maxlength: [500, 'Descricao deve ter no maximo 500 caracteres'],
    },
    preco: {
      type: Number,
      required: [true, 'Preco do servico e obrigatorio'],
      min: [0, 'Preco nao pode ser negativo'],
    },
  },
  {
    timestamps: {
      createdAt: 'criadoEm',
      updatedAt: 'atualizadoEm',
    },
  },
);

module.exports = mongoose.model('Servico', servicoSchema);
