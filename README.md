# Personal Blog - Next.js Edition

A bold, unapologetic personal blog and portfolio built with Next.js, featuring brutalist design principles and modern web technologies.

## 🎯 Features

### Design & UX

- **Brutalist Design**: Bold typography, high contrast, thick borders, and dramatic shadows
- **Dark/Light Mode**: Automatic system detection with manual toggle
- **Responsive Design**: Mobile-first approach with proper breakpoints
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels and keyboard navigation
- **Performance**: Static generation with optimized images and minimal JavaScript

### Technical Features

- **Static Site Generation**: Fast loading with Next.js static export
- **TypeScript**: Full type safety throughout the application
- **Search**: Fuzzy search with typo tolerance using Fuse.js
- **Tag Filtering**: Dynamic content filtering by categories
- **SEO Optimized**: Proper meta tags, structured data, and semantic HTML
- **Testing**: Comprehensive test suite with Vitest and Testing Library

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom brutalist design system
- **Content**: Markdown with gray-matter for frontmatter
- **Search**: Fuse.js for fuzzy search functionality
- **Testing**: Vitest + Testing Library + jsdom
- **Linting**: Biome for code formatting and linting
- **Deployment**: Static export ready for any hosting platform

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Homepage
│   ├── blog/              # Blog pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx     # Main navigation with mobile menu
│   ├── Button.tsx         # Reusable button component
│   ├── Card.tsx           # Brutalist card component
│   ├── ThemeProvider.tsx  # Theme context and management
│   └── icons/             # SVG icon components
├── content/               # Markdown blog posts
│   └── blog/              # Blog post files
├── lib/                   # Utility functions
│   └── blog.ts            # Blog post utilities
├── test/                  # Test files and setup
└── public/                # Static assets
```

## 🛠️ Getting Started

### Prerequisites

- `bun` at least version `1.2.0`

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Shikachuu/blog
   cd blog
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start development server**

   ```bash
   bun run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 📝 Content Management

### Adding Blog Posts

1. Create a new `.mdx` file in `content/blog/`
2. Add frontmatter with required fields:

> [!WARNING]
> All files **must** be `.mdx`, normal `.md` files are not supported as of now.

```markdown
---
title: "Your Post Title"
description: "Brief description of the post"
pubDate: "2024-01-15"
heroImage: "https://example.com/image.jpg" # Optional
tags: ["tag1", "tag2", "tag3"]
draft: false # Optional, defaults to false
---

# Your Content Here

Write your blog post content in Markdown...
```

### Frontmatter Fields

- `title` (required): Post title
- `description` (required): Meta description and excerpt
- `pubDate` (required): Publication date in YYYY-MM-DD format
- `heroImage` (optional): Hero image URL
- `tags` (required): Array of tags for categorization
- `draft` (optional): Set to `true` to hide from production

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary: #0066ff /* Electric Blue */ --secondary: #00ff88 /* Neon Green */
  --accent: #ff0066 /* Hot Pink */ --orange: #ff6600 /* Vibrant Orange */
  /* Neutral Colors */ --neutral-50: #fafafa /* Lightest */
  --neutral-900: #171717 /* Darkest */;
```

### Typography

- **Primary Font**: Inter (sans-serif)
- **Monospace Font**: JetBrains Mono
- **Font Weights**: 400 (regular), 600 (semibold), 800 (extrabold), 900 (black)

### Shadows (Brutalist Style)

```css
--shadow-brutal: 6px 6px 0px 0px rgba(0, 0, 0, 1) --shadow-brutal-primary: 6px
  6px 0px 0px #0066ff --shadow-brutal-secondary: 6px 6px 0px 0px #00ff88;
```

## ♿ Accessibility Features

- **WCAG 2.1 AA Compliant**: Proper contrast ratios and semantic HTML
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and announcements
- **Touch Targets**: Minimum 44px touch targets for mobile
- **Focus Management**: Visible focus indicators and logical tab order
- **Reduced Motion**: Respects user's motion preferences

## 🧪 Testing

The project includes comprehensive tests covering:

- **Component Testing**: All React components
- **Accessibility Testing**: WCAG compliance checks
- **Integration Testing**: Navigation and user workflows
- **Performance Testing**: Core Web Vitals monitoring

### Running Tests

```bash
bun run test              # Run all tests
bun run test:watch        # Watch mode
bun run test:coverage     # With coverage report
```

## 🚀 Deployment

### Static Export

The project is configured for static export, making it deployable to any static hosting service:

```bash
bun run export
```

This generates a `out/` directory with all static files.

### Deployment Options

- **Netlify**: Drag and drop the `out/` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Use the generated static files
- **Any CDN**: Upload the `out/` directory

**All the deployment scripts and OpenTofu code targets Cloudflare Pages, other environment specific deployment's aren't officially supported.**

## 🔧 Customization

### Changing Colors

Update the color palette in `tailwind.config.mjs`:

```javascript
colors: {
  primary: {
    DEFAULT: '#YOUR_COLOR',
    dark: '#YOUR_DARKER_COLOR',
  },
  // ... other colors
}
```

### Adding Components

1. Create component in `components/`
2. Follow the established patterns for props and styling
3. Add tests in `test/components/`
4. Export from component file

### Modifying Layout

- **Navigation**: Edit `components/Navigation.tsx`
- **Footer**: Add to `app/layout.tsx`
- **Global Styles**: Modify `app/globals.css`

## 📚 Learn More

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

### Design Resources

- [Brutalist Web Design](https://brutalistwebsites.com/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Design Influences

- [Shopify Docs](https://shopify.dev/docs)
- [Lykke](https://lykkekahvitilat.fi/)
- [Nomad Coffee](https://nomadcoffee.es/)

These and varous iteartions from the before mentioned brutalist web designs.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Check out CLAUDE.md and the future contributor's guideline.
- Always run the linters and tests, all pipelines must pass.
- We are using trunk based developement, which means `main` shold be always stable and is deployed.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ and a lot of ☕**

_Ready to make your mark on the web? Fork this repo and make it your own!_

