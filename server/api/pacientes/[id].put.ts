// API Mock para atualizar paciente existente
import type { PacienteForm } from '~/types'
import { pacientes } from './index.get'

export default defineEventHandler(async (event) => {
  // Obter ID da URL
  const id = Number(event.context.params?.id)
  
  // Ler dados do corpo da requisição
  const body = await readBody<PacienteForm>(event)
  
  // Encontrar índice do paciente
  const index = pacientes.findIndex(p => p.id === id)
  
  if (index === -1) {
    throw createError({
      statusCode: 404,
      message: 'Paciente não encontrado'
    })
  }
  
  // Atualizar paciente
  pacientes[index] = {
    ...pacientes[index],
    nome: body.nome,
    cpf: body.cpf,
    dataNascimento: body.dataNascimento,
    telefone: body.telefone,
    email: body.email,
    endereco: body.endereco
  }
  
  // Retornar paciente atualizado
  return pacientes[index]
})
