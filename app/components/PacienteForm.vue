<template>
  <!-- Formulário de cadastro/edição de paciente -->
  <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">
      {{ pacienteId ? 'Editar Paciente' : 'Novo Paciente' }}
    </h2>
    
    <div class="space-y-4">
      <!-- Campo: Nome Completo -->
      <div>
        <label for="nome" class="block text-sm font-medium text-gray-700 mb-1">
          Nome Completo *
        </label>
        <input
          id="nome"
          v-model="form.nome"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Digite o nome completo"
        />
      </div>
      
      <!-- Campo: CPF -->
      <div>
        <label for="cpf" class="block text-sm font-medium text-gray-700 mb-1">
          CPF *
        </label>
        <input
          id="cpf"
          v-model="form.cpf"
          type="text"
          required
          maxlength="14"
          @input="formatarCPF"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="000.000.000-00"
        />
      </div>
      
      <!-- Campo: Data de Nascimento -->
      <div>
        <label for="dataNascimento" class="block text-sm font-medium text-gray-700 mb-1">
          Data de Nascimento *
        </label>
        <input
          id="dataNascimento"
          v-model="form.dataNascimento"
          type="date"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <!-- Campo: Telefone -->
      <div>
        <label for="telefone" class="block text-sm font-medium text-gray-700 mb-1">
          Telefone
        </label>
        <input
          id="telefone"
          v-model="form.telefone"
          type="text"
          maxlength="15"
          @input="formatarTelefone"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="(00) 00000-0000"
        />
      </div>
      
      <!-- Campo: Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="email@exemplo.com"
        />
      </div>
      
      <!-- Campo: Endereço -->
      <div>
        <label for="endereco" class="block text-sm font-medium text-gray-700 mb-1">
          Endereço
        </label>
        <textarea
          id="endereco"
          v-model="form.endereco"
          rows="3"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Digite o endereço completo"
        ></textarea>
      </div>
    </div>
    
    <!-- Botões de ação -->
    <div class="flex gap-4 mt-6">
      <button
        type="submit"
        :disabled="loading"
        class="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors duration-200"
      >
        {{ loading ? 'Salvando...' : 'Salvar Paciente' }}
      </button>
      
      <button
        type="button"
        @click="$emit('cancelar')"
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
</template>

<script setup lang="ts">
import type { PacienteForm } from '~/types'

// Props do componente
const props = defineProps<{
  pacienteId?: number
}>()

// Emits
const emit = defineEmits<{
  sucesso: []
  cancelar: []
}>()

// Composable de API
const { buscarPaciente, criarPaciente, atualizarPaciente } = useApi()

// Estado do formulário
const form = ref<PacienteForm>({
  nome: '',
  cpf: '',
  dataNascimento: '',
  telefone: '',
  email: '',
  endereco: ''
})

// Estados de controle
const loading = ref(false)
const erro = ref('')

// Carregar dados do paciente se for edição
onMounted(async () => {
  if (props.pacienteId) {
    const paciente = await buscarPaciente(props.pacienteId)
    if (paciente) {
      form.value = {
        nome: paciente.nome,
        cpf: paciente.cpf,
        dataNascimento: paciente.dataNascimento,
        telefone: paciente.telefone || '',
        email: paciente.email || '',
        endereco: paciente.endereco || ''
      }
    }
  }
})

// Função para formatar CPF
const formatarCPF = (event: Event) => {
  const input = event.target as HTMLInputElement
  let valor = input.value.replace(/\D/g, '')
  
  if (valor.length <= 11) {
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    form.value.cpf = valor
  }
}

// Função para formatar telefone
const formatarTelefone = (event: Event) => {
  const input = event.target as HTMLInputElement
  let valor = input.value.replace(/\D/g, '')
  
  if (valor.length <= 11) {
    valor = valor.replace(/(\d{2})(\d)/, '($1) $2')
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2')
    form.value.telefone = valor
  }
}

// Função para submeter formulário
const handleSubmit = async () => {
  loading.value = true
  erro.value = ''
  
  try {
    let resultado
    
    if (props.pacienteId) {
      // Atualizar paciente existente
      resultado = await atualizarPaciente(props.pacienteId, form.value)
    } else {
      // Criar novo paciente
      resultado = await criarPaciente(form.value)
    }
    
    if (resultado) {
      emit('sucesso')
    } else {
      erro.value = 'Erro ao salvar paciente. Tente novamente.'
    }
  } catch (error) {
    erro.value = 'Erro ao salvar paciente. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>
