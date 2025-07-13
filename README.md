# Inform Ag Boilerplate – Nx Monorepo

Welcome to the Inform Ag Boilerplate Nx workspace! This monorepo manages a Next.js app, shared libraries, and end-to-end tests with a modern, scalable setup.

---

## 🗂️ Project Structure

```
apps/
  pump-master/         # Main Next.js 15 app
  pump-master-e2e/     # Playwright E2E tests for pump-master
libs/
  procedures/          # Shared business logic/services (TRPC, validation, etc.)
  server/              # TRPC routers, server context, API composition
  ui/                  # Shared React UI components (Bootstrap)
  utils/               # Shared utility functions (e.g., JWT parsing)
```

---

## 🚀 Quick Start

### 1. Install dependencies

```sh
npm install
```

### 2. Run the development server

```sh
npm run dev
```

### 3. Build for production

```sh
npm run build
```

### 4. Run Storybook for UI library

```sh
npm run storybook
```

### 5. Run unit tests

```sh
npm run test
```

### 6. Run end-to-end (E2E) tests

```sh
npm run e2e
```

---

## 🛠️ Main Technologies

- **Nx**: Monorepo management, task running, code generation
- **Next.js 15**: App directory, SSR/SSG
- **React 19**: UI library
- **Typescript**: Type-safe coding
- **TRPC**: Type-safe API
- **Redux Toolkit**: State management
- **Bootstrap 5**: UI styling
- **Zod**: Schema validation
- **Vite**: Library builds
- **Vitest**: Unit testing
- **Playwright**: E2E testing
- **Storybook**: UI component development/testing

---

## 📦 Projects & Their Roles

| Project              | Type | Description                                      | Main Deps              |
| -------------------- | ---- | ------------------------------------------------ | ---------------------- |
| apps/pump-master     | app  | Next.js 15 app, main frontend                    | server, ui, procedures |
| apps/pump-master-e2e | e2e  | Playwright E2E tests for pump-master             | pump-master            |
| libs/procedures      | lib  | Shared business logic, validation, TRPC services | -                      |
| libs/server          | lib  | TRPC routers, server context, API composition    | procedures             |
| libs/ui              | lib  | Shared React UI components, Bootstrap styling    | -                      |
| libs/utils           | lib  | Shared utility functions (e.g., JWT parsing)     | -                      |

---

## 🏗️ Nx Workspace Tips

- Use `npx nx graph` to visualize project dependencies.
- Use `npx nx show project <project>` to see available targets.
- Scaffold new apps/libs with Nx generators:
  ```sh
  npx nx g @nx/next:app my-app
  npx nx g @nx/react:lib my-lib
  ```
- Install the Nx Console extension for VSCode/IntelliJ for a better developer experience.

---

## 📚 References

- [Nx Documentation](https://nx.dev)
- [Next.js Documentation](https://nextjs.org)
- [TRPC Documentation](https://trpc.io)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Playwright](https://playwright.dev/)
- [Vitest](https://vitest.dev/)
- [Storybook](https://storybook.js.org/)
