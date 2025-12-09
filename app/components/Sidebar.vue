<template>
  <!-- Sidebar fixa na lateral esquerda -->
  <aside class="bg-blue-900 text-white w-64 min-h-screen fixed left-0 top-0 z-20">
    <!-- Logo e nome do sistema -->
    <div class="p-6 border-b border-blue-800">
      <div class="flex items-center gap-3">
        <div class="bg-white rounded-lg p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-900" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          <h2 class="text-xl font-bold">VidaPlus</h2>
          <p class="text-xs text-blue-300">Gestão Hospitalar</p>
        </div>
      </div>
    </div>
    
    <!-- Menu de navegação -->
    <nav class="p-4">
      <ul class="space-y-2">
        <!-- Item: Dashboard -->
        <li>
          <NuxtLink
            to="/dashboard"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200"
            :class="isActive('/dashboard') ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-800'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span class="font-medium">Dashboard</span>
          </NuxtLink>
        </li>
        
        <!-- Item: Pacientes -->
        <li>
          <NuxtLink
            to="/pacientes"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200"
            :class="isActive('/pacientes') ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-800'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span class="font-medium">Pacientes</span>
          </NuxtLink>
        </li>
        
        <!-- Item: Agendamentos -->
        <li>
          <NuxtLink
            to="/agendamentos"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200"
            :class="isActive('/agendamentos') ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-800'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">Agendamentos</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    
    <!-- Informações adicionais no rodapé -->
    <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-800">
      <p class="text-xs text-blue-300 text-center">
        © 2024 VidaPlus<br />
        Sistema de Gestão Hospitalar
      </p>
    </div>
  </aside>
</template>

<script setup lang="ts">
// Rota atual para destacar item ativo
const route = useRoute()

// Função para verificar se a rota está ativa
const isActive = (path: string): boolean => {
  return route.path.startsWith(path)
}
</script>
