# Plano de Implementação

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui (componentes base)
- motion (Framer Motion para animações)
- Lucide React (ícones)

## Decisões Técnicas
- **"use client"** no page.tsx: necessário para animações com motion, scroll tracking e estado do menu mobile
- **Slider de comparação**: componente customizado com mouse/touch events e teclado acessível
- **Imagens**: tags `<img>` padrão com dimensões explícitas (conforme regras do projeto)
- **Animações**: `FadeInSection` wrapper reutilizável com `useInView` para revelação suave ao scroll
- **Header**: `position: fixed` com backdrop-blur ao scroll, menu mobile com AnimatePresence
- **Hero**: parallax sutil com `useScroll` + `useTransform`

## Estrutura de Componentes
- `app/page.tsx` → Página principal (todas as seções inline como componentes)
- `components/comparison-slider.tsx` → Slider interativo Antes/Depois
