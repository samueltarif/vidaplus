<template>
  <!-- Header fixo no topo com informações do usuário -->
  <header class="bg-white shadow-md h-16 fixed top-0 right-0 left-64 z-10">
    <div class="h-full px-6 flex items-center justify-between">
      <!-- Título da página atual -->
      <div>
        <h1 class="text-2xl font-bold text-gray-800">{{ tituloPagina }}</h1>
      </div>
      
      <!-- Informações do usuário e botão de logout -->
      <div class="flex items-center gap-4">
        <div class="text-right">
          <p class="text-sm font-medium text-gray-700">{{ usuario?.nome }}</p>
          <p class="text-xs text-gray-500">{{ usuario?.email }}</p>
        </div>
        
        <button
          @click="handleLogout"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
          </svg>
          Sair
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { Usuario } from '~/types'

// Props para receber o título da página
const props = defineProps<{
  titulo?: string
}>()

// Composable de API
const { logout, getUsuarioLogado } = useApi()

// Rota atual
const route = useRoute()

// Usuário logado
const usuario = ref<Usuario | null>(null)

// Título da página baseado na rota
const tituloPagina = computed(() => {
  if (props.titulo) return props.titulo
  
  const titulos: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/pacientes': 'Pacientes',
    '/pacientes/novo': 'Novo Paciente',
    '/agendamentos': 'Agendamentos'
  }
  
  return titulos[route.path] || 'VidaPlus'
})

// Carregar usuário ao montar componente
onMounted(() => {
  usuario.value = getUsuarioLogado()
})

// Função para fazer logout
const handleLogout = () => {
  if (confirm('Deseja realmente sair do sistema?')) {
    logout()
  }
}
</script>
