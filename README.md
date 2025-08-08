# convex-starter

A highly opinionated Next.js starter with better-auth, convex, shadcn/ui, react-email, and turborepo. Pre-configured for rapid, scalable development.

## Project Structure

```
convex-starter/
├── apps/
│   └── web/                 # Main Next.js application
├── packages/
│   ├── backend/            # Convex backend
│   ├── eslint-config/      # Shared ESLint configurations
│   ├── typescript-config/  # Shared TypeScript configurations
│   └── ui/                 # Shared UI components (shadcn/ui)
└── turbo/                  # Turborepo configuration
```

## Features

- **[Convex](https://convex.dev)** - Backend-as-a-service with real-time data synchronization, serverless functions, and built-in database
- **Authentication** with [Better Auth](https://www.better-auth.com) integrated with Convex
- **React Email** with [Resend](https://www.resend.com) integrated with Convex
- **UI components** built with [shadcn/ui](https://ui.shadcn.com) and [Tailwind CSS](https://tailwindcss.com)
- **Form handling** via [react-hook-form](https://react-hook-form.com) with Zod validation
- **Monorepo setup** using [Turborepo](https://turbo.build/repo) for efficient development
- **TypeScript** throughout with shared configurations

## Getting Started

### 1. Create a New Project

```bash
npx create-next-app@latest [project-name] --use-pnpm --example https://github.com/jordanliu/convex-starter
cd [project-name]
```

### 2. Install Dependencies

```bash
pnpm install

```

### 3. Configure Convex

```bash
pnpm --filter @repo/backend run setup
```

This initializes your Convex project. Next, ensure your backend environment variables are uploaded to the Convex dashboard. From the `packages/backend` directory, run:

```bash
cd packages/backend
npx convex env set --env-file .env
```

This will upload the variables in your `.env` to Convex so they are available to your Convex functions.

### 4. Configure Client

```bash
cp apps/web/.env.example apps/web/.env
```

### 5. Start the Development Server

```bash
pnpm dev
```

This will start both the Next.js application at [http://localhost:3000](http://localhost:3000) and the Convex development server at [http://127.0.0.1:6790](http://127.0.0.1:6790).

## Available Commands

### Development

- `pnpm dev` - Start development server for all packages
- `pnpm build` - Build all packages and applications for production
- `pnpm start` - Start production server (run build first)

### Code Quality

- `pnpm lint` - Run ESLint across all packages
- `pnpm format` - Format code with Prettier
- `pnpm check-types` - Run TypeScript type checking

### Convex Operations

- `pnpm --filter @repo/backend setup` - Initialize Convex project (run once)
- `pnpm --filter @repo/backend dev` - Start Convex development server

### Package-Specific Development

- `pnpm --filter web dev` - Run only the web application

## Project Management

### Add a new package

```bash
turbo gen
```

### Add a new shadcn/ui component

```bash
cd apps/web && pnpm dlx shadcn@canary add [COMPONENT]
```

### Add dependencies

```bash
# Install to specific package
pnpm --filter web add [package-name]
pnpm --filter @repo/ui add [package-name]

# Install to workspace root
pnpm add -w [package-name]
```

## Deployment

### Build for Production

```bash
pnpm build
```

Deploy your Convex backend:

```bash
pnpm --filter @repo/backend run deploy
```
