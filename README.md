# Talaqai Website

A modern, responsive website for Talaqai - a nonprofit AI automation educational program focused on empowering high school students in the Arab world with no-code AI agents and workflow automation skills.

## 🚀 Features

- **Modern Design**: Clean, minimalist aesthetic with Talaqai brand colors
- **Responsive**: Seamlessly adapts to all screen sizes (desktop, tablet, mobile)
- **Dark Mode**: Toggle between light and dark themes
- **Interactive Navigation**: Smooth scrolling between sections
- **Contact Form**: Registration/inquiry form for program applicants
- **Sponsor Showcase**: Dedicated section for partners and sponsors
- **Curriculum Display**: Interactive weekly module breakdown
- **SEO Optimized**: Meta tags and structured data for search engines

## 🎨 Design System

### Colors
- **Primary**: `#4B4E6D` (Deep Indigo)
- **Accent Blue**: `#2978FF` (Electric Blue)
- **Accent Green**: `#A3D55F` (Lime Green)
- **Background Light**: `#F5F7FA` (Soft White)
- **Background Dark**: `#1a1a1a` (Dark Theme)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Heroicons (SVG)
- **Fonts**: Google Fonts (Inter)

## 📦 Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start development server**:
   ```bash
   npm run dev
   ```
3. **Open** http://localhost:5173 in your browser

## 🔧 Customization

### Adding Your Logo and Favicon
See [LOGO_INSTRUCTIONS.md](./LOGO_INSTRUCTIONS.md) for detailed instructions on:
- Replacing the favicon
- Adding your logo to navigation
- Updating sponsor logos
- Adding social media images

### Updating Content

#### Curriculum
Edit the `curriculumModules` array in `src/components/Curriculum.tsx` to add your actual syllabus:

```typescript
const curriculumModules: CurriculumModule[] = [
  {
    week: 1,
    title: "Your Module Title",
    description: "Module description",
    topics: ["Topic 1", "Topic 2", "Topic 3"],
    duration: "4 hours",
    project: "Week project description"
  },
  // Add more modules...
];
```

#### Sponsors
Update the `sponsors` array in `src/components/Sponsors.tsx`:

```typescript
const sponsors: Sponsor[] = [
  {
    name: "Your Sponsor Name",
    description: "Sponsor description",
    logo: "/sponsors/sponsor-logo.png",
    website: "https://sponsor-website.com",
    type: "platinum" // or "gold", "silver", "partner"
  },
  // Add more sponsors...
];
```

#### Contact Information
Update contact details in `src/components/Contact.tsx`:
- Email addresses
- Phone numbers
- Office hours
- Social media links

### Form Integration
The contact form is currently a demonstration. To make it functional:

1. **Backend Integration**: Connect to your preferred backend service
2. **Email Service**: Use services like EmailJS, Formspree, or Netlify Forms
3. **API Endpoint**: Update the form submission logic in `src/components/Contact.tsx`

Example with EmailJS:
```bash
npm install @emailjs/browser
```

```typescript
import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await emailjs.send('service_id', 'template_id', formData, 'user_id');
    setSubmitStatus('success');
  } catch (error) {
    setSubmitStatus('error');
  }
};
```

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options

#### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

#### Vercel
1. Import your project
2. Vercel will automatically detect Vite
3. Deploy with default settings

#### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run: `npm run build && npm run deploy`

## 📄 Project Structure

```
src/
├── components/
│   ├── Navigation.tsx    # Header navigation with dark mode toggle
│   ├── Hero.tsx         # Hero section with CTA buttons
│   ├── About.tsx        # About section with mission/vision
│   ├── Curriculum.tsx   # Interactive curriculum display
│   ├── Sponsors.tsx     # Sponsors and partners showcase
│   ├── Contact.tsx      # Contact form and information
│   └── Footer.tsx       # Footer with links and social media
├── hooks/
│   └── useDarkMode.ts   # Dark mode functionality
├── App.tsx              # Main app component
├── main.tsx            # React entry point
└── index.css           # Global styles and Tailwind imports

public/
├── favicon.svg         # Site favicon
├── sponsors/          # Sponsor logo directory
└── index.html         # HTML template
```

## 🐛 Troubleshooting

### Common Issues

**Tailwind styles not working:**
- Ensure `tailwind.config.js` is properly configured
- Check that Tailwind directives are in `src/index.css`
- Verify PostCSS configuration

**Dark mode not persisting:**
- Check localStorage in browser developer tools
- Ensure the `useDarkMode` hook is properly imported

**Build errors:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

**Images not loading:**
- Ensure images are in the `public` directory
- Check file paths are correct
- Verify image file formats are supported

---

**Built with ❤️ for empowering the next generation of AI innovators in the Arab world.**
