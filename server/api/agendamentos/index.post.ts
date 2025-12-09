// API Mock para criar novo agendamento
import type { Agendamento, AgendamentoForm } from '~/types'
import { agendamentos } from './index.get'
import { pacientes } from '../pacientes/index.get'

export default defineEventHandler(async (event) => {
  // Ler dados do corpo da requisição
  const body = await readBody<AgendamentoForm>(event)
  
  // Buscar nome do paciente
  const paciente = pacientes.find(p => p.id === body.pacienteId)
  
  if (!paciente) {
    throw createError({
      statusCode: 404,
      message: 'Paciente não encontrado'
    })
  }
  
  // Gerar novo ID
  const novoId = Math.max(...agendamentos.map(a => a.id), 0) + 1
  
  // Criar novo agendamento
  const novoAgendamento: Agendamento = {
    id: novoId,
    pacienteId: body.pacienteId,
    pacienteNome: paciente.nome,
    data: body.data,
    horario: body.horario,
    motivo: body.motivo,
    status: 'agendado'
  }
  
  // Adicionar à lista
  agendamentos.push(novoAgendamento)
  
  // Retornar agendamento criado
  return novoAgendamento
})
