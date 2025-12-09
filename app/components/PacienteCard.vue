<template>
  <!-- Card de paciente com informações resumidas -->
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
    <!-- Cabeçalho do card com avatar e nome -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-4">
        <!-- Avatar com iniciais -->
        <div class="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
          {{ iniciais }}
        </div>
        
        <!-- Nome e ID -->
        <div>
          <h3 class="text-lg font-bold text-gray-800">{{ paciente.nome }}</h3>
          <p class="text-sm text-gray-500">ID: {{ paciente.id }}</p>
        </div>
      </div>
      
      <!-- Botão de editar -->
      <button
        @click="$emit('editar', paciente.id)"
        class="text-blue-600 hover:text-blue-800 transition-colors"
        title="Editar paciente"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
    </div>
    
    <!-- Informações do paciente -->
    <div class="space-y-2">
      <!-- CPF -->
      <div class="flex items-center gap-2 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
        <span class="text-gray-600">CPF:</span>
        <span class="font-medium text-gray-800">{{ cpfFormatado }}</span>
      </div>
      
      <!-- Data de nascimento -->
      <div class="flex items-center gap-2 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
        </svg>
        <span class="text-gray-600">Nascimento:</span>
        <span class="font-medium text-gray-800">{{ dataFormatada }}</span>
      </div>
      
      <!-- Telefone (se existir) -->
      <div v-if="paciente.telefone" class="flex items-center gap-2 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        <span class="text-gray-600">Telefone:</span>
        <span class="font-medium text-gray-800">{{ paciente.telefone }}</span>
      </div>
    </div>
    
    <!-- Botão de ação -->
    <div class="mt-4 pt-4 border-t border-gray-200">
      <button
        @click="$emit('visualizar', paciente.id)"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-200 font-medium"
      >
        Ver Detalhes
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Paciente } from '~/types'

// Props do componente
const props = defineProps<{
  paciente: Paciente
}>()

// Emits para eventos
defineEmits<{
  editar: [id: number]
  visualizar: [id: number]
}>()

// Computed: Iniciais do nome
const iniciais = computed(() => {
  const nomes = props.paciente.nome.split(' ')
  if (nomes.length >= 2) {
    return `${nomes[0][0]}${nomes[1][0]}`.toUpperCase()
  }
  return props.paciente.nome.substring(0, 2).toUpperCase()
})

// Computed: CPF formatado
const cpfFormatado = computed(() => {
  const cpf = props.paciente.cpf.replace(/\D/g, '')
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
})

// Computed: Data formatada
const dataFormatada = computed(() => {
  const data = new Date(props.paciente.dataNascimento)
  return data.toLocaleDateString('pt-BR')
})
</script>
