# Instituto EZ

Site institucional imersivo (3D) do Instituto EZ, com catálogo de ebooks, venda via **Stripe** e/ou **Hotmart** e um **painel administrativo** com login, tudo sobre **Firebase**.

## Visão geral

- **Site público** (`/`): páginas institucionais com cena WebGL própria (partículas neurais que mudam de forma por página) e componentes 3D em CSS/Motion. Os textos institucionais ficam fixos em `apps/web/src/content/`.
- **Catálogo de ebooks** (`/ebooks`, `/ebooks/[slug]`): dados vindos do Firestore, com revalidação automática quando o painel salva algo.
- **Painel admin** (`/admin`): login com e-mail e senha (Firebase Auth), cadastro de ebooks (capa, páginas de amostra e PDF), depoimentos, configuração de pagamentos e **Site e contato** (nome, slogan, logo, ícone do site e dados de contato).
- **Pagamentos**:
  - **Stripe** — checkout no próprio site; após o pagamento o cliente baixa o PDF por um link temporário (a entrega verifica o pagamento na Stripe antes de liberar o arquivo privado).
  - **Hotmart** — o botão leva ao link de checkout do produto; a Hotmart cuida do pagamento e da entrega.
  - Sem pagamento online, o botão abre o formulário de contato.

## Stack

| Área | Tecnologia |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Estilo e animação | Tailwind CSS 4, Motion, WebGL (sem bibliotecas 3D) |
| Dados e auth | Firebase (Auth e Firestore — funciona no plano gratuito Spark) + Firebase Admin no servidor |
| Arquivos | Firebase Storage (imagens e PDFs), servido pelo próprio site em `/files/…` |
| Pagamentos | Stripe Checkout, links de checkout Hotmart |
| Formulários | react-hook-form + zod |
| E-mail | Resend + React Email |
| i18n | next-intl (rotas `/pt`, `/en`, `/es`) |
| Ferramentas | Bun (pacotes e scripts), Turborepo, Biome, Vitest |

## Estrutura

```
apps/web/
├── public/assets/          # Imagens do site e do ebook inicial
├── scripts/                # CLI: criar admin, seed do Firestore
└── src/
    ├── app/
    │   ├── [locale]/…      # Site público
    │   ├── admin/…         # Painel (login, ebooks, depoimentos, pagamentos)
    │   └── api/…           # checkout, download, revalidate, status
    ├── components/
    │   ├── experience/     # Cena 3D, header/footer e primitivas 3D
    │   ├── pages/          # Páginas do site
    │   └── admin/          # UI do painel
    ├── content/            # Textos fixos + dados iniciais (seed)
    ├── lib/                # Firebase (client/admin), Stripe, painel
    ├── server/             # Leitura do catálogo, compras, auth do admin
    └── types/catalog.ts    # Schemas (zod) de ebook, depoimento e pagamento
firebase/                   # Regras do Firestore
firebase.json               # Configuração dos emuladores e deploy de regras
```

## Rodando localmente

Pré-requisitos: **Bun 1.3+**, **Node 22** e **Java 17+** (para os emuladores do Firebase).

```bash
bun install
cp apps/web/.env.example apps/web/.env.local
```

### Opção A — sem Firebase

Com as variáveis do Firebase vazias, o site usa os dados de seed locais (`src/content`). O painel mostra um aviso de configuração.

```bash
bun run dev:web
```

### Opção B — com os emuladores do Firebase (recomendado)

