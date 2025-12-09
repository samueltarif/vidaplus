// Middleware para proteger rotas que precisam de autenticação
export default defineNuxtRouteMiddleware((to, from) => {
  // Só executa no cliente
  if (process.client) {
    const token = localStorage.getItem('vidaplus_token')
    
    // Se não tem token e não está indo para login, redireciona
    if (!token && to.path !== '/login') {
      return navigateTo('/login')
    }
    
    // Se tem token e está tentando acessar login, redireciona para dashboard
    if (token && to.path === '/login') {
      return navigateTo('/dashboard')
    }
  }
})
