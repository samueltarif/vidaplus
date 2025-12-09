<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Conteúdo principal -->
    <div class="ml-64">
      <!-- Header -->
      <Header titulo="Agendamentos" />
      
      <!-- Área de conteúdo -->
      <main class="pt-16 p-6">
        <!-- Barra de ações -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-between">
          <!-- Filtros -->
          <div class="flex gap-4">
            <select
              v-model="filtroStatus"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos os status</option>
              <option value="agendado">Agendado</option>
              <option value="confirmado">Confirmado</option>
              <option value="cancelado">Cancelado</option>
              <option value="realizado">Realizado</option>
            </select>
            
            <input
              v-model="filtroData"
              type="date"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <!-- Botão novo agendamento -->
          <button
            @click="modalAberto = true"
            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Novo Agendamento
          </button>
        </div>
        
        <!-- Lista de agendamentos -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div v-if="agendamentosFiltrados.length > 0" class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horário
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Motivo
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="agendamento in agendamentosFiltrados"
                  :key="agendamento.id"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ agendamento.pacienteNome }}</div>
                        <div class="text-sm text-gray-500">ID: {{ agendamento.pacienteId }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ formatarData(agendamento.data) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ agendamento.horario }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900 max-w-xs truncate">{{ agendamento.motivo }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                      :class="getStatusClass(agendamento.status)"
                    >
                      {{ getStatusTexto(agendamento.status) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Mensagem quando não há agendamentos -->
          <div v-else class="p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Nenhum agendamento encontrado</h3>
            <p class="text-gray-600 mb-6">Crie seu primeiro agendamento de consulta</p>
            <button
              @click="modalAberto = true"
              class="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Criar Primeiro Agendamento
            </button>
          </div>
        </div>
      </main>
    </div>
    
    <!-- Modal de novo agendamento -->
    <AgendamentoModal
      v-model="modalAberto"
      @sucesso="handleSucesso"
    />
  </div>
</template>

<script setup lang="ts">
import type { Agendamento } from '~/types'

// Middleware de autenticação
definePageMeta({
  middleware: 'auth'
})

// Composable de API
const { listarAgendamentos } = useApi()

// Estados
const agendamentos = ref<Agendamento[]>([])
const modalAberto = ref(false)
const filtroStatus = ref('')
const filtroData = ref('')

// Computed: Agendamentos filtrados
const agendamentosFiltrados = computed(() => {
  let resultado = agendamentos.value
  
  // Filtrar por status
  if (filtroStatus.value) {
    resultado = resultado.filter(a => a.status === filtroStatus.value)
  }
  
  // Filtrar por data
  if (filtroData.value) {
    resultado = resultado.filter(a => a.data === filtroData.value)
  }
  
  return resultado
})

// Carregar agendamentos ao montar
const carregarAgendamentos = async () => {
  agendamentos.value = await listarAgendamentos()
}

onMounted(carregarAgendamentos)

// Função chamada quando criar agendamento com sucesso
const handleSucesso = async () => {
  await carregarAgendamentos()
}

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
