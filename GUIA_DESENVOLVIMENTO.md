# 🛠️ Guia de Desenvolvimento - VidaPlus

## Início Rápido

### 1. Instalação
```bash
npm install
```

### 2. Desenvolvimento
```bash
npm run dev
```

### 3. Acesso
Abra http://localhost:3000 e faça login com:
- Email: admin@vidaplus.com
- Senha: admin123

## 📝 Convenções do Projeto

### Nomenclatura

**Componentes**: PascalCase
```
PacienteCard.vue
AgendamentoModal.vue
```

**Composables**: camelCase com prefixo "use"
```
useApi.ts
useAuth.ts
```

**Tipos**: PascalCase
```typescript
interface Usuario { }
interface Paciente { }
```

**Variáveis e Funções**: camelCase
```typescript
const totalPacientes = ref(0)
const listarPacientes = async () => { }
```

### Estrutura de Componentes

```vue
<template>
  <!-- Template HTML -->
</template>

<script setup lang="ts">
// Imports
import type { Paciente } from '~/types'

// Props
const props = defineProps<{
  paciente: Paciente
}>()

// Emits
const emit = defineEmits<{
  editar: [id: number]
}>()

// Composables
const { listarPacientes } = useApi()

// Estados reativos
const loading = ref(false)

// Computed properties
const nomeFormatado = computed(() => {
  return props.paciente.nome.toUpperCase()
})

// Lifecycle hooks
onMounted(() => {
  // Código de inicialização
})

// Funções
const handleClick = () => {
  // Lógica da função
}
</script>
```

## 🎨 Guia de Estilo

### Cores

**Primárias**
- `bg-blue-500` - Botões e elementos principais
- `bg-blue-600` - Hover de botões
- `bg-blue-900` - Sidebar

**Status**
- `bg-green-500` - Sucesso
- `bg-red-500` - Erro
- `bg-yellow-500` - Aviso
- `bg-gray-500` - Neutro

**Backgrounds**
- `bg-white` - Cards e modais
- `bg-gray-100` - Background da página
- `bg-gray-50` - Hover de linhas

### Espaçamentos

**Padding de Cards**: `p-6`
**Gap entre elementos**: `gap-4` ou `gap-6`
**Margin entre seções**: `mb-6` ou `mb-8`

### Tipografia

**Títulos**
```html
<h1 class="text-3xl font-bold text-gray-800">
<h2 class="text-2xl font-bold text-gray-800">
<h3 class="text-xl font-bold text-gray-800">
```

**Texto normal**
```html
<p class="text-sm text-gray-600">
<p class="text-base text-gray-800">
```

### Botões

**Primário**
```html
<button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
```

**Secundário**
```html
<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors duration-200">
```

**Perigo**
```html
<button class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
```

### Inputs

```html
<input class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
```

### Cards

```html
<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
```

## 🔧 Tarefas Comuns

### Adicionar Nova Página

1. **Criar arquivo da página**
```bash
# Criar app/pages/nova-pagina.vue
```

2. **Adicionar link na Sidebar**
```vue
<!-- app/components/Sidebar.vue -->
<li>
  <NuxtLink
    to="/nova-pagina"
    class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200"
    :class="isActive('/nova-pagina') ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-800'"
  >
    <svg><!-- ícone --></svg>
    <span class="font-medium">Nova Página</span>
  </NuxtLink>
</li>
```

3. **Adicionar título no Header**
```typescript
// app/components/Header.vue
const titulos: Record<string, string> = {
  '/nova-pagina': 'Nova Página'
}
```

### Adicionar Novo Componente

1. **Criar arquivo do componente**
```vue
<!-- app/components/MeuComponente.vue -->
<template>
  <div>
    <!-- Template -->
  </div>
</template>

<script setup lang="ts">
// Props tipadas
const props = defineProps<{
  titulo: string
}>()

// Emits tipados
const emit = defineEmits<{
  click: []
}>()
</script>
```

2. **Usar o componente** (auto-import do Nuxt)
```vue
<template>
  <MeuComponente titulo="Teste" @click="handleClick" />
</template>
```

### Adicionar Novo Endpoint de API

1. **Criar arquivo do endpoint**
```typescript
// server/api/meu-endpoint.get.ts
export default defineEventHandler(() => {
  return {
    message: 'Olá do servidor!'
  }
})
```

