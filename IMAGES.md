# Images & Assets Guide

This document lists all images and visual assets used in the Tours & Travels website.

## Image Folders Structure

```
images/
├── hero/          (Hero section images - currently using CSS gradient)
├── tours/         (Tour package images - using Unsplash URLs)
└── icons/         (SVG icons for UI elements)
```

## SVG Icons (`images/icons/`)

Custom-made SVG icons for the website UI:

| Icon | File | Usage | Color |
|------|------|-------|-------|
| ⭐ Star | `star.svg` | Rating display | Gold (#FFD700) |
| 📍 Location | `location.svg` | Tour location marker | Blue (#0d6efd) |
| 📅 Calendar | `calendar.svg` | Date picker icon | Orange (#ff9800) |
| 👤 User | `user.svg` | User profile icon | Green (#198754) |
| ✈️ Plane | `plane.svg` | Travel/flight icon | Red (#dc3545) |

## Tour Images (from Unsplash)

High-quality, royalty-free images from Unsplash.com:

### Tour Packages

| Tour ID | Tour Name | Location | Image URL | Source |
|---------|-----------|----------|-----------|--------|
| 1 | Paris City Tour | France | `https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=400&fit=crop` | Eiffel Tower, Paris |
| 2 | Tokyo Adventure | Japan | `https://images.unsplash.com/photo-1540959375944-7049f642e9d4?w=500&h=400&fit=crop` | Tokyo cityscape |
| 3 | Bali Beach Escape | Indonesia | `https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=500&h=400&fit=crop` | Bali beach resort |
| 4 | New York Metropolis | USA | `https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=400&fit=crop` | New York City skyline |
| 5 | Swiss Alps Explorer | Switzerland | `https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&h=400&fit=crop` | Swiss mountains |
| 6 | Dubai Luxury Experience | UAE | `https://images.unsplash.com/photo-1512453475868-b9bfc6b0ea60?w=500&h=400&fit=crop` | Dubai skyline |
| 7 | Barcelona Mediterranean | Spain | `https://images.unsplash.com/photo-1562883676-55d5d6d4c6a5?w=500&h=400&fit=crop` | Barcelona city |
| 8 | London Heritage Tour | UK | `https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=500&h=400&fit=crop` | London landmarks |
| 9 | Greece Island Hopping | Greece | `https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=400&fit=crop` | Greek islands |
| 10 | Thailand Cultural Journey | Thailand | `https://images.unsplash.com/photo-1552520514-5fefe8c9ef14?w=500&h=400&fit=crop` | Thailand temple |

### About Page

| Section | Image URL | Source |
|---------|-----------|--------|
| Our Story | `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=500&fit=crop` | Travel & Adventure |

## CSS Gradient Backgrounds

### Hero Section (Home Page)
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
- Creates a purple-violet gradient
- No external image needed
- Mobile responsive

## Image Optimization

All images are optimized with:
- **Format**: WebP/JPEG (via Unsplash optimization)
- **Width**: 400-600px
- **Height**: 300-500px
- **Quality**: High (Unsplash auto-optimizes)
- **Fit**: `crop` - maintains aspect ratio
- **CDN Delivery**: Unsplash CDN (fast worldwide delivery)

## Adding Your Own Images

### Option 1: Upload to Unsplash
1. Create a free Unsplash account
2. Upload your images
3. Copy the image URL
4. Replace the image URLs in:
   - `data/tours.json` (tour images)
   - HTML files (about section, etc.)

### Option 2: Use Local Images
1. Place images in appropriate folder:
   - Tour images → `images/tours/`
   - Hero images → `images/hero/`
   - Icons → `images/icons/`
2. Update image paths in HTML/JSON files
3. Example: `<img src="images/tours/paris.jpg" alt="Paris">`

### Option 3: Use Another CDN
Popular free CDNs for hosting images:
- **Cloudinary** - `cloudinary.com`
- **Imgix** - `imgix.com`
- **Cloudflare Images** - `cloudflare.com`
- **AWS S3** - `aws.amazon.com`
- **Google Cloud Storage** - `cloud.google.com`

## Icon Usage in HTML

Custom SVG icons are available via Font Awesome:

```html
<!-- Font Awesome Icons Used -->
<i class="fas fa-globe"></i>           <!-- Logo icon -->
<i class="fas fa-star"></i>            <!-- Rating -->
<i class="fas fa-map-marker-alt"></i>  <!-- Location -->
<i class="fas fa-calendar"></i>        <!-- Date -->
<i class="fas fa-users"></i>           <!-- Group size -->
<i class="fas fa-check"></i>           <!-- Checkmark -->
<i class="fas fa-phone"></i>           <!-- Phone -->
<i class="fas fa-envelope"></i>        <!-- Email -->
<i class="fas fa-share-alt"></i>       <!-- Share -->
```

### Local SVG Icons

```html
<!-- Using local SVG icons -->
<img src="images/icons/star.svg" alt="Rating" style="width: 24px; height: 24px;">
<img src="images/icons/location.svg" alt="Location" style="width: 24px; height: 24px;">
<img src="images/icons/calendar.svg" alt="Calendar" style="width: 24px; height: 24px;">
<img src="images/icons/user.svg" alt="User" style="width: 24px; height: 24px;">
<img src="images/icons/plane.svg" alt="Travel" style="width: 24px; height: 24px;">
```

## Image File Locations

### JSON Data (`data/tours.json`)
```json
{
  "id": 1,
  "name": "Paris City Tour",
  "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=400&fit=crop"
}
```

### HTML Files
```html
<!-- index.html - Featured tours loaded via JavaScript -->
<img src="tour-image-url" class="card-img-top" alt="Tour Name">

<!-- about.html - Static image -->
<img src="https://images.unsplash.com/..." alt="Our Story" class="img-fluid rounded">
```

### JavaScript (`js/main.js`, `js/tours.js`)
```javascript
// Tours loaded from data/tours.json with image URLs
const tour = {
  image: "https://images.unsplash.com/..."
};

// Dynamic image rendering
`<img src="${tour.image}" alt="${tour.name}">`
```

## Unsplash API Credits

This website uses images from **Unsplash**, which are:
- ✅ Free to use
- ✅ Royalty-free
- ✅ No attribution required (but appreciated)
- ✅ High quality
- ✅ Fast CDN delivery

**Attribution (optional):**
```
Photo by [Photographer Name] on Unsplash
https://unsplash.com
```

## Performance Tips

1. **Use Responsive Images**
   ```html
   <img src="image.jpg" srcset="image-small.jpg 600w, image-large.jpg 1200w" alt="Description">
   ```

2. **Lazy Loading**
   ```html
   <img src="image.jpg" loading="lazy" alt="Description">
   ```

3. **Image Compression**
   - Use tools like TinyPNG, ImageOptim
   - Convert to WebP format for better compression

4. **Caching**
   - Browser caching headers
   - CDN caching (Unsplash handles this)

## Troubleshooting

### Images Not Loading
1. Check URL is correct (copy-paste from Unsplash)
2. Verify internet connection
3. Check browser console for errors
4. Test image URL directly in browser

### Images Distorted
1. Use `object-fit: cover` in CSS
2. Maintain proper aspect ratio
3. Use responsive image containers

### Slow Loading
1. Use smaller file sizes
2. Use CDN (Unsplash already does)
3. Enable gzip compression
4. Minimize image dimensions

## Image Dimensions Reference

| Purpose | Width | Height | Aspect Ratio |
|---------|-------|--------|--------------|
| Tour Card | 400px | 300px | 4:3 |
| Hero Banner | 1920px | 600px | 16:5 |
| About Section | 600px | 500px | 6:5 |
| Thumbnail | 200px | 150px | 4:3 |
| Icon | 100px | 100px | 1:1 |

---

**Last Updated**: May 2024
**Version**: 1.0
