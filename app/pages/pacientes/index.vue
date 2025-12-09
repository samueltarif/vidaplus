<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Conteúdo principal -->
    <div class="ml-64">
      <!-- Header -->
      <Header titulo="Pacientes" />
      
      <!-- Área de conteúdo -->
      <main class="pt-16 p-6">
        <!-- Barra de ações -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-between">
          <!-- Campo de busca -->
          <div class="flex-1 max-w-md">
            <input
              v-model="busca"
              type="text"
              placeholder="Buscar paciente por nome ou CPF..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <!-- Botão novo paciente -->
          <NuxtLink
            to="/pacientes/novo"
            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Novo Paciente
          </NuxtLink>
        </div>
        
        <!-- Lista de pacientes -->
        <div v-if="pacientesFiltrados.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PacienteCard
            v-for="paciente in pacientesFiltrados"
            :key="paciente.id"
            :paciente="paciente"
            @editar="editarPaciente"
            @visualizar="visualizarPaciente"
          />
        </div>
        
        <!-- Mensagem quando não há pacientes -->
        <div v-else class="bg-white rounded-lg shadow-md p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Nenhum paciente encontrado</h3>
          <p class="text-gray-600 mb-6">
            {{ busca ? 'Tente buscar com outros termos' : 'Comece cadastrando seu primeiro paciente' }}
          </p>
          <NuxtLink
            v-if="!busca"
            to="/pacientes/novo"
            class="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Cadastrar Primeiro Paciente
          </NuxtLink>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Paciente } from '~/types'

// Middleware de autenticação
definePageMeta({
  middleware: 'auth'
})

// Composable de API
const { listarPacientes } = useApi()

// Estados
const pacientes = ref<Paciente[]>([])
const busca = ref('')

// Computed: Pacientes filtrados pela busca
const pacientesFiltrados = computed(() => {
  if (!busca.value) return pacientes.value
  
  const termo = busca.value.toLowerCase()
  return pacientes.value.filter(p => 
    p.nome.toLowerCase().includes(termo) ||
    p.cpf.includes(termo)
  )
})

// Carregar pacientes ao montar
onMounted(async () => {
  pacientes.value = await listarPacientes()
})

// Função para editar paciente
const editarPaciente = (id: number) => {
  navigateTo(`/pacientes/novo?id=${id}`)
}

// Função para visualizar paciente
const visualizarPaciente = (id: number) => {
  // Por enquanto, redireciona para edição
  // Futuramente pode ser uma página de detalhes
  editarPaciente(id)
}
</script>
