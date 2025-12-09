<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-4">
    <!-- Card de login -->
    <div class="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
      <!-- Logo e título -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center bg-blue-500 rounded-full w-16 h-16 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800">VidaPlus</h1>
        <p class="text-gray-600 mt-2">Sistema de Gestão Hospitalar</p>
      </div>
      
      <!-- Formulário de login -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Campo: Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="seu@email.com"
          />
        </div>
        
        <!-- Campo: Senha -->
        <div>
          <label for="senha" class="block text-sm font-medium text-gray-700 mb-2">
            Senha
          </label>
          <input
            id="senha"
            v-model="form.senha"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>
        
        <!-- Botão de login -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors duration-200"
        >
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
        
        <!-- Mensagem de erro -->
        <div v-if="erro" class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {{ erro }}
        </div>
      </form>
      
      <!-- Informações de teste -->
      <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p class="text-xs text-blue-800 font-medium mb-2">Credenciais de teste:</p>
        <p class="text-xs text-blue-700">Email: admin@vidaplus.com</p>
        <p class="text-xs text-blue-700">Senha: admin123</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composable de API
const { login } = useApi()

// Estado do formulário
const form = ref({
  email: '',
  senha: ''
})

// Estados de controle
const loading = ref(false)
const erro = ref('')

// Função para fazer login
const handleLogin = async () => {
  loading.value = true
  erro.value = ''
  
  try {
    const response = await login(form.value.email, form.value.senha)
    
    if (response.success) {
      // Redirecionar para dashboard
      navigateTo('/dashboard')
    } else {
      erro.value = response.message || 'Email ou senha inválidos'
    }
  } catch (error) {
    erro.value = 'Erro ao conectar com servidor'
  } finally {
    loading.value = false
  }
}
</script>