2. **Adicionar função no composable**
```typescript
// app/composables/useApi.ts
export const useApi = () => {
  const meuEndpoint = async () => {
    try {
      const data = await $fetch('/api/meu-endpoint')
      return data
    } catch (error) {
      console.error('Erro:', error)
      return null
    }
  }
  
  return {
    // ... outras funções
    meuEndpoint
  }
}
```

3. **Usar no componente**
```vue
<script setup lang="ts">
const { meuEndpoint } = useApi()

onMounted(async () => {
  const data = await meuEndpoint()
  console.log(data)
})
</script>
```

### Adicionar Novo Tipo

1. **Definir interface**
```typescript
// app/types/index.ts
export interface MeuTipo {
  id: number
  nome: string
  ativo: boolean
}
```

2. **Usar o tipo**
```vue
<script setup lang="ts">
import type { MeuTipo } from '~/types'

const item = ref<MeuTipo>({
  id: 1,
  nome: 'Teste',
  ativo: true
})
</script>
```

## 🐛 Debug

### Ver Logs do Servidor
```bash
# Os logs aparecem no terminal onde você rodou npm run dev
```

### Ver Logs do Cliente
```typescript
// Use console.log normalmente
console.log('Debug:', variavel)

// Ou use o Vue DevTools no navegador
```

### Verificar Erros de Tipo
```bash
# Rodar verificação de tipos
npx nuxi typecheck
```

## 📦 Build e Deploy

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

### Gerar Site Estático
```bash
npm run generate
```

## 🧪 Testes Manuais

### Checklist de Funcionalidades

**Login**
- [ ] Login com credenciais corretas
- [ ] Login com credenciais incorretas
- [ ] Redirecionamento após login
- [ ] Logout funciona

**Pacientes**
- [ ] Listar pacientes
- [ ] Buscar paciente
- [ ] Criar novo paciente
- [ ] Editar paciente existente
- [ ] Validação de campos obrigatórios
- [ ] Formatação de CPF e telefone

**Agendamentos**
- [ ] Listar agendamentos
- [ ] Filtrar por status
- [ ] Filtrar por data
- [ ] Criar novo agendamento
- [ ] Validação de campos

**Dashboard**
- [ ] Estatísticas corretas
- [ ] Links funcionam
- [ ] Últimos agendamentos aparecem

**Geral**
- [ ] Navegação entre páginas
- [ ] Proteção de rotas
- [ ] Layout responsivo
- [ ] Sem erros no console

## 💡 Dicas

### Performance

1. **Use computed para valores derivados**
```typescript
// ✅ Bom
const nomeCompleto = computed(() => `${nome.value} ${sobrenome.value}`)

// ❌ Evite
const nomeCompleto = ref('')
watch([nome, sobrenome], () => {
  nomeCompleto.value = `${nome.value} ${sobrenome.value}`
})
```

2. **Use v-show para elementos que alternam frequentemente**
```vue
<!-- ✅ Bom para alternância frequente -->
<div v-show="mostrar">Conteúdo</div>

<!-- ✅ Bom para renderização condicional -->
<div v-if="existe">Conteúdo</div>
```

### Organização

1. **Mantenha componentes pequenos** (< 200 linhas)
2. **Extraia lógica complexa para composables**
3. **Use tipos TypeScript sempre**
4. **Comente código complexo em português**

### Git

```bash
# Commits descritivos
git commit -m "feat: adiciona filtro de data em agendamentos"
git commit -m "fix: corrige formatação de CPF"
git commit -m "docs: atualiza README"
```

## 🆘 Problemas Comuns

### Erro: "Cannot find module"
```bash
# Limpar cache e reinstalar
rm -rf node_modules .nuxt
npm install
```

### Erro: "Port 3000 already in use"
```bash
# Usar outra porta
PORT=3001 npm run dev
```

### Componente não aparece
- Verifique se está em `app/components/`
- Verifique o nome do arquivo (PascalCase)
- Reinicie o servidor de desenvolvimento

### API não responde
- Verifique se o arquivo está em `server/api/`
- Verifique a nomenclatura do arquivo
- Veja os logs no terminal

---

**Bom desenvolvimento! 🚀**
