// API Mock para criar novo paciente
import type { Paciente, PacienteForm } from '~/types'
import { pacientes } from './index.get'

export default defineEventHandler(async (event) => {
  // Ler dados do corpo da requisição
  const body = await readBody<PacienteForm>(event)
  
  // Gerar novo ID (maior ID + 1)
  const novoId = Math.max(...pacientes.map(p => p.id), 0) + 1
  
  // Criar novo paciente
  const novoPaciente: Paciente = {
    id: novoId,
    nome: body.nome,
    cpf: body.cpf,
    dataNascimento: body.dataNascimento,
    telefone: body.telefone,
    email: body.email,
    endereco: body.endereco
  }
  
  // Adicionar à lista
  pacientes.push(novoPaciente)
  
  // Retornar paciente criado
  return novoPaciente
})
