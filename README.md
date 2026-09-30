# Design System — Tabs & Badge Component Library

An accessible, flexible, and responsive compound **Tabs** component and **Badge** component built with React, TypeScript, CSS Modules, and WCAG 2.1 AA standards.

---

## 🚀 Features

- **Compound Component Pattern**: Expressive declarative syntax (`<Tabs>`, `<Tabs.List>`, `<Tabs.Tab>`, `<Tabs.Panel>`).
- **Variants**: Support for `pill` and `underline` visual variants.
- **Badge Integration**: Supports `neutral`, `positive`, and `negative` semantic variants with dynamic string/number labels.
- **Controlled & Uncontrolled**: Flexible state management (`defaultValue` vs. `value` + `onValueChange`).
- **Zero Class Collisions**: Scoped styles using **CSS Modules** (`*.module.css`).
- **Fully Accessible (WCAG 2.1 AA)**: Complete ARIA role wiring and roving `tabIndex` keyboard navigation.
- **Responsive Layouts**: Touch-friendly horizontal scrolling on mobile viewports (`<= 768px`).

---

## 🛠️ Design System Tokens

Tokens are defined in `src/styles/tokens.css` using CSS Custom Properties, mapping directly to Figma design specifications:

- **Spacing Scale**: `4xs` (2px), `3xs` (4px), `2xs` (8px), `xs` (12px), `s` (16px), `m` (20px), `l` (24px), `xl` (32px), `2xl` (48px).
- **Typography**: Inter / System UI, size scale (`14px` medium, `12px` small).
- **Colors**: High-contrast text, pill backgrounds, focus outlines, and semantic badge palettes (`positive`, `negative`, `neutral`).

---

## ♿ Accessibility (WCAG 2.1 AA Compliance)

- **Keyboard Navigation**:
  - <kbd>ArrowRight</kbd> / <kbd>ArrowLeft</kbd>: Navigates focus sequentially through non-disabled tabs.
  - <kbd>Home</kbd> / <kbd>End</kbd>: Jumps focus directly to the first or last active tab.
  - Skips `disabled` tabs automatically during keyboard navigation.
- **ARIA Attributes**:
  - `role="tablist"`, `role="tab"`, and `role="tabpanel"`.
  - Dynamic `aria-selected` and `aria-controls` bindings.
  - Required `aria-label` on `Tabs.List` for screen reader clarity.
- **Focus Management**: Focus-visible indicators with high-contrast outlines for keyboard users.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Badge/
│   │   ├── Badge.tsx
│   │   ├── Badge.module.css
│   │   ├── Badge.stories.tsx
│   │   └── Badge.test.tsx
│   └── Tabs/
│       ├── Tabs.tsx
│       ├── Tabs.module.css
│       ├── Tabs.stories.tsx
│       └── Tabs.test.tsx
├── styles/
│   └── tokens.css
├── setupTests.ts
├── index.ts              # Public API Barrel Export
└── App.tsx               # Interactive Demo Playground
```

---

## 💻 Getting Started

### Installation
```bash
npm install
```

### Development Server
Run the local playground app:

```bash
npm run dev
```

### Storybook Component Playground
Launch Storybook interactive documentation:

```bash
npm run storybook
```

### Run Unit & Accessibility Tests
Execute test suite via Vitest:

```bash
npm run test
```

