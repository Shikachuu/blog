# Brutalist Blog - Next.js Edition

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
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd brutalist-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run export       # Build and export static files
npm run lint         # Run linting
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## 📝 Content Management

### Adding Blog Posts

1. Create a new `.md` file in `content/blog/`
2. Add frontmatter with required fields:

```markdown
---
title: 'Your Post Title'
description: 'Brief description of the post'
pubDate: '2024-01-15'
heroImage: 'https://example.com/image.jpg' # Optional
tags: ['tag1', 'tag2', 'tag3']
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
--primary: #0066FF      /* Electric Blue */
--secondary: #00FF88    /* Neon Green */
--accent: #FF0066       /* Hot Pink */
--orange: #FF6600       /* Vibrant Orange */

/* Neutral Colors */
--neutral-50: #FAFAFA   /* Lightest */
--neutral-900: #171717  /* Darkest */
```

### Typography

- **Primary Font**: Inter (sans-serif)
- **Monospace Font**: JetBrains Mono
- **Font Weights**: 400 (regular), 600 (semibold), 800 (extrabold), 900 (black)

### Shadows (Brutalist Style)

```css
--shadow-brutal: 6px 6px 0px 0px rgba(0, 0, 0, 1)
--shadow-brutal-primary: 6px 6px 0px 0px #0066FF
--shadow-brutal-secondary: 6px 6px 0px 0px #00FF88
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
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage report
```

## 📊 Performance

### Optimization Features

- **Static Generation**: Pre-rendered pages for fast loading
- **Image Optimization**: Next.js Image component with WebP support
- **Code Splitting**: Automatic bundle optimization
- **CSS Optimization**: Tailwind CSS purging and minification
- **Font Optimization**: next/font for optimal font loading

### Performance Targets

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: 
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

## 🚀 Deployment

### Static Export

The project is configured for static export, making it deployable to any static hosting service:

```bash
npm run export
```

This generates a `out/` directory with all static files.

### Deployment Options

- **Netlify**: Drag and drop the `out/` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Use the generated static files
- **Any CDN**: Upload the `out/` directory

### Environment Variables

For production deployment, you may need:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain accessibility standards
- Write tests for new features
- Use semantic commit messages
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Brutalist Architecture**: Inspiration for the design philosophy
- **Next.js Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Open Source Community**: For the tools and libraries that make this possible

---

**Built with ❤️ and a lot of ☕**

*Ready to make your mark on the web? Fork this repo and make it your own!*