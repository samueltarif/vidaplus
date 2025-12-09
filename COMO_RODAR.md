# 🚀 Como Rodar o Projeto VidaPlus

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- **Node.js** versão 18 ou superior
- **npm** (vem com o Node.js)

## Passo a Passo

### 1. Instalar Dependências

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

Aguarde a instalação de todas as dependências. Isso pode levar alguns minutos.

### 2. Iniciar o Servidor de Desenvolvimento

Após a instalação, inicie o servidor:

```bash
npm run dev
```

Você verá uma mensagem similar a:

```
Nuxt 4.2.1 with Nitro 2.x.x

  ➜ Local:    http://localhost:3000/
  ➜ Network:  use --host to expose
```

### 3. Acessar o Sistema

Abra seu navegador e acesse:

```
http://localhost:3000
```

### 4. Fazer Login

Use as credenciais de teste:

- **Email**: `admin@vidaplus.com`
- **Senha**: `admin123`

## Pronto! 🎉

Agora você pode:

✅ Navegar pelo dashboard
✅ Ver a lista de pacientes
✅ Cadastrar novos pacientes
✅ Criar agendamentos
✅ Explorar todas as funcionalidades

## Comandos Úteis

```bash
# Parar o servidor
Ctrl + C (no terminal)

# Limpar cache e reinstalar
npm run clean
npm install

# Build para produção
npm run build

# Preview da build
npm run preview
```

## Problemas Comuns

### Porta 3000 já está em uso

Se a porta 3000 estiver ocupada, você pode usar outra:

```bash
PORT=3001 npm run dev
```

### Erro ao instalar dependências

Tente limpar o cache do npm:

```bash
npm cache clean --force
npm install
```

### Página em branco

1. Verifique se o servidor está rodando
2. Limpe o cache do navegador (Ctrl + Shift + Delete)
3. Tente acessar em modo anônimo

## Estrutura de Navegação

```
Login (/)
  ↓
Dashboard (/dashboard)
  ├── Pacientes (/pacientes)
  │   └── Novo Paciente (/pacientes/novo)
  └── Agendamentos (/agendamentos)
```

## Dados de Teste

O sistema já vem com dados de exemplo:

**Pacientes:**
- João Silva Santos
- Maria Oliveira Costa
- Pedro Henrique Souza
- Ana Paula Ferreira

**Agendamentos:**
- 5 consultas de exemplo com diferentes status

## Suporte

Se encontrar algum problema:

1. Verifique se o Node.js está instalado: `node --version`
2. Verifique se está na pasta correta do projeto
3. Certifique-se de que executou `npm install`
4. Veja os logs no terminal para identificar erros

---

**Desenvolvido com Nuxt 4 + Vue 3 + TailwindCSS**

Bom uso! 🚀
