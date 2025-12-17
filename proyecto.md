# Project Specification: Pilla Eyewear Interactive Catalog & POV Simulator

## 1. Goal
Create a high-performance, visually stunning web prototype for a catalog of high-end eyewear (Pilla style). The core feature is a **"First-Person POV Simulator"** that demonstrates how specific lens technologies filter light, enhance contrast, and manipulate colors in real-time over a static background image.

## 2. Tech Stack & Requirements
- **Framework:** Next.js 15 (App Router).
- **Language:** TypeScript (Strict mode).
- **Styling:** Tailwind CSS.
- **Animation:** Framer Motion (for smooth UI transitions and lens swapping effects).
- **State Management:** Zustand (to manage the currently selected lens and scene).
- **Icons:** Lucide React.
- **Architecture:** Modular, Component-based, and Data-driven.

## 3. Core Architecture & Instructions

### A. Data Structure (`data/lenses.ts`)
We need a scalable way to add new lenses. Do not hardcode lenses into components. Create a configuration file that exports an array of `Lens` objects.
Each `Lens` object must contain:
- `id`, `modelName` (e.g., "Outlaw X7"), `lensCode` (e.g., "64CM").
- `description` (marketing copy).
- `transmission` (VLT percentage).
- **`simulationProfile`**: An object containing parameters for CSS/SVG filters to simulate the view:
    - `hexOverlay`: Base color tint.
    - `contrast`: Value (e.g., 1.2).
    - `saturation`: Value (e.g., 1.5).
    - `brightness`: Value.
    - `sepia` or `warmth`: Custom values to mimic specific technologies like "Chromashift".

### B. The POV Simulator Component (`LensSimulator.tsx`)
This is the most important component.
1. **The Scene:** A high-quality background image (placeholder provided) representing a shooting range or outdoor scenery (greenery + sky).
2. **The Filter Layer:**
   - Instead of just a simple opacity overlay, implement an **SVG `<filter>`** approach or advanced CSS `backdrop-filter`.
   - The goal is to mimic how Pilla lenses "pop" orange targets against green backgrounds.
   - Use `framer-motion` to animate the transition between "Naked Eye" and "Lens On", or between different lenses. It should feel like physically putting on glasses (slight zoom or ease-in effect).
3. **The Comparison Slider:** implement a "Split View" (Before/After) slider that the user can drag to see the difference interactively.

### C. The Catalog Interface
- A clean, modern sidebar or bottom drawer to select lenses.
- When a lens is clicked, updates the global state, triggering the POV Simulator to update its filters.
- Display technical specs (Transmission, Lighting Condition) elegantly.

## 4. Design Guidelines (UI/UX)
- **Vibe:** Luxury, Technical, Precision. Dark mode default.
- **Typography:** Sans-serif, clean (Inter or Geist).
- **Responsiveness:** Must work perfectly on Mobile (stack controls below the view).

## 5. Coding Best Practices
- **DRY:** Reusable UI components (Buttons, Cards).
- **Type Safety:** Define interfaces for `Lens`, `Category`, etc., in a `types/index.ts` file.
- **Performance:** Use `next/image`. Ensure animations do not cause layout thrashing.
- **Maintainability:** Isolate the "Lens Logic" (the math that converts lens data into CSS filters) into a custom hook `useLensSimulation()`.

## 6. Deliverable
Generate the project structure and the core files. Start with the `data/lenses.ts` to establish the data schema, then the `useLensSimulation` hook, and finally the `page.tsx` integrating the simulator.