const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
      match: [/^\S+@\S+\.\S+$/, 'Email invalido'],
    },
    senhaHash: {
      type: String,
      required: true,
      select: false,
    },
    perfil: {
      type: String,
      enum: ['ADMIN', 'ATENDENTE', 'VETERINARIO', 'ESTOQUE'],
      default: 'ATENDENTE',
    },
    ativo: {
      type: Boolean,
      default: true,
    },
    refreshTokenHash: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: {
      createdAt: 'criadoEm',
      updatedAt: 'atualizadoEm',
    },
  },
);

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.senhaHash);
};

userSchema.methods.toSafeObject = function toSafeObject() {
  return {
    id: this._id.toString(),
    nome: this.nome,
    email: this.email,
    perfil: this.perfil,
    ativo: this.ativo,
    criadoEm: this.criadoEm,
    atualizadoEm: this.atualizadoEm,
  };
};

module.exports = mongoose.model('User', userSchema);
