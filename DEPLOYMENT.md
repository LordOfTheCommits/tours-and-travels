# Deployment Guide - Tours & Travels Website

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Local Deployment](#local-deployment)
3. [Production Deployment](#production-deployment)
4. [Server Requirements](#server-requirements)
5. [Troubleshooting](#troubleshooting)
6. [Security Considerations](#security-considerations)

---

## Pre-Deployment Checklist

Before deploying to production, ensure the following:

### Code Quality
- [ ] All JavaScript files have no console errors
- [ ] All links are verified and working (test all navigation links)
- [ ] All images load correctly
- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] Contact form is functional
- [ ] Booking form validation works
- [ ] Tours data (data/tours.json) is properly formatted
- [ ] All CSS and JavaScript files are linked correctly
- [ ] No hardcoded localhost or test URLs remain

### Performance
- [ ] Test page load times (Target: < 3 seconds)
- [ ] Verify all CDN resources load correctly
- [ ] Check for unused CSS/JavaScript
- [ ] Optimize images (target < 200KB per image)
- [ ] Enable gzip compression on server
- [ ] Consider minifying CSS and JavaScript

### Security
- [ ] Remove any API keys or sensitive data from code
- [ ] Verify HTTPS certificate is valid
- [ ] Test form validation prevents XSS attacks
- [ ] Review localStorage usage is secure
- [ ] Check that no sensitive data is exposed in localStorage
- [ ] Verify .gitignore excludes sensitive files

### Accessibility
- [ ] Test with keyboard navigation only
- [ ] Verify color contrast meets WCAG standards
- [ ] Test with screen readers
- [ ] All images have alt text
- [ ] Form labels are associated with inputs

### Browser Compatibility
- [ ] Test in Chrome (latest)
- [ ] Test in Firefox (latest)
- [ ] Test in Safari (latest)
- [ ] Test in Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## Local Deployment

### Using Python HTTP Server
```bash
# Navigate to project directory
cd tours-and-travels

# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000

# Then open: http://localhost:8000
```

### Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Automatically opens at `http://localhost:5500`

### Using Node.js HTTP Server
```bash
# Install http-server globally
npm install -g http-server

# Navigate to project and start
cd tours-and-travels
http-server

# Then open: http://localhost:8080
```

---

## Production Deployment

### Option 1: Shared Hosting (Cpanel)

1. **Connect via FTP**
   - Download FileZilla or similar FTP client
   - Use credentials provided by hosting provider
   - Connect to: ftp://your-domain.com

2. **Upload Files**
   - Upload all project files to `public_html/` directory
   - Ensure folder structure matches local setup
   - Wait for upload to complete

3. **Set Permissions**
   - Set folder permissions to 755
   - Set file permissions to 644

4. **Test Website**
   - Visit: https://your-domain.com
   - Test all pages and functionality
   - Check console for any errors (F12 → Console)

### Option 2: Cloud Hosting (Vercel, Netlify)

#### Netlify
1. Connect GitHub repository
2. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: (leave empty - root)
3. Deploy

#### Vercel
1. Import GitHub repository
2. Configure project settings
3. Deploy

### Option 3: Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t tours-and-travels .
docker run -p 80:80 tours-and-travels
```

### Option 4: Apache Server with .htaccess

Create `.htaccess` file:
```apache
# Enable mod_rewrite
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Remove .html extension
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^([^\.]+)$ $1.html [NC,L]
</IfModule>

# Enable GZIP compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache control
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 1 day"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
</IfModule>

# Security headers
Header set X-Frame-Options "SAMEORIGIN"
Header set X-Content-Type-Options "nosniff"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"
```

---

## Server Requirements

### Minimum Requirements
- **Web Server**: Apache, Nginx, or IIS
- **PHP**: None required (static site)
- **Node.js**: None required (static site)
- **Storage**: 50 MB minimum
- **Bandwidth**: 1 GB/month minimum

### Recommended Requirements
- **Web Server**: Nginx or Apache with mod_rewrite
- **HTTPS**: SSL/TLS certificate (Let's Encrypt is free)
- **CDN**: CloudFlare or similar for global distribution
- **Storage**: 500 MB+ for future expansion
- **Bandwidth**: 10 GB/month or unlimited

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 12+, Chrome Mobile)

---

## Performance Optimization

### Enable GZIP Compression
Add to `.htaccess`:
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

### Set Cache Headers
Leverage browser caching for static assets:
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

### Minify CSS and JavaScript
```bash
# Using npm/node
npx cleancss css/*.css -o css/style.min.css
npx terser js/*.js -o js/main.min.js
```

---

## Troubleshooting

### 404 Errors on Page Load
**Problem**: Tours.json or other files not found
**Solution**:
1. Verify file paths are correct
2. Check file permissions (should be 644)
3. Verify file exists on server
4. Check browser console for actual file path

### Images Not Loading
**Problem**: Images display as broken
**Solution**:
1. Verify image URLs are absolute or correct relative paths
2. Check image file permissions (644)
3. Ensure images exist on server
4. Verify correct image format (JPG, PNG, WebP)

### Forms Not Submitting
**Problem**: Contact or booking form doesn't work
**Solution**:
1. Check browser console for JavaScript errors
2. Verify form fields have correct IDs
3. Check localStorage is enabled
4. Test in different browser

### Slow Page Load
**Problem**: Website loads slowly
**Solution**:
1. Enable GZIP compression
2. Set cache headers
3. Optimize images
4. Use CDN for static assets
5. Check server CPU/Memory usage
6. Consider upgrading hosting plan

### HTTPS Mixed Content Error
**Problem**: Browser warns about mixed secure/insecure content
**Solution**:
1. Use HTTPS URLs for all external resources
2. Update CDN URLs to use HTTPS
3. Update any hardcoded URLs to HTTPS
4. Clear browser cache and reload

---

## Security Considerations

### Data Protection
- [ ] Never store sensitive data in localStorage
- [ ] Validate all user inputs on client-side
- [ ] Use HTTPS for all communications
- [ ] Implement CSRF tokens for forms (if using backend)
- [ ] Never expose API keys in frontend code

### Performance Headers
Add security headers to `.htaccess`:
```apache
Header set X-Frame-Options "SAMEORIGIN"
Header set X-Content-Type-Options "nosniff"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"
```

### Contact Form Security
- [ ] Validate email format
- [ ] Sanitize text inputs
- [ ] Implement rate limiting (backend)
- [ ] Use backend service to send emails (not frontend)
- [ ] Never store raw passwords

### Content Security Policy
Add to `.htaccess` or HTML head:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; 
               style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;
               img-src 'self' data: https: http:;">
```

---

## Monitoring & Maintenance

### Regular Checks
- [ ] Monitor server error logs weekly
- [ ] Check SSL certificate expiration monthly
- [ ] Verify all links work (monthly)
- [ ] Review analytics for errors (weekly)
- [ ] Test contact form functionality (weekly)

### Backup Strategy
- [ ] Backup entire project daily
- [ ] Backup database if applicable (daily)
- [ ] Test backup restoration monthly
- [ ] Store backups off-site
- [ ] Keep backup history for 30 days

### Update Strategy
- [ ] Monitor Bootstrap CDN for updates
- [ ] Monitor Font Awesome updates
- [ ] Plan security patches
- [ ] Test updates in staging first
- [ ] Keep documentation updated

---

## Support Resources

- **Bootstrap Documentation**: https://getbootstrap.com/docs/5.3/
- **Font Awesome Icons**: https://fontawesome.com/icons
- **MDN Web Docs**: https://developer.mozilla.org
- **Web.dev Performance Guide**: https://web.dev/performance/
- **OWASP Security Guide**: https://owasp.org/

---

## Deployment Checklist

Final checklist before going live:

- [ ] All files uploaded to server
- [ ] File permissions set correctly (755 for folders, 644 for files)
- [ ] HTTPS certificate installed and valid
- [ ] DNS records point to correct server
- [ ] Email sending configured (if applicable)
- [ ] Analytics tracking code added (if applicable)
- [ ] Sitemap.xml created and submitted to search engines
- [ ] robots.txt created
- [ ] Backup system configured
- [ ] Monitoring/alerting system configured
- [ ] Performance tested (< 3 seconds load time)
- [ ] Security headers configured
- [ ] GZIP compression enabled
- [ ] Cache headers set
- [ ] All pages tested in all major browsers
- [ ] Mobile responsiveness verified
- [ ] Accessibility standards met
- [ ] Contact form tested
- [ ] Booking flow tested end-to-end
- [ ] Database backups configured (if applicable)
- [ ] SSL/TLS certificate auto-renewal configured
- [ ] Production documentation completed

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Version**: 1.0
**Last Updated**: May 2026