1. No `apps/web/.env.local`, descomente o bloco **Emuladores locais**.
2. Em um terminal, suba os emuladores (a interface fica em http://127.0.0.1:4000):
   ```bash
   bun run firebase:emulators
   ```
3. Em outro terminal, importe os dados iniciais e crie um administrador:
   ```bash
   bun run firebase:seed
   bun run admin:create voce@exemplo.com "uma-senha-forte"
   ```
4. Rode o site e acesse http://localhost:3000/admin:
   ```bash
   bun run dev:web
   ```

> Os emuladores não persistem dados entre execuções: rode o seed e o `admin:create` sempre que subi-los. O bloco de emuladores do `.env.local` já inclui o Storage (porta 9199).

## Configurando o Firebase (produção)

1. Crie um projeto em https://console.firebase.google.com.
2. **Authentication** → Método de login → ative **E-mail/senha**.
3. **Firestore Database**: crie o banco (modo produção, região `southamerica-east1`). Ative também o **Storage** (mesma região). O plano Blaze é exigido pelo Google para novos buckets.
4. **Configurações do projeto → Seus apps**: registre um app da Web e copie os valores para as variáveis `NEXT_PUBLIC_FIREBASE_*`.
   Preencha `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` com o nome do bucket (ex.: `instituto-ez.firebasestorage.app`).
5. **Configurações do projeto → Contas de serviço → Gerar nova chave privada**: use o JSON para preencher `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL` e `FIREBASE_PRIVATE_KEY`.
6. Publique as regras do Firestore e do Storage (o `.firebaserc` já aponta para o projeto `instituto-ez`; os emuladores usam o alias `demo`):
   ```bash
   bun run firebase:deploy-rules
   ```
7. Com o `.env.local` apontando para o projeto real, importe o conteúdo inicial e crie o admin:
   ```bash
   bun run firebase:seed
   bun run admin:create voce@institutoez.com.br "uma-senha-forte"
   ```

**Segurança:** apenas usuários com a custom claim `admin` (definida pelo `admin:create`) leem ou escrevem no Firestore pelo navegador. O site público lê o catálogo pelo servidor (Firebase Admin). O PDF fica em uma pasta privada do Storage e é liberado pela rota `/api/download` (link temporário) após pagamento confirmado na Stripe.

## Arquivos (Firebase Storage)

Com o Storage configurado, o painel envia imagens e PDFs direto do navegador para o bucket; as regras (`firebase/storage.rules`) só aceitam administradores, com tipo e tamanho corretos (imagens até 15 MB, PDFs até 100 MB). Sem o Storage, o painel continua aceitando **links** de imagem (`/assets/…` ou `https://…`).

O bucket é privado (nenhum arquivo é lido direto do Google pelo público) e não precisa de CORS:

| Caminho no bucket | Conteúdo | Como é entregue |
| --- | --- | --- |
| `public/ebooks/<id>/…` | Capas e páginas de amostra | `/files/ebooks/<id>/…` com cache permanente |
| `public/site/…` | Logo e ícone | `/files/site/…` com cache permanente |
| `private/ebooks/<id>/…` | PDFs vendidos | Link assinado de 5 minutos, só após pagamento na Stripe |

**Migrar imagens antigas:** `bun run storage:migrate` lista as imagens que o banco ainda aponta em `/assets/…` (capa, páginas, foto do autor, logo e ícone); com `--apply`, envia para o Storage e troca as referências por `/files/…`. Pode ser executado de novo sem duplicar nada.

> **Antivírus com inspeção HTTPS (ex.: Norton Web/Mail Shield):** no desenvolvimento local o Node pode recusar a conexão com o Firebase e com o Google Fonts (`unable to verify the first certificate`). Exporte a raiz do antivírus em PEM e rode o servidor com `NODE_EXTRA_CA_CERTS=caminho/do/certificado.pem`. Em produção (Vercel) isso não ocorre.

## Pagamentos

Ative ou desative cada forma de pagamento em **Admin → Pagamentos**. A escolha por ebook fica na aba **Venda** do ebook.

- **Stripe**: defina `STRIPE_SECRET_KEY` (use `sk_test_…` para testar) e envie o PDF na aba Venda (ou informe um link externo, como Google Drive). O preço usado no checkout vem sempre do servidor. A chave nunca é salva no banco nem exibida no painel.
- **Hotmart**: cadastre o produto na Hotmart e cole o link de checkout (`https://pay.hotmart.com/…`) na aba Venda.

## Deploy (Vercel)

Cadastre em **Settings → Environment Variables** as variáveis de `apps/web/.env.example` (sem o bloco de emuladores) e faça o deploy. As páginas são estáticas com revalidação a cada 5 minutos e também sob demanda, sempre que algo é salvo no painel.

## Scripts

| Comando | Descrição |
| --- | --- |
| `bun run dev:web` | Servidor de desenvolvimento |
| `bun run build` | Build de produção |
| `bun run test` | Testes (Vitest) |
| `bun run lint` / `bun run lint:fix` | Biome (verificar / corrigir) |
| `bun run firebase:emulators` | Emuladores locais (Auth, Firestore e Storage) |
| `bun run firebase:seed [--force]` | Importa ebook e depoimentos iniciais |
| `bun run admin:create <email> [senha]` | Cria ou promove um administrador |
| `bun run firebase:deploy-rules` | Publica as regras do Firestore e do Storage |
| `bun run storage:migrate [--apply]` | Move imagens de `/assets/…` para o Storage |

## Licença

Projeto privado e proprietário.
