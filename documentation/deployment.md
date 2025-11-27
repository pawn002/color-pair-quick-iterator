# Deployment Guide

This guide covers building and deploying the Color Pair Quick Iterator application to production.

## Overview

The application is deployed to **GitHub Pages** as a static website. The production build is optimized, minified, and ready for public hosting.

**Live URL**: https://pawn002.github.io/color-pair-quick-iterator/

## Table of Contents

1. [Production Build](#production-build)
2. [GitHub Pages Deployment](#github-pages-deployment)
3. [Build Configuration](#build-configuration)
4. [Deployment Process](#deployment-process)
5. [Troubleshooting](#troubleshooting)
6. [Alternative Hosting](#alternative-hosting)

---

## Production Build

### Building for Production

```bash
npm run build
```

This command:
1. Compiles TypeScript to JavaScript
2. Bundles and optimizes code
3. Minifies HTML, CSS, and JavaScript
4. Applies tree-shaking to remove unused code
5. Generates hashed filenames for cache-busting
6. Outputs to the `docs/` directory

### Build Output

```
docs/
├── index.html                 # Main HTML file
├── main-[hash].js            # Application code
├── polyfills-[hash].js       # Browser compatibility
├── runtime-[hash].js         # Angular runtime
├── styles-[hash].css         # Compiled styles
└── assets/                   # Static assets (images, fonts)
```

### Build Configuration

The build uses production configuration defined in `angular.json`:

```json
{
  "production": {
    "optimization": true,
    "outputHashing": "all",
    "sourceMap": false,
    "namedChunks": false,
    "extractLicenses": true,
    "vendorChunk": false,
    "buildOptimizer": true,
    "baseHref": "/color-pair-quick-iterator/"
  }
}
```

### Build Verification

After building, verify the output:

```bash
# Check output directory
ls -la docs/

# Check file sizes
du -sh docs/*

# Serve locally to test
npx http-server docs -p 8080
```

Open http://localhost:8080/ and verify the application works correctly.

---

## GitHub Pages Deployment

### Configuration

The project is configured for GitHub Pages deployment:

**angular.json**:
```json
{
  "production": {
    "baseHref": "/color-pair-quick-iterator/",
    "outputPath": "docs"
  }
}
```

**Repository Settings**:
- Source: Deploy from `/docs` directory on main branch
- Custom domain: None (uses pawn002.github.io)
- HTTPS: Enforce HTTPS enabled

### Automatic Deployment

GitHub Pages automatically deploys when changes are pushed to the `/docs` directory on the main branch.

### Deployment Steps

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Verify the build**:
   ```bash
   # Check that docs/ directory exists and contains files
   ls -la docs/

   # Verify index.html exists
   cat docs/index.html
   ```

3. **Commit the build**:
   ```bash
   git add docs/
   git commit -m "build: update production build"
   ```

4. **Push to main branch**:
   ```bash
   git push origin main
   ```

5. **Wait for deployment**:
   - GitHub Pages typically deploys within 1-2 minutes
   - Check deployment status in repository Settings → Pages
   - Visit https://pawn002.github.io/color-pair-quick-iterator/

### Deployment Verification

After deployment, test:

1. **Application loads**: Visit the live URL
2. **No 404 errors**: Check browser console
3. **Assets load**: Images, fonts, and styles load correctly
4. **Routing works**: All navigation functions properly
5. **Performance**: Application performs well in production

---

## Build Configuration

### Base Href

The `baseHref` setting is crucial for GitHub Pages subdirectory deployment:

```json
"baseHref": "/color-pair-quick-iterator/"
```

This ensures all asset paths are correct when deployed to a subdirectory.

**Important**: If deploying to a root domain or different subdirectory, update this value.

### Output Path

```json
"outputPath": "docs"
```

GitHub Pages requires deployment from either:
- Root directory (/)
- /docs directory (configured)

### Bundle Budgets

Angular enforces bundle size limits:

```json
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "500kB",
    "maximumError": "1MB"
  },
  {
    "type": "anyComponentStyle",
    "maximumWarning": "4kB",
    "maximumError": "8kB"
  }
]
```

If budgets are exceeded:
- **Warning**: Build succeeds but prints warning
- **Error**: Build fails

To address budget issues:
1. Analyze bundle: `npm run build -- --stats-json`
2. Use webpack-bundle-analyzer
3. Lazy load modules
4. Remove unused dependencies

### Source Maps

Production builds disable source maps for security and performance:

```json
"sourceMap": false
```

For debugging production issues, temporarily enable source maps:

```bash
ng build --source-map
```

---

## Deployment Process

### Manual Deployment Workflow

```bash
# 1. Ensure main branch is up to date
git checkout main
git pull origin main

# 2. Build for production
npm run build

# 3. Test the build locally
npx http-server docs -p 8080
# Visit http://localhost:8080/ and test thoroughly

# 4. Commit the build
git add docs/
git commit -m "build: update production build for v1.x.x"

# 5. Push to GitHub
git push origin main

# 6. Verify deployment
# Visit https://pawn002.github.io/color-pair-quick-iterator/
# Check GitHub Actions for deployment status
```

### Automated Deployment (Future)

For automated deployment, consider GitHub Actions:

**.github/workflows/deploy.yml**:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: docs
          branch: gh-pages
```

### Versioning

Follow semantic versioning for releases:

```bash
# Update version in package.json
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# Create git tag
git tag -a v1.0.1 -m "Release v1.0.1"
git push origin v1.0.1
```

---

## Troubleshooting

### Common Issues

#### 1. Assets Not Loading (404 Errors)

**Problem**: JavaScript/CSS files return 404

**Solution**: Verify `baseHref` is correct:
```bash
grep baseHref docs/index.html
# Should show: <base href="/color-pair-quick-iterator/">
```

If incorrect, rebuild with correct base href:
```bash
ng build --base-href="/color-pair-quick-iterator/"
```

#### 2. Blank Page After Deployment

**Problem**: Application shows blank page

**Causes**:
- Incorrect `baseHref`
- JavaScript errors (check console)
- Missing polyfills

**Solution**:
1. Open browser console (F12)
2. Check for errors
3. Verify network tab shows assets loading
4. Rebuild with `--verbose` flag for debugging

#### 3. Routing Issues

**Problem**: Direct URLs return 404

**Solution**: GitHub Pages doesn't support client-side routing by default. Options:

1. **Use hash routing** (add to app.config.ts):
   ```typescript
   provideRouter(routes, withHashLocation())
   ```

2. **Add 404.html redirect** (copy of index.html):
   ```bash
   cp docs/index.html docs/404.html
   git add docs/404.html
   git commit -m "fix: add 404.html for client-side routing"
   ```

#### 4. Old Version Still Showing

**Problem**: Users see old version after deployment

**Causes**:
- Browser caching
- CDN caching (GitHub Pages CDN)

**Solutions**:
1. Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Wait 5-10 minutes for CDN propagation
4. Check actual files on GitHub repository

#### 5. Build Fails

**Problem**: `npm run build` fails

**Common causes**:
- TypeScript errors
- Missing dependencies
- Bundle size exceeded

**Solution**:
```bash
# Check for TypeScript errors
ng build --verbose

# Install dependencies
npm ci

# Check bundle size
ng build --stats-json
```

---

## Alternative Hosting

While GitHub Pages is the primary deployment target, the application can be hosted anywhere that serves static files.

### Netlify

```bash
# 1. Build
npm run build

# 2. Deploy (first time)
npx netlify-cli deploy --dir=docs --prod

# Update netlify.toml
[build]
  command = "npm run build"
  publish = "docs"
```

### Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel --prod
```

**vercel.json**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "docs"
}
```

### Firebase Hosting

```bash
# 1. Install Firebase tools
npm i -g firebase-tools

# 2. Initialize Firebase
firebase init hosting

# 3. Configure
# Set public directory to: docs

# 4. Deploy
firebase deploy
```

### AWS S3 + CloudFront

```bash
# 1. Build
npm run build

# 2. Upload to S3
aws s3 sync docs/ s3://your-bucket-name --delete

# 3. Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

### Docker Container

**Dockerfile**:
```dockerfile
FROM nginx:alpine
COPY docs/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t color-pair-quick-iterator .
docker run -p 8080:80 color-pair-quick-iterator
```

---

## Performance Optimization

### Pre-deployment Checklist

- [ ] Production build succeeds
- [ ] Bundle size within budgets
- [ ] No console errors
- [ ] All assets load correctly
- [ ] Application functions correctly
- [ ] Performance tested (Lighthouse score)
- [ ] Accessibility tested (WCAG AA)
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsive
- [ ] HTTPS enabled

### Lighthouse Audit

Before deploying, run Lighthouse audit:

1. Build for production: `npm run build`
2. Serve locally: `npx http-server docs -p 8080`
3. Open Chrome DevTools → Lighthouse
4. Run audit on all categories
5. Address any issues

**Target Scores**:
- Performance: 90+
- Accessibility: 100
- Best Practices: 90+
- SEO: 90+

### Performance Tips

1. **Lazy loading**: Load features on demand
2. **Image optimization**: Compress images, use WebP
3. **Code splitting**: Break into smaller chunks
4. **Caching**: Leverage browser caching with hashed filenames
5. **CDN**: GitHub Pages provides CDN automatically

---

## Security Considerations

### Content Security Policy

Consider adding CSP headers:

**docs/.htaccess** (if using Apache):
```apache
<IfModule mod_headers.c>
  Header set Content-Security-Policy "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'"
</IfModule>
```

**Note**: GitHub Pages doesn't support custom headers. Use meta tag:

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; style-src 'self' 'unsafe-inline'">
```

### HTTPS

GitHub Pages enforces HTTPS automatically. Verify:
- Visit site with `https://`
- Check for valid SSL certificate
- Ensure no mixed content warnings

---

## Monitoring

### Google Analytics (Optional)

Add Google Analytics to track usage:

**src/index.html**:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking (Optional)

Consider Sentry for error tracking:

```typescript
import * as Sentry from "@sentry/angular";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

---

## Rollback Procedure

If deployment causes issues:

```bash
# 1. Identify last working commit
git log --oneline

# 2. Checkout that commit's docs/ directory
git checkout <commit-hash> -- docs/

# 3. Commit the rollback
git commit -m "revert: rollback to previous working build"

# 4. Push to trigger deployment
git push origin main
```

---

## Next Steps

- Set up automated deployment with GitHub Actions
- Configure custom domain (optional)
- Add monitoring and analytics
- Set up error tracking
- Create deployment checklist
- Document rollback procedures

---

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Angular Deployment Guide](https://angular.dev/tools/cli/deployment)
- [Lighthouse Performance Audits](https://developer.chrome.com/docs/lighthouse/)
- [Web.dev Performance Guide](https://web.dev/performance/)

---

## Questions?

- Review [Architecture](./architecture.md) for build system details
- Check [Getting Started](./getting-started.md) for local development
- Open an issue for deployment-related questions
