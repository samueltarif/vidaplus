<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Conteúdo principal -->
    <div class="ml-64">
      <!-- Header -->
      <Header :titulo="pacienteId ? 'Editar Paciente' : 'Novo Paciente'" />
      
      <!-- Área de conteúdo -->
      <main class="pt-16 p-6">
        <!-- Breadcrumb -->
        <div class="mb-6">
          <nav class="flex items-center gap-2 text-sm text-gray-600">
            <NuxtLink to="/pacientes" class="hover:text-blue-500">Pacientes</NuxtLink>
            <span>/</span>
            <span class="text-gray-800 font-medium">{{ pacienteId ? 'Editar' : 'Novo' }}</span>
          </nav>
        </div>
        
        <!-- Formulário -->
        <div class="max-w-2xl">
          <PacienteForm
            :paciente-id="pacienteId"
            @sucesso="handleSucesso"
            @cancelar="handleCancelar"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Middleware de autenticação
definePageMeta({
  middleware: 'auth'
})

// Rota atual
const route = useRoute()

// ID do paciente (se for edição)
const pacienteId = computed(() => {
  const id = route.query.id
  return id ? Number(id) : undefined
})

// Função chamada quando salvar com sucesso
const handleSucesso = () => {
  // Redirecionar para lista de pacientes
  navigateTo('/pacientes')
}

// Função chamada ao cancelar
const handleCancelar = () => {
  // Voltar para lista de pacientes
  navigateTo('/pacientes')
}
</script>
