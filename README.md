# EZ Site

Sistema de gerenciamento de conteúdo e site institucional construído com Next.js, Sanity CMS e TypeScript.

## 📋 Descrição

Este projeto é uma aplicação web moderna que combina um site institucional com um sistema de gerenciamento de conteúdo (CMS) headless. O projeto utiliza uma arquitetura de monorepo para organizar o código em aplicações e pacotes compartilhados.

### Principais Funcionalidades

- 🌐 **Site Institucional Multilíngue** (PT, EN, ES)
- 📝 **CMS Headless** com Sanity Studio
- 🎨 **Landing Pages Customizáveis** com componentes reutilizáveis
- 📧 **Sistema de Formulários de Contato** com envio de emails
- 📚 **Gerenciamento de E-books** com visualização interativa
- 🎯 **SEO Otimizado** com metadados dinâmicos
- 🌓 **Tema Claro/Escuro** com suporte a sistema
- 📱 **Design Responsivo** com mobile-first

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura de **monorepo** com os seguintes workspaces:

```
ez-site/
├── apps/
│   ├── web/          # Aplicação Next.js (frontend)
│   └── studio/       # Sanity Studio (CMS)
├── packages/
│   └── shared/       # Componentes e utilitários compartilhados
└── package.json      # Configuração do workspace
```

## 🛠️ Tecnologias

### Core
- **Next.js 15.1.6** - Framework React com App Router
- **React 19.1.0** - Biblioteca UI
- **TypeScript 5.8** - Tipagem estática
- **Node.js 22.x** - Runtime JavaScript

### CMS & Content
- **Sanity 3.99.0** - CMS Headless
- **next-sanity 10.0.4** - Integração Next.js + Sanity
- **@portabletext/react** - Renderização de conteúdo rich text

### Estilização
- **Tailwind CSS 4.1.7** - Framework CSS utility-first
- **Motion (Framer Motion) 12.15.0** - Animações
- **Sass 1.71.1** - Pré-processador CSS

### Internacionalização
- **next-intl 4.3.4** - Internacionalização para Next.js

### Formulários & Validação
- **react-hook-form 7.56.3** - Gerenciamento de formulários
- **zod 3.24.4** - Validação de schemas
- **@hookform/resolvers** - Integração Zod + React Hook Form

### UI Components
- **Radix UI** - Componentes acessíveis e não estilizados
  - Dialog, Select, Navigation Menu, Tabs, etc.
- **Lucide React** - Ícones
- **Sonner** - Notificações toast

### Carrosséis & Animações
- **Embla Carousel** - Carrossel performático
- **react-parallax** - Efeitos parallax
- **react-pageflip** - Visualização de e-books estilo livro

### Email
- **Resend 4.5.1** - Serviço de envio de emails
- **@react-email/components** - Templates de email

### Data Fetching
- **@tanstack/react-query 5.24.8** - Gerenciamento de estado servidor
- **React Query Devtools** - Ferramentas de desenvolvimento

### Build & Dev Tools
- **Turborepo** - Build system para monorepos
- **Biome** - Linter e formatter
- **Bun 1.2** - Gerenciador de pacotes

### Analytics & Performance
- **@vercel/analytics** - Analytics da Vercel
- **@vercel/speed-insights** - Métricas de performance
- **@bprogress/next** - Barra de progresso de navegação

### Outras
- **next-themes** - Gerenciamento de temas
- **class-variance-authority** - Variantes de componentes
- **tailwind-merge** - Merge de classes Tailwind

## 📦 Estrutura do Projeto

### Apps

#### `apps/web`
Aplicação Next.js principal que serve o site institucional.

**Estrutura:**
```
apps/web/
├── src/
│   ├── app/              # App Router do Next.js
│   ├── components/       # Componentes React
│   ├── hooks/           # Custom hooks
│   ├── server/          # Server actions e funções
│   ├── client/          # Cliente Sanity e queries
│   ├── config/          # Configurações
│   ├── types/           # Tipos TypeScript
│   └── utils/           # Funções utilitárias
├── messages/            # Arquivos de tradução
└── public/              # Assets estáticos
```

#### `apps/studio`
Sanity Studio para gerenciamento de conteúdo.

**Estrutura:**
```
apps/studio/
├── src/
│   ├── schemas/         # Schemas do Sanity
│   ├── components/      # Componentes do Studio
│   ├── structures/      # Estrutura de navegação
│   └── preview/         # Previews customizados
└── static/              # Assets estáticos
```

### Packages

#### `packages/shared`
Pacote compartilhado com componentes UI, hooks e utilitários reutilizáveis.

**Estrutura:**
```
packages/shared/
├── src/
│   ├── ui/              # Componentes UI base
│   ├── hooks/           # Hooks compartilhados
│   ├── icons/           # Ícones
│   ├── lib/             # Utilitários
│   ├── sanity/          # Helpers do Sanity
│   └── types/           # Tipos compartilhados
```

## 🚀 Como Começar

### Pré-requisitos

- Node.js 22.x
- Bun 1.2

### Instalação

```bash
# Instalar dependências
bun install

# Configurar variáveis de ambiente
# Copie .env.example para .env e preencha as variáveis necessárias
```

### Desenvolvimento

```bash
# Iniciar aplicação web
bun run dev:web

# Iniciar Sanity Studio
bun run dev:studio

# Executar linter
bun run lint:apps:check

# Formatar código
bun run lint:apps:format
```

### Build

```bash
# Build de todos os workspaces
bun run build
```

## 🔧 Configuração

### Variáveis de Ambiente

O projeto utiliza validação de variáveis de ambiente com `@t3-oss/env-core` e `zod`.

**Variáveis necessárias:**

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=seu_token

# Resend (Email)
RESEND_API_KEY=seu_api_key

# Vercel
NEXT_PUBLIC_VERCEL_URL=https://seu-dominio.com
VERCEL_ENV=production
```

Consulte `apps/web/src/config/env.ts` para a lista completa de variáveis.

## 📝 Scripts Disponíveis

### Root
- `bun run build` - Build de todos os workspaces
- `bun run dev:web` - Inicia o servidor de desenvolvimento do web
- `bun run dev:studio` - Inicia o Sanity Studio
- `bun run lint:apps:check` - Verifica linting nos apps
- `bun run lint:apps:format` - Formata código dos apps
- `bun run lint:packages:check` - Verifica linting nos packages
- `bun run lint:packages:format` - Formata código dos packages

### Web App
- `bun run --filter '@ez/web' dev` - Desenvolvimento
- `bun run --filter '@ez/web' build` - Build de produção
- `bun run --filter '@ez/web' start` - Inicia servidor de produção

### Studio
- `bun run --filter '@ez/studio' dev` - Desenvolvimento
- `bun run --filter '@ez/studio' build` - Build
- `bun run --filter '@ez/studio' deploy` - Deploy do studio

## 🌍 Internacionalização

O projeto suporta três idiomas:
- **pt** - Português (padrão)
- **en** - Inglês
- **es** - Espanhol

As traduções estão em `apps/web/messages/` e são gerenciadas pelo `next-intl`.

## 🎨 Sistema de Design

O projeto utiliza:
- **Tailwind CSS** para estilização
- **Radix UI** para componentes base acessíveis
- **Motion** para animações
- **CSS Variables** para temas

## 🤝 Contribuindo

1. Siga os padrões de código documentados
2. Execute o linter antes de commitar
3. Mantenha os testes atualizados
4. Documente mudanças significativas

## 📄 Licença

Este projeto é privado e proprietário.
