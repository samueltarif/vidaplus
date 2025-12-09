// Tipos do sistema VidaPlus

// Tipo para o usuário logado
export interface Usuario {
  id: number
  nome: string
  email: string
  token: string
}

// Tipo para paciente
export interface Paciente {
  id: number
  nome: string
  cpf: string
  dataNascimento: string
  telefone?: string
  email?: string
  endereco?: string
}

// Tipo para agendamento de consulta
export interface Agendamento {
  id: number
  pacienteId: number
  pacienteNome: string
  data: string
  horario: string
  motivo: string
  status: 'agendado' | 'confirmado' | 'cancelado' | 'realizado'
}

// Tipo para resposta de login
export interface LoginResponse {
  success: boolean
  usuario?: Usuario
  message?: string
}

// Tipo para formulário de paciente
export interface PacienteForm {
  nome: string
  cpf: string
  dataNascimento: string
  telefone?: string
  email?: string
  endereco?: string
}

// Tipo para formulário de agendamento
export interface AgendamentoForm {
  pacienteId: number
  data: string
  horario: string
  motivo: string
}
