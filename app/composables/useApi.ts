// Composable para gerenciar chamadas de API
import type { Usuario, Paciente, Agendamento, LoginResponse, PacienteForm, AgendamentoForm } from '~/types'

export const useApi = () => {
  // Função para fazer login
  const login = async (email: string, senha: string): Promise<LoginResponse> => {
    try {
      const response = await $fetch<LoginResponse>('/api/login', {
        method: 'POST',
        body: { email, senha }
      })
      
      // Se login bem-sucedido, salvar token no localStorage
      if (response.success && response.usuario) {
        localStorage.setItem('vidaplus_token', response.usuario.token)
        localStorage.setItem('vidaplus_usuario', JSON.stringify(response.usuario))
      }
      
      return response
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      return { success: false, message: 'Erro ao conectar com servidor' }
    }
  }

  // Função para fazer logout
  const logout = () => {
    localStorage.removeItem('vidaplus_token')
    localStorage.removeItem('vidaplus_usuario')
    navigateTo('/login')
  }

  // Função para obter usuário logado
  const getUsuarioLogado = (): Usuario | null => {
    if (process.client) {
      const usuarioStr = localStorage.getItem('vidaplus_usuario')
      return usuarioStr ? JSON.parse(usuarioStr) : null
    }
    return null
  }

  // Função para verificar se está autenticado
  const isAuthenticated = (): boolean => {
    if (process.client) {
      return !!localStorage.getItem('vidaplus_token')
    }
    return false
  }

  // Função para listar todos os pacientes
  const listarPacientes = async (): Promise<Paciente[]> => {
    try {
      const pacientes = await $fetch<Paciente[]>('/api/pacientes')
      return pacientes
    } catch (error) {
      console.error('Erro ao listar pacientes:', error)
      return []
    }
  }

  // Função para buscar um paciente específico
  const buscarPaciente = async (id: number): Promise<Paciente | null> => {
    try {
      const pacientes = await listarPacientes()
      return pacientes.find(p => p.id === id) || null
    } catch (error) {
      console.error('Erro ao buscar paciente:', error)
      return null
    }
  }

  // Função para criar novo paciente
  const criarPaciente = async (paciente: PacienteForm): Promise<Paciente | null> => {
    try {
      const novoPaciente = await $fetch<Paciente>('/api/pacientes', {
        method: 'POST',
        body: paciente
      })
      return novoPaciente
    } catch (error) {
      console.error('Erro ao criar paciente:', error)
      return null
    }
  }

  // Função para atualizar paciente existente
  const atualizarPaciente = async (id: number, paciente: PacienteForm): Promise<Paciente | null> => {
    try {
      const pacienteAtualizado = await $fetch<Paciente>(`/api/pacientes/${id}`, {
        method: 'PUT',
        body: paciente
      })
      return pacienteAtualizado
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error)
      return null
    }
  }

  // Função para listar todos os agendamentos
  const listarAgendamentos = async (): Promise<Agendamento[]> => {
    try {
      const agendamentos = await $fetch<Agendamento[]>('/api/agendamentos')
      return agendamentos
    } catch (error) {
      console.error('Erro ao listar agendamentos:', error)
      return []
    }
  }

  // Função para criar novo agendamento
  const criarAgendamento = async (agendamento: AgendamentoForm): Promise<Agendamento | null> => {
    try {
      const novoAgendamento = await $fetch<Agendamento>('/api/agendamentos', {
        method: 'POST',
        body: agendamento
      })
      return novoAgendamento
    } catch (error) {
      console.error('Erro ao criar agendamento:', error)
      return null
    }
  }

  return {
    // Autenticação
    login,
    logout,
    getUsuarioLogado,
    isAuthenticated,
    
    // Pacientes
    listarPacientes,
    buscarPaciente,
    criarPaciente,
    atualizarPaciente,
    
    // Agendamentos
    listarAgendamentos,
    criarAgendamento
  }
}
