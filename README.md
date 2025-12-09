# VidaPlus - Sistema de Gestão Hospitalar

Sistema completo de gestão hospitalar desenvolvido com Nuxt 4, Vue 3 e TailwindCSS.

## 🚀 Tecnologias

- **Framework**: Nuxt 4
- **Frontend**: Vue 3 com Composition API e Script Setup
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS
- **API Mock**: Nuxt Server Routes

## 📋 Funcionalidades

### ✅ Autenticação
- Login com validação
- Proteção de rotas com middleware
- Armazenamento de token no localStorage

### 👥 Gestão de Pacientes
- Listagem de pacientes com busca
- Cadastro de novos pacientes
- Edição de pacientes existentes
- Validação de formulários
- Formatação automática de CPF e telefone

### 📅 Agendamentos
- Listagem de consultas agendadas
- Criação de novos agendamentos
- Filtros por status e data
- Seleção de paciente e horário
- Status de agendamento (agendado, confirmado, cancelado, realizado)

### 📊 Dashboard
- Estatísticas gerais do sistema
- Total de pacientes
- Agendamentos do dia
- Próximas consultas
- Últimos agendamentos
- Ações rápidas

## 🗂️ Estrutura do Projeto

```
app/
├── components/          # Componentes reutilizáveis
│   ├── Header.vue      # Cabeçalho com informações do usuário
│   ├── Sidebar.vue     # Menu lateral de navegação
│   ├── PacienteCard.vue        # Card de exibição de paciente
│   ├── PacienteForm.vue        # Formulário de paciente
│   └── AgendamentoModal.vue    # Modal de agendamento
├── composables/        # Composables do Vue
│   └── useApi.ts      # Funções de chamada à API
├── middleware/         # Middlewares do Nuxt
│   └── auth.ts        # Middleware de autenticação
├── pages/             # Páginas da aplicação
│   ├── index.vue      # Página inicial (redirect)
│   ├── login.vue      # Página de login
│   ├── dashboard.vue  # Dashboard principal
│   ├── pacientes/
│   │   ├── index.vue  # Lista de pacientes
│   │   └── novo.vue   # Cadastro/edição de paciente
│   └── agendamentos/
│       └── index.vue  # Lista de agendamentos
└── types/
    └── index.ts       # Tipos TypeScript

server/
└── api/               # API Mock
    ├── login.post.ts  # Endpoint de login
    ├── pacientes/
    │   ├── index.get.ts   # Listar pacientes
    │   ├── index.post.ts  # Criar paciente
    │   └── [id].put.ts    # Atualizar paciente
    └── agendamentos/
        ├── index.get.ts   # Listar agendamentos
        └── index.post.ts  # Criar agendamento
```

## 🎯 Fluxo da Aplicação

1. **Login** → Usuário acessa `/login` e faz autenticação
2. **Dashboard** → Após login, é redirecionado para o dashboard com estatísticas
3. **Pacientes** → Pode listar, buscar, cadastrar e editar pacientes
4. **Agendamentos** → Pode visualizar e criar novos agendamentos de consultas

## 🔐 Credenciais de Teste

Para acessar o sistema, use as seguintes credenciais:

- **Email**: admin@vidaplus.com
- **Senha**: admin123

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse no navegador:
```
http://localhost:3000
```

### Outros Comandos

```bash
# Build para produção
npm run build

# Preview da build de produção
npm run preview

# Gerar site estático
npm run generate
```

## 📱 Layout Responsivo

O sistema é totalmente responsivo e funciona em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## 🎨 Componentes Principais

### Header
- Exibe título da página atual
- Mostra informações do usuário logado
- Botão de logout

### Sidebar
- Menu de navegação fixo
- Links para Dashboard, Pacientes e Agendamentos
- Logo e informações do sistema

### PacienteCard
- Exibe informações resumidas do paciente
- Avatar com iniciais
- CPF, data de nascimento e telefone formatados
- Botões de ação (editar e visualizar)

### PacienteForm
- Formulário completo de cadastro/edição
- Validação de campos obrigatórios
- Formatação automática de CPF e telefone
- Feedback de erro e sucesso

### AgendamentoModal
- Modal para criar novos agendamentos
- Seleção de paciente
- Escolha de data e horário
- Campo de motivo da consulta

## 🔄 API Mock

O sistema utiliza APIs mock implementadas no próprio Nuxt:

### Endpoints Disponíveis

**Autenticação**
- `POST /api/login` - Fazer login

**Pacientes**
- `GET /api/pacientes` - Listar todos os pacientes
- `POST /api/pacientes` - Criar novo paciente
- `PUT /api/pacientes/:id` - Atualizar paciente

**Agendamentos**
- `GET /api/agendamentos` - Listar todos os agendamentos
- `POST /api/agendamentos` - Criar novo agendamento

## 💡 Recursos Implementados

✅ Sistema de autenticação completo
✅ Proteção de rotas com middleware
✅ CRUD completo de pacientes
✅ Gestão de agendamentos
✅ Dashboard com estatísticas
✅ Busca e filtros
✅ Validação de formulários
✅ Formatação automática de dados
✅ Feedback visual (loading, erros, sucesso)
✅ Layout responsivo
✅ Componentes reutilizáveis
✅ TypeScript em todo o projeto
✅ Comentários em português
✅ API mock funcional

## 📝 Observações

- Os dados são armazenados em memória (não persistem após reiniciar o servidor)
- O token de autenticação é armazenado no localStorage
- Todos os comentários no código estão em português
- O código está organizado de forma modular e componentizada
- Pronto para ser expandido com backend real

## 🚀 Próximos Passos (Sugestões)

- Integrar com backend real
- Adicionar mais validações
- Implementar paginação
- Adicionar mais filtros e buscas
- Criar relatórios
- Adicionar notificações
- Implementar histórico médico
- Adicionar gestão de médicos
- Criar sistema de prontuário eletrônico

---

**Desenvolvido com ❤️ usando Nuxt 4 + Vue 3 + TailwindCSS**
