# CLAUDE.md - Project Guidelines

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom brutalist design system
- **Content**: MDX with next-mdx-remote
- **Testing**: Vitest + Testing Library + jsdom
- **Linting**: Biome (replaces ESLint + Prettier)
- **Package Manager**: Bun

## Architecture & File Structure

```
app/                    # Next.js 14 App Router
├── blog/[slug]/       # Dynamic blog post pages
├── globals.css        # Global styles and CSS variables
├── layout.tsx         # Root layout with theme provider
└── page.tsx           # Homepage

components/            # Reusable React components
├── icons/            # SVG icon components
├── Button.tsx        # Brutalist button component
├── Card.tsx          # Brutalist card component
├── Navigation.tsx    # Main navigation
├── ThemeProvider.tsx # Dark/light theme context
└── ...

content/blog/         # MDX blog posts
lib/                  # Utility functions and config
├── blog.ts          # Blog content processing
├── personal-config.ts # Site configuration
└── ...

test/                 # Test files organized by type
├── accessibility/    # WCAG compliance tests
├── components/      # Component unit tests
└── integration/     # Integration tests
```

## Code Style Guidelines

### TypeScript

- Use strict TypeScript configuration
- Define types and always use types for all data structures
- Use `type` for unions and object shapes, avoid `interface`
- Prefer named exports over default exports, only use `export default` if it's a framework requirement eg: Pages, Layouts
- Always type component props explicitly

### React/Next.js

- Use React Client components by defaut
- Always add `"use client"` when needed (hooks, event handlers, browser APIs)
- Prefer `forwardRef` for components that need ref forwarding
- Use Next.js built-in components (`Link`, `Image`) over HTML equivalents
- Everything must be statically exportable this is a static site

### Component Architecture

- **Atomic Design**: Build small, reusable components
- **Accessibility First**: All interactive elements must meet WCAG standards
- **Touch Targets**: Minimum 44px touch targets for all interactive elements
- **Focus Management**: Proper focus indicators and keyboard navigation

### Styling with Tailwind

- Use the custom brutalist design system colors: `primary`, `secondary`, `accent`, `orange`
- Apply dark mode support with `dark:` prefixes
- Use custom utility classes: `.touch-target`, `.focus-ring`
- Follow the 4px border and shadow system for brutalist aesthetic

## Design System

### Colors

- **Primary**: `#0066FF` (blue)
- **Secondary**: `#00FF88` (green)
- **Accent**: `#FF0066` (pink)
- **Orange**: `#FF6600` (orange)
- **Neutrals**: Comprehensive gray scale

### Typography

- **Sans**: Inter (system fallback)
- **Mono**: JetBrains Mono (Consolas fallback)
- **Prose**: Tailwind Typography with dark mode support

### Shadows & Effects

- **Brutal shadows**: 6px offset shadows in theme colors
- **Borders**: 4px solid borders (black/white)
- **Animations**: Subtle float and pulse effects

## Development Commands

```bash
# Development
bun run dev           # Start development server
bun run build         # Build for production
bun run start         # Start production server

# Code Quality
bun run lint          # Run Biome linter + TypeScript check

# Testing
bun run test          # Run test suite
```

## Testing Strategy

- **Unit Tests**: All components with Testing Library
- **Accessibility Tests**: WCAG compliance verification
- **Integration Tests**: User interaction flows
- **Custom Matchers**: `toBeVisible`, `toHaveAccessibleName`, `toHaveMinimumTouchTarget`, `toHaveProperFocusIndicator`
- Try to write only meaningful tests, prefer usability over coverage

## Content Management

- Blog posts are written in MDX format in `content/blog/`
- Frontmatter is declared in a type read it when necessary
- Personal information configured in `lib/personal-config.ts` and must be used from there

## Accessibility Requirements

- Minimum 44px touch targets for all interactive elements
- Proper ARIA labels and descriptions
- High contrast color ratios
- Focus indicators on all focusable elements
- Screen reader compatible markup
- Keyboard navigation support
