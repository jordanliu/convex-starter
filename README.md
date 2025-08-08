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

- Authentication with [Better Auth](https://better-auth.com)
- Backend platform (db, functions, storage, jobs) using [Convex](https://www.convex.dev/)
- UI components built with [shadcn/ui](https://ui.shadcn.com) and [Tailwind CSS](https://tailwindcss.com)
- Email support with [react-email](https://react.email) and [Resend](https://resend.com)
- Form handling via [react-hook-form](https://react-hook-form.com)
- Monorepo setup using [Turborepo](https://turbo.build/repo)

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
cp packages/backend/.env.example packages/backend/.env
npx convex env set --env-file .env
```

This will upload the variables in your `.env` to Convex so they are available to your Convex functions.

### 4. Configure Client

```bash
cp apps/web/.env.example apps/web/.env.local
```

### 5. Start the Development Server

```bash
pnpm dev
```

This will start both the Next.js application at [http://localhost:3000](http://localhost:3000) and the Convex development server at [http://127.0.0.1:6790](http://127.0.0.1:6790).

## Available Commands

### Development

```bash
pnpm dev          # Start development servers for all packages
pnpm build        # Build all packages for production
pnpm start        # Start production server (requires build)
```

### Code Quality

```bash
pnpm lint         # Run ESLint across all packages
pnpm format       # Format code with Prettier
pnpm check-types  # Run TypeScript type checking
```

### Convex-Specific

```bash
pnpm --filter @repo/backend setup   # Initialize Convex project (run once)
pnpm --filter @repo/backend dev     # Start Convex development server only
pnpm --filter @repo/backend deploy  # Deploy Convex backend to production
```

### Package-Specific

```bash
pnpm --filter web dev         # Run only the Next.js application
```

## Project Management

### Adding New Packages

```bash
turbo gen
```

Follow the prompts to scaffold a new package with proper TypeScript and build configurations.

### Adding shadcn/ui Components

```bash
cd apps/web
pnpm dlx shadcn@canary add [component-name]
```

Components are automatically added to the UI package and can be imported across the monorepo.

### Managing Dependencies

```bash
# Add to specific package
pnpm --filter web add [package-name]
pnpm --filter @repo/ui add [package-name]
pnpm --filter @repo/backend add [package-name]

# Add to workspace root (affects all packages)
pnpm add -w [package-name]

# Add dev dependencies
pnpm --filter web add -D [package-name]
```

## Deployment

### 1. Deploy Convex Backend

```bash
pnpm --filter @repo/backend run deploy
```

This creates your production Convex deployment and provides you with a production URL.

### 2. Configure Production Environment

Update your hosting platform (Vercel, Netlify, etc.) with the production Convex URL:

```env
CONVEX_URL=https://your-production-deployment.convex.cloud
NEXT_PUBLIC_CONVEX_URL=https://your-production-deployment.convex.cloud
```

### 3. Build and Deploy Frontend

```bash
pnpm build
```

Then deploy the built application using your preferred hosting platform's deployment method.
