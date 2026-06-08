export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Tutor {
  id?: string;
  name: string;
  phone: string;
  contact?: string;
  address?: string;
  createdAt?: Date;
}

export interface Pet {
  id?: string;
  name: string;
  species: string;
  breed?: string;
  sex: 'Macho' | 'Fêmea';
  tutorId: string | Tutor;
}

export interface Service {
  id?: string;
  name: string;
  description?: string;
  price: number;
}

export interface Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
}

export interface Appointment {
  id?: string;
  tutorId: string | Tutor;
  petId: string | Pet;
  serviceId: string | Service;
  dataHora: Date;
  status: 'Pendente' | 'Confirmado' | 'Concluido' | 'Cancelado';
}
