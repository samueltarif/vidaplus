<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Conteúdo principal -->
    <div class="ml-64">
      <!-- Header -->
      <Header titulo="Dashboard" />
      
      <!-- Área de conteúdo -->
      <main class="pt-16 p-6">
        <!-- Cards de estatísticas -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- Card: Total de Pacientes -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600 mb-1">Total de Pacientes</p>
                <p class="text-3xl font-bold text-gray-800">{{ totalPacientes }}</p>
              </div>
              <div class="bg-blue-100 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Card: Agendamentos Hoje -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600 mb-1">Agendamentos Hoje</p>
                <p class="text-3xl font-bold text-gray-800">{{ agendamentosHoje }}</p>
              </div>
              <div class="bg-green-100 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Card: Próximas Consultas -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600 mb-1">Próximas Consultas</p>
                <p class="text-3xl font-bold text-gray-800">{{ proximasConsultas }}</p>
              </div>
              <div class="bg-purple-100 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Seção de ações rápidas -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Ações Rápidas</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Botão: Novo Paciente -->
            <NuxtLink
              to="/pacientes/novo"
              class="flex items-center gap-3 p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              <div class="bg-blue-500 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-800">Novo Paciente</p>
                <p class="text-sm text-gray-600">Cadastrar paciente</p>
              </div>
            </NuxtLink>
            
            <!-- Botão: Ver Pacientes -->
            <NuxtLink
              to="/pacientes"
              class="flex items-center gap-3 p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition-colors duration-200"
            >
              <div class="bg-green-500 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-800">Ver Pacientes</p>
                <p class="text-sm text-gray-600">Lista de pacientes</p>
              </div>
            </NuxtLink>
            
            <!-- Botão: Agendamentos -->
            <NuxtLink
              to="/agendamentos"
              class="flex items-center gap-3 p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors duration-200"
            >
              <div class="bg-purple-500 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-800">Agendamentos</p>
                <p class="text-sm text-gray-600">Gerenciar consultas</p>
              </div>
            </NuxtLink>
          </div>
        </div>
        
        <!-- Últimos agendamentos -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Últimos Agendamentos</h2>
          
          <div v-if="ultimosAgendamentos.length > 0" class="space-y-3">
            <div
              v-for="agendamento in ultimosAgendamentos"
              :key="agendamento.id"
              class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center gap-4">
                <div class="bg-blue-100 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-800">{{ agendamento.pacienteNome }}</p>
                  <p class="text-sm text-gray-600">{{ formatarData(agendamento.data) }} às {{ agendamento.horario }}</p>
                </div>
              </div>
              <span
                class="px-3 py-1 rounded-full text-sm font-medium"
                :class="getStatusClass(agendamento.status)"
              >
                {{ getStatusTexto(agendamento.status) }}
              </span>
            </div>
          </div>
          
          <div v-else class="text-center py-8 text-gray-500">
            Nenhum agendamento encontrado
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Agendamento } from '~/types'

// Middleware de autenticação
definePageMeta({
  middleware: 'auth'
})

// Composable de API
const { listarPacientes, listarAgendamentos } = useApi()

// Estados
const totalPacientes = ref(0)
const agendamentosHoje = ref(0)
const proximasConsultas = ref(0)
const ultimosAgendamentos = ref<Agendamento[]>([])

// Carregar dados ao montar
onMounted(async () => {
  // Carregar pacientes
  const pacientes = await listarPacientes()
  totalPacientes.value = pacientes.length
  
  // Carregar agendamentos
  const agendamentos = await listarAgendamentos()
  ultimosAgendamentos.value = agendamentos.slice(0, 5)
  
  // Calcular agendamentos de hoje
  const hoje = new Date().toISOString().split('T')[0]
  agendamentosHoje.value = agendamentos.filter(a => a.data === hoje).length
  
  // Calcular próximas consultas (próximos 7 dias)
  const proximaSemana = new Date()
  proximaSemana.setDate(proximaSemana.getDate() + 7)
  proximasConsultas.value = agendamentos.filter(a => {
    const dataAgendamento = new Date(a.data)
    return dataAgendamento >= new Date() && dataAgendamento <= proximaSemana
  }).length
})

// Função para formatar data
const formatarData = (data: string) => {
  return new Date(data).toLocaleDateString('pt-BR')
}

// Função para obter classe CSS do status
const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    agendado: 'bg-blue-100 text-blue-800',
    confirmado: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800',
    realizado: 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

// Função para obter texto do status
const getStatusTexto = (status: string) => {
  const textos: Record<string, string> = {
    agendado: 'Agendado',
    confirmado: 'Confirmado',
    cancelado: 'Cancelado',
    realizado: 'Realizado'
  }
  return textos[status] || status
}
</script>
