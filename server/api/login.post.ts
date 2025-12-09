// API Mock para login
export default defineEventHandler(async (event) => {
  // Ler dados do corpo da requisição
  const body = await readBody(event)
  const { email, senha } = body
  
  // Validação simples - usuário de teste
  if (email === 'admin@vidaplus.com' && senha === 'admin123') {
    return {
      success: true,
      usuario: {
        id: 1,
        nome: 'Administrador',
        email: 'admin@vidaplus.com',
        token: 'fake-jwt-token-' + Date.now()
      }
    }
  }
  
  // Login inválido
  return {
    success: false,
    message: 'Email ou senha inválidos'
  }
})
