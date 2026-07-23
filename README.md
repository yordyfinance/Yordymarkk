# KDM Color — Site (Next.js 15)

Projeto completo do site da KDM Color Tintas Spray: Hero, Navbar, Produtos,
Aplicações, Página de Produto, Catálogo/Categorias, Localizador de
Revendedores, Central de Downloads e a KDM Experience (tour 3D da fábrica).

## Deploy na Vercel

**Opção 1 — via GitHub (recomendado)**
1. Suba esta pasta para um repositório novo no GitHub.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. A Vercel detecta Next.js automaticamente — não precisa mudar nada no
   build command (`next build`) nem no output.
4. Em **Environment Variables**, adicione as variáveis listadas em
   `.env.example` (veja seção abaixo).
5. Deploy.

**Opção 2 — via CLI**
```bash
npm install -g vercel
cd kdm-color-site
vercel
```

**Rodando localmente antes de subir:**
```bash
npm install
cp .env.example .env.local   # preencha as variáveis
npm run dev
```

## Variáveis de ambiente

| Variável | Obrigatória? | Para quê |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recomendada | URLs canônicas, Open Graph, schema.org |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Só para o mapa | Localizador de revendedores (`/revendedores`) |
| `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID` | Só para o mapa | Necessário para os marcadores customizados (`AdvancedMarker`) |

**Sem as duas variáveis do Google Maps**, o site inteiro funciona
normalmente — só o mapa em `/revendedores` mostra um aviso de "mapa não
configurado" no lugar, em vez de quebrar a página.

## Estrutura

```
/app
  layout.tsx              — fontes, Navbar, Footer, metadata base
  page.tsx                — homepage (Hero + Produtos + Aplicações + Experience)
  /produtos
    page.tsx                          — catálogo completo
    /categoria/[categoria]/page.tsx   — categoria específica
    /[slug]/page.tsx                  — página de produto individual
  /revendedores
    page.tsx                          — localizador
    /[cidade]/[loja]/page.tsx         — página de revendedor individual
  /downloads
    page.tsx                          — central de downloads
    /[categoria]/[documento]/page.tsx — página de documento individual

/components
  Hero/            Navbar/           Products/         Applications/
  Experience/       ProductPage/      CatalogPage/      DealerLocator/
  DownloadsCenter/  Footer/

/lib
  products/    categories/    dealers/    downloads/
  (cada pasta expõe apenas funções — nenhum componente importa os arrays de dados diretamente, então trocar por um banco de dados/CMS real é só reescrever o corpo dessas funções)

/docs/ALL_SETUP_NOTES.md
  — notas técnicas detalhadas de cada seção, uma por prompt/etapa do
    desenvolvimento (decisões de arquitetura, o que trocar quando os dados
    virarem um banco de verdade, etc.)
```

## O que falta pra ficar 100% pronto pra produção

Este projeto foi construído prompt a prompt ao longo de uma conversa, cada
seção validada isoladamente. Antes de ir para produção de verdade:

1. **Imagens e PDFs reais** — todos os componentes referenciam caminhos como
   `/products/<slug>/foto-1.jpg` ou `/docs/<slug>-ficha-tecnica.pdf`. As
   pastas já existem em `/public` (com um `.gitkeep` cada) exatamente nos
   caminhos esperados — é só substituir pelos arquivos reais. Sem eles, as
   imagens aparecem quebradas (não trava o build, só fica sem foto).
2. **Google Maps** — configure as duas variáveis de ambiente (veja acima)
   para o localizador de revendedores funcionar de verdade. Não foi possível
   testar essa integração neste ambiente (sem acesso à internet), então vale
   rodar localmente com uma chave real antes do deploy final.
3. **Dados mockados** — produtos, revendedores, documentos e categorias
   estão em `/lib/*/*.ts` como arrays hardcoded. Todos os componentes já
   consomem esses dados via funções (`getAllProducts()`, `getDealerBySlug()`
   etc.), nunca os arrays diretamente — então a troca por Prisma/Supabase/uma
   API/um CMS é isolada nesses arquivos.
4. **Seção "Por Dentro da KDM"** (linha do tempo, contadores, depoimentos)
   ainda não foi portada para componentes React — ela existe só no protótipo
   em HTML (`kdm-site-completo.html`, enviado à parte). Se quiser ela também
   no site Next.js, é só pedir — sai no mesmo padrão das outras seções.
5. **Formulários** (contato, cadastro de revendedor, orçamento) ainda
   apontam para rotas (`/contato`, `/orcamento`, `/revendedores/cadastro`)
   que não têm página própria neste projeto — crie-as ou redirecione para
   onde já existir esse fluxo.
6. **Área Exclusiva de revendedores** — está visualmente presente e
   desabilitada de propósito (sem sistema de login ainda). O caminho para
   ativar está documentado em `docs/ALL_SETUP_NOTES.md`, seção
   "DownloadsCenter".

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer
Motion · GSAP · Three.js + React Three Fiber · @vis.gl/react-google-maps
