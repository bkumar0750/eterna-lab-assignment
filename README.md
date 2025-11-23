# Axiom Trade – Pulse Frontend Assignment  

# Bhuneshwar Netam  
# 21MI31026 
# IIT Kharagpur 

Real-time token discovery interface built with React, TypeScript, Vite, and Tailwind CSS.

---

## Tech Stack

- **React 18**  
- **TypeScript (strict mode)**  
- **Vite**  
- **Tailwind CSS**  
- **shadcn/ui** component primitives  
- **Custom hooks + modular components**

---

## Project Setup

Install dependencies:

```sh
npm install
Run development server:

sh
Copy code
npm run dev
Build for production:

sh
Copy code
npm run build
Preview production build:

sh
Copy code
npm run preview

 Folder Structure
pgsql
Copy code
public/
  └── axiom.svg

src/
  ├── components/
  │     ├── Header.tsx
  │     ├── SubHeader.tsx
  │     ├── TokenTable.tsx
  │     ├── TokenRow.tsx
  │     ├── TokenCard.tsx
  │     ├── TokenGrid.tsx
  │     ├── TokenDetailModal.tsx
  │     ├── TokenSkeleton.tsx
  │     ├── PriceCell.tsx
  │     ├── ErrorBoundary.tsx
  │     └── ui/ (shadcn)
  │
  ├── hooks/
  │     ├── useRealtimePrice.ts
  │     ├── use-mobile.tsx
  │     └── use-toast.ts
  │
  ├── lib/
  │     ├── mockData.ts
  │     └── utils.ts
  │
  ├── pages/
  │     ├── Index.tsx
  │     └── NotFound.tsx
  │
  ├── App.tsx
  ├── main.tsx
  ├── index.css
  ├── vite-env.d.ts
  └── types/
 Development Notes
Components are written with reusability in mind (atomic structure).

Visuals are built using Tailwind utility classes.

UI primitives come from shadcn/ui.

Realtime price updates are handled via a custom hook using a mock WebSocket.

Smooth color transitions are used to highlight price movement.

Error boundaries and skeleton loaders ensure graceful loading states.

📱 Responsive Design
The layout is tested down to 320px and scales cleanly across breakpoints.
