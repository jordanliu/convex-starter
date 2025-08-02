# next-starter

A highly opinionated Next.js starter with authentication, database integration, reusable UI components, email support, and full monorepo tooling. Pre-configured for rapid, scalable development.

## Project Structure

```
nextjs-starter/
├── apps/
│   └── web/                 # Main Next.js application
├── packages/
│   ├── auth/               # Authentication utilities
│   ├── database/           # Database schema and utilities
│   ├── email/              # Email templates and providers
│   ├── eslint-config/      # Shared ESLint configurations
│   ├── typescript-config/  # Shared TypeScript configurations
│   └── ui/                 # Shared UI components
└── turbo/                  # Turborepo configuration
```

## Features

- Authentication with [Better Auth](https://github.com/jordanliu/better-auth)
- Database using [Drizzle ORM](https://orm.drizzle.team/) and [PostgreSQL](https://www.postgresql.org/)
- UI components built with [shadcn/ui](https://ui.shadcn.com) and [Tailwind CSS](https://tailwindcss.com)
- Email support with [react-email](https://react.email)
- Form handling via [react-hook-form](https://react-hook-form.com)
- Monorepo setup using [Turborepo](https://turbo.build/repo)

## Getting Started

### 1. Create a New Project

```bash
npx create-next-app@latest [project-name] --use-pnpm --example https://github.com/jordanliu/next-starter.git
cd [project-name]
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

```bash
cp apps/web/.env.example apps/web/.env
# Edit the .env file with your database and authentication configuration
```

### 4. Set Up the Database

```bash
pnpm --filter @repo/database generate
pnpm --filter @repo/database migrate
```

### 5. Start the Development Server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Commands

### Development

- `pnpm dev` - Start development server for all packages
- `pnpm build` - Build all packages and applications for production
- `pnpm start` - Start production server (run build first)

### Code Quality

- `pnpm lint` - Run ESLint across all packages
- `pnpm format` - Format code with Prettier
- `pnpm check-types` - Run TypeScript type checking

### Database Operations

- `pnpm --filter @repo/database generate` - Generate database migrations
- `pnpm --filter @repo/database migrate` - Apply database migrations
- `pnpm --filter @repo/database studio` - Open Drizzle Studio

### Package-Specific Development

- `pnpm --filter web dev` - Run only the web application
- `pnpm --filter @repo/ui dev` - Develop UI components in isolation

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
