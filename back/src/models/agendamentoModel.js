const mongoose = require('mongoose');

const agendamentoSchema = new mongoose.Schema(
  {
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutor',
      required: [true, 'Tutor do agendamento e obrigatorio'],
    },
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
      required: [true, 'Pet do agendamento e obrigatorio'],
    },
    servicoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Servico',
      required: [true, 'Servico do agendamento e obrigatorio'],
    },
    dataHora: {
      type: Date,
      required: [true, 'Data e hora do agendamento sao obrigatorias'],
    },
    status: {
      type: String,
      enum: {
        values: ['AGENDADO', 'CONFIRMADO', 'EM_ATENDIMENTO', 'CONCLUIDO', 'CANCELADO', 'NAO_COMPARECEU'],
        message: 'Status de agendamento invalido',
      },
      default: 'AGENDADO',
    },
  },
  {
    timestamps: {
      createdAt: 'criadoEm',
      updatedAt: 'atualizadoEm',
    },
  },
);

agendamentoSchema.index({ tutorId: 1 });
agendamentoSchema.index({ petId: 1 });
agendamentoSchema.index({ servicoId: 1 });
agendamentoSchema.index({ dataHora: 1 });

module.exports = mongoose.model('Agendamento', agendamentoSchema);
