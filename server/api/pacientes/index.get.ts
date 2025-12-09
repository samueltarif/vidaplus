// API Mock para listar pacientes
import type { Paciente } from '~/types'

// Dados mock de pacientes (simulando banco de dados)
let pacientes: Paciente[] = [
  {
    id: 1,
    nome: 'João Silva Santos',
    cpf: '123.456.789-00',
    dataNascimento: '1985-03-15',
    telefone: '(11) 98765-4321',
    email: 'joao.silva@email.com',
    endereco: 'Rua das Flores, 123 - São Paulo, SP'
  },
  {
    id: 2,
    nome: 'Maria Oliveira Costa',
    cpf: '987.654.321-00',
    dataNascimento: '1990-07-22',
    telefone: '(11) 91234-5678',
    email: 'maria.oliveira@email.com',
    endereco: 'Av. Paulista, 1000 - São Paulo, SP'
  },
  {
    id: 3,
    nome: 'Pedro Henrique Souza',
    cpf: '456.789.123-00',
    dataNascimento: '1978-11-30',
    telefone: '(11) 99876-5432',
    email: 'pedro.souza@email.com',
    endereco: 'Rua Augusta, 500 - São Paulo, SP'
  },
  {
    id: 4,
    nome: 'Ana Paula Ferreira',
    cpf: '321.654.987-00',
    dataNascimento: '1995-05-18',
    telefone: '(11) 97654-3210',
    email: 'ana.ferreira@email.com',
    endereco: 'Rua Oscar Freire, 250 - São Paulo, SP'
  }
]

export default defineEventHandler(() => {
  // Retornar lista de pacientes
  return pacientes
})

// Exportar para uso em outros endpoints
export { pacientes }
