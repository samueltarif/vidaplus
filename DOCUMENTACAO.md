# 📚 Documentação Técnica - VidaPlus

## Visão Geral

O VidaPlus é um sistema de gestão hospitalar completo desenvolvido com as melhores práticas de desenvolvimento frontend moderno.

## 🏗️ Arquitetura

### Padrão de Componentes

O projeto segue o padrão de **Componentes Reutilizáveis** com **Composition API** do Vue 3.

#### Componentes Base

**Header.vue**
- **Responsabilidade**: Exibir cabeçalho com informações do usuário
- **Props**: `titulo?: string`
- **Funcionalidades**:
  - Exibe nome e email do usuário logado
  - Botão de logout com confirmação
  - Título dinâmico baseado na rota

**Sidebar.vue**
- **Responsabilidade**: Menu de navegação lateral
- **Funcionalidades**:
  - Links para todas as páginas principais
  - Destaque visual da página ativa
  - Logo e informações do sistema

**PacienteCard.vue**
- **Responsabilidade**: Exibir informações resumidas de um paciente
- **Props**: `paciente: Paciente`
- **Emits**: `editar(id)`, `visualizar(id)`
- **Funcionalidades**:
  - Avatar com iniciais do nome
  - Formatação automática de CPF
  - Formatação de data de nascimento
  - Botões de ação

**PacienteForm.vue**
- **Responsabilidade**: Formulário de cadastro/edição de paciente
- **Props**: `pacienteId?: number`
- **Emits**: `sucesso()`, `cancelar()`
- **Funcionalidades**:
  - Validação de campos obrigatórios
  - Formatação automática de CPF e telefone
  - Carregamento de dados para edição
  - Feedback de erro

**AgendamentoModal.vue**
- **Responsabilidade**: Modal para criar agendamentos
- **Props**: `modelValue: boolean`
- **Emits**: `update:modelValue(value)`, `sucesso()`
- **Funcionalidades**:
  - Seleção de paciente
  - Escolha de data (mínimo hoje)
  - Seleção de horário disponível
  - Campo de motivo

### Composables

**useApi.ts**

Centraliza todas as chamadas de API do sistema.

**Funções de Autenticação:**
```typescript
login(email: string, senha: string): Promise<LoginResponse>
logout(): void
getUsuarioLogado(): Usuario | null
isAuthenticated(): boolean
```

**Funções de Pacientes:**
```typescript
listarPacientes(): Promise<Paciente[]>
buscarPaciente(id: number): Promise<Paciente | null>
criarPaciente(paciente: PacienteForm): Promise<Paciente | null>
atualizarPaciente(id: number, paciente: PacienteForm): Promise<Paciente | null>
```

**Funções de Agendamentos:**
```typescript
listarAgendamentos(): Promise<Agendamento[]>
criarAgendamento(agendamento: AgendamentoForm): Promise<Agendamento | null>
```

### Tipos TypeScript

**Usuario**
```typescript
interface Usuario {
  id: number
  nome: string
  email: string
  token: string
}
```

**Paciente**
```typescript
interface Paciente {
  id: number
  nome: string
  cpf: string
  dataNascimento: string
  telefone?: string
  email?: string
  endereco?: string
}
```

**Agendamento**
```typescript
interface Agendamento {
  id: number
  pacienteId: number
  pacienteNome: string
  data: string
  horario: string
  motivo: string
  status: 'agendado' | 'confirmado' | 'cancelado' | 'realizado'
}
```

## 🔐 Autenticação

### Fluxo de Autenticação

1. Usuário acessa `/login`
2. Preenche email e senha
3. Sistema valida credenciais via `POST /api/login`
4. Se válido, armazena token e dados do usuário no localStorage
5. Redireciona para `/dashboard`

### Middleware de Proteção

O arquivo `app/middleware/auth.ts` protege todas as rotas exceto `/login`:

```typescript
// Se não tem token e não está indo para login, redireciona
if (!token && to.path !== '/login') {
  return navigateTo('/login')
}

// Se tem token e está tentando acessar login, redireciona para dashboard
if (token && to.path === '/login') {
  return navigateTo('/dashboard')
}
```

## 📄 Páginas

### /login
- **Arquivo**: `app/pages/login.vue`
- **Acesso**: Público
- **Funcionalidade**: Autenticação de usuários

### /dashboard
- **Arquivo**: `app/pages/dashboard.vue`
- **Acesso**: Protegido
- **Funcionalidade**: Visão geral do sistema com estatísticas

### /pacientes
- **Arquivo**: `app/pages/pacientes/index.vue`
- **Acesso**: Protegido
- **Funcionalidade**: Listagem e busca de pacientes

### /pacientes/novo
- **Arquivo**: `app/pages/pacientes/novo.vue`
- **Acesso**: Protegido
- **Funcionalidade**: Cadastro e edição de pacientes
- **Query Params**: `?id=123` para edição

