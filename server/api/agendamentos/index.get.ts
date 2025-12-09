// API Mock para listar agendamentos
import type { Agendamento } from '~/types'

// Dados mock de agendamentos (simulando banco de dados)
let agendamentos: Agendamento[] = [
  {
    id: 1,
    pacienteId: 1,
    pacienteNome: 'João Silva Santos',
    data: '2024-12-10',
    horario: '09:00',
    motivo: 'Consulta de rotina',
    status: 'agendado'
  },
  {
    id: 2,
    pacienteId: 2,
    pacienteNome: 'Maria Oliveira Costa',
    data: '2024-12-10',
    horario: '10:30',
    motivo: 'Retorno - Exames',
    status: 'confirmado'
  },
  {
    id: 3,
    pacienteId: 3,
    pacienteNome: 'Pedro Henrique Souza',
    data: '2024-12-11',
    horario: '14:00',
    motivo: 'Dor nas costas',
    status: 'agendado'
  },
  {
    id: 4,
    pacienteId: 4,
    pacienteNome: 'Ana Paula Ferreira',
    data: '2024-12-12',
    horario: '15:30',
    motivo: 'Check-up anual',
    status: 'agendado'
  },
  {
    id: 5,
    pacienteId: 1,
    pacienteNome: 'João Silva Santos',
    data: '2024-12-05',
    horario: '11:00',
    motivo: 'Consulta cardiológica',
    status: 'realizado'
  }
]

export default defineEventHandler(() => {
  // Retornar lista de agendamentos ordenada por data
  return agendamentos.sort((a, b) => {
    const dataA = new Date(a.data + ' ' + a.horario)
    const dataB = new Date(b.data + ' ' + b.horario)
    return dataB.getTime() - dataA.getTime()
  })
})

// Exportar para uso em outros endpoints
export { agendamentos }
