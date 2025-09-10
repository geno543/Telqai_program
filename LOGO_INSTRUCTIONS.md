# Logo and Favicon Instructions

## Adding Your Logo and Favicon

To customize the Talaqai website with your actual logos and favicon:

### 1. Favicon
- Replace `/public/favicon.png` with your actual favicon (recommended: 32x32 or 64x64 pixels PNG)
- Alternative formats: `.ico`, `.svg` are also supported
- Update the `href` attribute in `index.html` if using a different format

### 2. Navigation Logo
The navigation currently uses a generated "T" logo. To use your actual logo:
- Add your logo file to `/public/` or `/src/assets/`
- Update the logo section in `src/components/Navigation.tsx` (around line 32)
- Replace the current placeholder with:
```jsx
<img src="/your-logo.png" alt="Talaqai" className="w-8 h-8" />
```

### 3. Sponsor Logos
- Add sponsor logo files to `/public/sponsors/`
- Update the `logo` paths in the sponsors array in `src/components/Sponsors.tsx`
- Example: `logo: "/sponsors/company-name-logo.png"`

### 4. Social Media Images
For better social media sharing, add these files to `/public/`:
- `og-image.png` (1200x630 pixels for Open Graph)
- `twitter-image.png` (1200x600 pixels for Twitter Card)

### 5. Hero Section Visual
The hero section currently uses a placeholder visual. You can:
- Replace with an actual image/illustration
- Update the visual in `src/components/Hero.tsx` (around line 67)
- Keep the current geometric design and customize colors/shapes

## File Structure
```
public/
├── favicon.png          # Your favicon
├── og-image.png         # Open Graph image
├── twitter-image.png    # Twitter Card image
└── sponsors/            # Sponsor logos
    ├── sponsor1-logo.png
    ├── sponsor2-logo.png
    └── ...

src/
└── assets/              # Alternative location for images
    └── logo.png         # Main logo (if not in public)
```

## Notes
- Use optimized images for better performance
- Maintain consistent branding across all logos
- Test favicon appearance in different browsers
- Ensure logo contrast works in both light and dark modes