### /agendamentos
- **Arquivo**: `app/pages/agendamentos/index.vue`
- **Acesso**: Protegido
- **Funcionalidade**: Listagem e criação de agendamentos

## 🎨 Estilização

### TailwindCSS

O projeto usa TailwindCSS para estilização com classes utilitárias.

**Paleta de Cores Principal:**
- **Primária**: Blue (500, 600, 700, 800, 900)
- **Sucesso**: Green (100, 500, 600, 800)
- **Erro**: Red (100, 400, 500, 600, 700, 800)
- **Neutro**: Gray (100-900)

**Componentes Comuns:**

Botão Primário:
```html
<button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
```

Input:
```html
<input class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
```

Card:
```html
<div class="bg-white rounded-lg shadow-md p-6">
```

## 🔄 API Mock

### Estrutura de Dados

Os dados são armazenados em memória nos arquivos da API:

**Pacientes**: `server/api/pacientes/index.get.ts`
- Array exportado que pode ser modificado por outros endpoints

**Agendamentos**: `server/api/agendamentos/index.get.ts`
- Array exportado que pode ser modificado por outros endpoints

### Endpoints

**POST /api/login**
- Body: `{ email: string, senha: string }`
- Response: `{ success: boolean, usuario?: Usuario, message?: string }`

**GET /api/pacientes**
- Response: `Paciente[]`

**POST /api/pacientes**
- Body: `PacienteForm`
- Response: `Paciente`

**PUT /api/pacientes/:id**
- Params: `id: number`
- Body: `PacienteForm`
- Response: `Paciente`

**GET /api/agendamentos**
- Response: `Agendamento[]` (ordenado por data decrescente)

**POST /api/agendamentos**
- Body: `AgendamentoForm`
- Response: `Agendamento`

## 🧪 Dados de Teste

### Usuário
- Email: admin@vidaplus.com
- Senha: admin123

### Pacientes Pré-cadastrados
1. João Silva Santos - CPF: 123.456.789-00
2. Maria Oliveira Costa - CPF: 987.654.321-00
3. Pedro Henrique Souza - CPF: 456.789.123-00
4. Ana Paula Ferreira - CPF: 321.654.987-00

### Agendamentos Pré-cadastrados
- 5 agendamentos de exemplo com diferentes status

## 🚀 Boas Práticas Implementadas

### Vue 3
✅ Composition API com `<script setup>`
✅ TypeScript em todos os componentes
✅ Refs e computed properties tipados
✅ Lifecycle hooks (onMounted)
✅ Emits tipados

### Nuxt 4
✅ Auto-imports de componentes
✅ Auto-imports de composables
✅ Server routes para API
✅ Middleware de rota
✅ definePageMeta para configuração

### TypeScript
✅ Interfaces para todos os tipos
✅ Tipagem de props e emits
✅ Tipagem de funções e retornos
✅ Tipos exportados centralizados

### Código Limpo
✅ Componentes pequenos e focados
✅ Separação de responsabilidades
✅ Comentários em português
✅ Nomes descritivos
✅ Código DRY (Don't Repeat Yourself)

### UX/UI
✅ Feedback visual (loading, erros)
✅ Validação de formulários
✅ Formatação automática de dados
✅ Confirmação de ações críticas
✅ Layout responsivo
✅ Transições suaves

## 📱 Responsividade

O sistema é responsivo usando breakpoints do Tailwind:

- **Mobile**: até 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

Classes responsivas usadas:
- `md:` para tablet e acima
- `lg:` para desktop e acima

Exemplo:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

## 🔧 Manutenção e Expansão

### Adicionar Nova Página

1. Criar arquivo em `app/pages/`
2. Adicionar link na Sidebar
3. Adicionar título no Header
4. Adicionar middleware se necessário

### Adicionar Novo Endpoint

1. Criar arquivo em `server/api/`
2. Adicionar função no `useApi.ts`
3. Usar a função nos componentes

### Adicionar Novo Tipo

1. Adicionar interface em `app/types/index.ts`
2. Exportar o tipo
3. Importar onde necessário

### Adicionar Novo Componente

1. Criar arquivo em `app/components/`
2. Definir props e emits tipados
3. Usar auto-import do Nuxt

## 🎯 Melhorias Futuras

### Curto Prazo
- [ ] Paginação nas listagens
- [ ] Mais filtros de busca
- [ ] Exportação de relatórios
- [ ] Impressão de documentos

### Médio Prazo
- [ ] Integração com backend real
- [ ] Autenticação JWT real
- [ ] Upload de arquivos
- [ ] Histórico de alterações

### Longo Prazo
- [ ] Prontuário eletrônico completo
- [ ] Gestão de médicos e especialidades
- [ ] Sistema de notificações
- [ ] Aplicativo mobile

---

**Documentação atualizada em: Dezembro 2024**
