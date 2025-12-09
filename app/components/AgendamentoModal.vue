<template>
  <!-- Modal de agendamento -->
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="fecharModal"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <!-- Cabeçalho do modal -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Novo Agendamento</h2>
          <button
            @click="fecharModal"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Formulário -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Campo: Selecionar Paciente -->
          <div>
            <label for="paciente" class="block text-sm font-medium text-gray-700 mb-1">
              Paciente *
            </label>
            <select
              id="paciente"
              v-model="form.pacienteId"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecione um paciente</option>
              <option v-for="paciente in pacientes" :key="paciente.id" :value="paciente.id">
                {{ paciente.nome }}
              </option>
            </select>
          </div>
          
          <!-- Campo: Data -->
          <div>
            <label for="data" class="block text-sm font-medium text-gray-700 mb-1">
              Data *
            </label>
            <input
              id="data"
              v-model="form.data"
              type="date"
              required
              :min="dataMinima"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <!-- Campo: Horário -->
          <div>
            <label for="horario" class="block text-sm font-medium text-gray-700 mb-1">
              Horário *
            </label>
            <select
              id="horario"
              v-model="form.horario"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecione um horário</option>
              <option v-for="horario in horariosDisponiveis" :key="horario" :value="horario">
                {{ horario }}
              </option>
            </select>
          </div>
          
          <!-- Campo: Motivo -->
          <div>
            <label for="motivo" class="block text-sm font-medium text-gray-700 mb-1">
              Motivo da Consulta *
            </label>
            <textarea
              id="motivo"
              v-model="form.motivo"
              required
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descreva o motivo da consulta"
            ></textarea>
          </div>
          
          <!-- Botões de ação -->
          <div class="flex gap-4 mt-6">
            <button
              type="submit"
              :disabled="loading"
              class="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors duration-200"
            >
              {{ loading ? 'Agendando...' : 'Agendar Consulta' }}
            </button>
            
            <button
              type="button"
              @click="fecharModal"
              class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Cancelar
            </button>
          </div>
          
          <!-- Mensagem de erro -->
          <div v-if="erro" class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {{ erro }}
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Paciente, AgendamentoForm } from '~/types'

// Props
const props = defineProps<{
  modelValue: boolean
}>()

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  sucesso: []
}>()

// Composable de API
const { listarPacientes, criarAgendamento } = useApi()

// Estado do formulário
const form = ref<AgendamentoForm>({
  pacienteId: 0,
  data: '',
  horario: '',
  motivo: ''
})

// Estados de controle
const loading = ref(false)
const erro = ref('')
const pacientes = ref<Paciente[]>([])

// Horários disponíveis para agendamento
const horariosDisponiveis = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
]

// Data mínima (hoje)
const dataMinima = computed(() => {
  const hoje = new Date()
  return hoje.toISOString().split('T')[0]
})

// Carregar pacientes ao montar
onMounted(async () => {
  pacientes.value = await listarPacientes()
})

// Função para fechar modal
const fecharModal = () => {
  emit('update:modelValue', false)
  // Limpar formulário
  form.value = {
    pacienteId: 0,
    data: '',
    horario: '',
    motivo: ''
  }
  erro.value = ''
}

// Função para submeter formulário
const handleSubmit = async () => {
  loading.value = true
  erro.value = ''
  
  try {
    const resultado = await criarAgendamento(form.value)
    
    if (resultado) {
      emit('sucesso')
      fecharModal()
    } else {
      erro.value = 'Erro ao criar agendamento. Tente novamente.'
    }
  } catch (error) {
    erro.value = 'Erro ao criar agendamento. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>
