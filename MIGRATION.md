# MIGRATION.md — Diagnóstico de Migração — Site Lóvitta Laboratório

> Levantamento feito em 28/10/2026. Nenhum arquivo, código ou banco foi alterado.

---

## 1. Tipo de projeto e stack

- **Tipo:** Landing page institucional (one-page) de um laboratório de análises clínicas. **Não é um sistema com banco** — todo o conteúdo é estático no código.
- **Framework:** TanStack Start v1 (React 19 + TanStack Router + Vite 7), com SSR/build para Cloudflare Workers (plugin `@cloudflare/vite-plugin`, config em `wrangler.jsonc`).
- **Estilo:** Tailwind CSS v4 (via `src/styles.css`), shadcn/ui (Radix UI).
- **Node:** v22.23.4 (recomendado Node 20+ ou 22).
- **Gerenciador de pacotes:** Bun 1.4.4 (lockfile `bun.lock` presente; também funciona com npm/pnpm).
- **TypeScript:** ^5.8.3. Não há testes automatizados no projeto.

## 2. Comandos

```bash
# Instalar dependências
bun install          # ou: npm install

# Rodar em desenvolvimento
bun run dev          # ou: npm run dev

# Build de produção
bun run build        # ou: npm run build

# Lint / formatação
bun run lint
bun run format
```

O output do build é compatível com Cloudflare Workers (entrada `src/server.ts`, declarada em `wrangler.jsonc` e no `vite.config.ts`). Para hospedar em Node/VPS, é preciso adaptar o entrypoint (TanStack Start oferece preset Nitro para Node) — o `vite.config.ts` atual usa `@lovable.dev/vite-tanstack-config`, que é o pacote de build da Lovable (ver seção 11).

## 3. Banco de dados

**Sem banco.** O projeto não usa Lovable Cloud nem Supabase. Não há tabelas, migrações ou `src/integrations/supabase`.

## 4. Autenticação

**Nenhuma.** O site é público, sem login, sem `auth.users` (0 usuários). Não há sistema próprio de autenticação.

## 5. Storage

**Nenhum bucket.** As imagens do site são assets locais empacotados no build (`src/assets/`: logo, hero, fotos da equipe/faculdade/recepção). Não há upload nem arquivos em storage externo.

## 6. Edge Functions / Server Routes

**Nenhuma.** Não existe `createServerFn`, nem rotas em `src/routes/api/`, nem Edge Functions do Supabase. A única rota dinâmica é `src/routes/sitemap[.]xml.tsx`, que gera o `/sitemap.xml` em runtime (arquivo de código, não função externa).

## 7. Secrets

- **Nenhum secret usado pelo código do projeto.** Não há variáveis de ambiente lidas em `src/` (nenhum `process.env` nem `import.meta.env.VITE_*`).
- O sandbox da Lovable injeta variáveis internas da própria plataforma (ex.: `LOVABLE_API_KEY`, `LOVABLE_ASSETS_*`, `__LOVABLE_PROJECT_ID`), mas **nenhuma delas é referenciada pelo código** e nenhuma precisa ser migrada.

## 8. Integrações externas

| Integração | Onde | Observação |
|---|---|---|
| **WhatsApp (principal canal de leads)** | `src/routes/index.tsx` | Links `wa.me/5514998937080` com mensagem pré-preenchida. Não usa API oficial — só deep links. |
| **Google Tag Manager** | `src/routes/__root.tsx` | Container `GTM-PRWK3GZ2` + `src/lib/tracking.ts` (eventos `clique_whatsapp`, `telefone_clique`, `formulario_enviado`). O GTM por sua vez alimenta o GA4 e o Google Ads. |
| **Google Maps** | `src/routes/index.tsx` | Iframe de mapa (embed público) com endereço em Duartina/SP. |
| **Google Fonts** | `src/routes/__root.tsx` | Cormorant Garamond + Inter via CDN. |
| **Instagram** | `src/routes/index.tsx` | Link externo para `@lovittalaboratorio`. |
| **E-mail** | `src/routes/index.tsx` | Apenas link `mailto:lovittalab@hotmail.com` — não há envio de e-mail pelo backend. |
| **IA / Lovable AI Gateway** | — | **Não usa.** Nenhuma chamada de IA no projeto. |
| **Pagamento** | — | Não usa. |

## 9. Variáveis de ambiente

**Nenhuma.** O código não lê `VITE_*` nem outras variáveis de ambiente. Não há arquivo `.env` no projeto.

## 10. Tipo de backend

- **Nenhum backend.** Nem Lovable Cloud, nem Supabase conectado pelo usuário. É 100% front-end com SSR.
- **ID do projeto Lovable:** `992925cf-2582-4a0e-a46a-4c1a21083d6e`
- **URL atual:** `https://www.lovittalab.com.br` (domínio próprio; preview: `lovitta-lab-site-builder.lovable.app`)

## 11. Dependências da plataforma Lovable (o que quebra fora dela)

1. **`@lovable.dev/vite-tanstack-config`** (`vite.config.ts`) — pacote de build da Lovable que agrega os plugins (tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare etc.). Fora da Lovable é melhor substituí-lo por um `vite.config.ts` padrão do TanStack Start com os plugins equivalentes. **Este é o único ponto crítico de build.**
2. **Imagem de Open Graph hospedada na Lovable** — `OG_IMAGE` em `src/routes/index.tsx` e `src/routes/__root.tsx` aponta para `https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/...lovable.app-....png` (bucket R2 gerenciado pela Lovable). Se o projeto sair da plataforma, essa imagem pode deixar de existir. **Recomendação: baixar a imagem e servir como asset local do projeto, atualizando as duas referências.**
3. **Deploy/preview gerenciado** — o hospedagem atual (Cloudflare via Lovable, domínio `lovittalab.com.br`) é provisionada pela plataforma; a migração exige configurar hosting próprio (Cloudflare Pages/Workers direto, Vercel, VPS etc.).
4. **`node_modules` é symlink para storage persistente** do sandbox (`/persist/node_modules`) — ao exportar o projeto, rodar `bun install` no destino recria as dependências; nunca copiar esse symlink.
5. Todo o restante (código, assets em `src/assets`, `public/`, `wrangler.jsonc`, `bun.lock`) é portável sem alteração.

---

## Valores (variáveis de ambiente visíveis)

- Nenhuma variável de ambiente é usada pelo projeto — **valor não acessível / não aplicável**. Não há segredos no código (o GTM Container ID `GTM-PRWK3GZ2` é identificador público, não segredo).
