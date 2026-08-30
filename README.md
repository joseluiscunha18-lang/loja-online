# Bliss Beauty & Care

Loja online (Next.js 14 + App Router + TypeScript + Tailwind CSS) de cosméticos,
maquilhagem, acessórios e moda, com entregas na Cidade de Maputo & Matola.

## Estrutura do projeto

```
bliss-beauty/
├── app/
│   ├── layout.tsx        # Layout raiz: fontes, metadata, CartProvider
│   ├── page.tsx           # Página principal: orquestra todo o estado da UI
│   └── globals.css        # Tailwind + estilos globais
├── components/
│   ├── Header.tsx
│   ├── DeliveryBanner.tsx
│   ├── Hero.tsx
│   ├── CategoryFilter.tsx
│   ├── ProductGrid.tsx
│   ├── ProductCard.tsx
│   ├── PriceTag.tsx        # elemento assinatura: etiqueta de preço
│   ├── ProductModal.tsx
│   ├── CartDrawer.tsx
│   ├── SearchOverlay.tsx
│   ├── MobileMenu.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── Toast.tsx
│   └── icons.tsx
├── context/
│   └── cart-context.tsx    # estado global do carrinho (Context + useReducer)
├── lib/
│   ├── types.ts
│   ├── products.ts          # catálogo de produtos (edite aqui para adicionar itens)
│   └── format.ts
├── public/
├── package.json
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

## Como editar o catálogo

Os produtos vivem em `lib/products.ts`. Adicione, remova ou edite itens do
array `products`; cada um segue o tipo `Product` definido em `lib/types.ts`.
As categorias (pílulas de filtro) estão em `categories`, no mesmo ficheiro.

As imagens dos produtos podem ser URLs do Unsplash (já usadas como
placeholders) ou imagens próprias colocadas em `public/` e referenciadas como
`/nome-da-imagem.jpg`. Se usar um novo domínio externo de imagens, adicione-o
em `images.remotePatterns` no `next.config.mjs`.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Publicar no GitHub

```bash
git init
git add .
git commit -m "Bliss Beauty & Care — loja em Next.js"
git branch -M main
git remote add origin <URL_DO_SEU_REPOSITORIO>
git push -u origin main
```

## Publicar na Vercel

1. Acesse https://vercel.com e inicie sessão (pode usar a conta do GitHub).
2. Clique em **Add New… → Project**.
3. Selecione o repositório que acabou de enviar para o GitHub.
4. A Vercel deteta automaticamente que é um projeto Next.js — não precisa de
   alterar nenhuma definição de build.
5. Clique em **Deploy**. Em cerca de um minuto o site estará no ar com um
   URL `algo.vercel.app` (pode depois associar um domínio próprio em
   **Settings → Domains**).

Cada novo `git push` para `main` gera automaticamente um novo deploy.

## Próximos passos sugeridos

- Ligar o botão "Finalizar Compra" a um checkout real (Stripe, PayPal,
  M-Pesa/e-Mola, ou um fluxo manual via WhatsApp).
- Mover o catálogo de `lib/products.ts` para uma base de dados ou CMS
  (Sanity, Contentful, etc.) quando o número de produtos crescer.
- Adicionar páginas de produto próprias (`app/produto/[id]/page.tsx`) para
  partilha e SEO individuais, caso deseje ir além do modal atual.
