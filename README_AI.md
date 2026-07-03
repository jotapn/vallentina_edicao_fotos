# Devzz Project Instructions

All development must follow the Devzz system rules:  
**edit ONLY using morphTool**,  
**code using the same language the user provided**,  
**operate exclusively inside `/template`**,  
and **follow the standards defined in this document**.

---

## Relevant Installed Modules (use these in your implementation)

This project includes a curated set of libraries you should actively use when building features:

### UI & Component Libraries
- **shadcn/ui** (via Radix primitives)  
- Radix components: Accordion, Dialog, Tooltip, Popover, Navigation Menu, Tabs, Select, Dropdown Menu, Alert Dialog, Checkbox, Switch, Scroll Area, Progress, Slider, Toggle, Toggle Group, Hover Card  
- **lucide-react** (icons)  
- **cmdk** (command palette)

### Styling & Utilities
- **tailwindcss** (main styling framework)  
- **clsx** and **tailwind-merge** (class merging)  
- **class-variance-authority (CVA)** (component variants)  
- **tw-animate-css** (animation presets)

### Animations
- **motion** (Framer Motion-compatible animation engine) — use for all interactive animations

### Forms, Validation & Inputs
- **react-hook-form**  
- **@hookform/resolvers**  
- **zod**  
- **input-otp** (OTP components)

### Theming & Layout
- **next-themes** (dark/light mode)  
- **vaul** (drawer/overlay components)  
- **embla-carousel-react** (carousels)  
- **react-resizable-panels** (split layouts)

### Date & Time
- **date-fns**  
- **react-day-picker**

### Charts
- **recharts**

### Notifications
- **sonner**

---

## Components & UI Rules

- Prefer **shadcn/ui** components in `components/ui/`.  
- Create your own reusable components in `components/`.  
- Place feature-specific UI inside `app/[feature]/components/`.  
- Use `"use client"` for components requiring hooks, animations, or browser APIs.  
- Use **Framer Motion (motion)** for all animations.  
- Keep components small, pure, typed, and composable.

---

## Next.js Patterns

- Use **App Router** correctly: each route lives in its own folder.  
- Default to **server components**; switch to client components only when required.  
- Data fetching:
  - `cache: "force-cache"` for static  
  - `cache: "no-store"` for dynamic  
  - `revalidate:` for ISR  
- Organize logic in `lib/`, `hooks/`, `components/`, and feature-level folders.  
- Follow Next.js conventions for layouts and nested routes.

---

## SEO Requirements

Always update the global SEO configuration in **`app/layout.tsx`**:  
`metadata.title`, `description`, `openGraph`, `twitter`, `robots`, icons.  
Use `generateMetadata()` for dynamic routes.

---

## Animation Standards (Framer Motion)

- Use `motion.div`, `motion.button`, etc.  
- Default transitions:
  ```ts
  transition={{ duration: 0.25, ease: "easeOut" }}
````

* Page transitions → fade + slide
* Modals → scale + fade
* Elements that move → layout animations
* Store reusable variants in `lib/animations.ts`.

---

## Coding Guidelines

* Strict TypeScript. Avoid `any`.
* Pure, predictable components.
* Use async/await.
* Keep UI, logic, and data separated.
* Use zod for schema validation.
* Keep files small and cohesive.

---

## Workflow Requirements

1. Build UI first with placeholder data.
2. Validate rendering.
3. Implement logic/backend.
4. Connect UI → logic.
5. Add animations + polish.
6. Update SEO if needed.
7. Commit after every finished task.
8. Edit all files with **morphTool** only.

---

## Final Directive

**All project work must follow Devzz system rules AND the standards defined here.**

