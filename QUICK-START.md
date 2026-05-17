# Quick Start Guide - Tours & Travels

## Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Basic knowledge of HTML, CSS, JavaScript

### Option 1: Quick Start (No Installation)
1. Download or clone this project
2. Open `index.html` in your web browser
3. Website loads immediately - no installation required!

### Option 2: Local Development Server

#### Using Python
```bash
# Navigate to project directory
cd tours-and-travels

# Python 3.x
python -m http.server 8000

# Python 2.x  
python -m SimpleHTTPServer 8000

# Visit: http://localhost:8000
```

#### Using Node.js
```bash
# Install globally (one time)
npm install -g http-server

# Start server
http-server

# Visit: http://localhost:8080
```

#### Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Browser opens automatically at `http://localhost:5500`

---

## Project Structure

```
tours-and-travels/
├── index.html              # Home page
├── about.html              # About page
├── tours.html              # Tours listing
├── tour-details.html       # Tour details
├── booking.html            # Booking form
├── contact.html            # Contact page
├── .gitignore              # Git ignore rules
├── .htaccess               # Apache server config
├── package.json            # Project metadata
├── README.md               # Full documentation
├── DEPLOYMENT.md           # Deployment guide
├── QUICK-START.md          # This file
├── robots.txt              # SEO robots file
├── sitemap.xml             # Sitemap for SEO
├── css/
│   ├── style.css           # Main styles
│   └── responsive.css      # Mobile styles
├── js/
│   ├── main.js             # Core functionality
│   ├── utils.js            # Utility functions
│   ├── tours.js            # Tours page logic
│   └── booking.js          # Booking form logic
├── data/
│   └── tours.json          # Tour data
└── images/
    ├── hero/               # Hero images
    ├── icons/              # Icon images
    └── tours/              # Tour images
```

---

## Key Features

✅ **Fully Responsive** - Works on all devices  
✅ **No Backend Required** - Pure static site  
✅ **Fast Loading** - All data in JSON  
✅ **Search & Filter** - Find tours easily  
✅ **Booking System** - Complete booking form  
✅ **Contact Form** - Get in touch functionality  
✅ **Modern Design** - Bootstrap 5 based  
✅ **No Dependencies** - Works everywhere  

---

## Customization Guide

### 1. Change Colors
Edit `css/style.css`:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}
```

### 2. Add More Tours
Edit `data/tours.json` and add new tour object:
```json
{
    "id": 11,
    "name": "Tour Name",
    "location": "Location",
    "duration": "5 days",
    "price": 1200,
    "image": "https://image-url.jpg",
    "rating": 4.8,
    "reviews": 250,
    "description": "Tour description...",
    "itinerary": ["Day 1: ...", "Day 2: ..."],
    "included": ["Item 1", "Item 2"],
    "maxGroupSize": 30
}
```

### 3. Update Contact Information
Find and replace in all HTML files:
- `+1 (555) 123-4567` → Your phone
- `info@toursandtravels.com` → Your email  
- `123 Travel Street, Adventure City` → Your address

### 4. Change Website Title
Update in all HTML `<head>` sections:
```html
<title>Your Company Name - Subpage</title>
```

### 5. Update Business Name
Find and replace across all files:
- `Tours & Travels` → Your company name
- Logo and branding elements

---

## Configuration

### Edit Company Info
Update these files:
- `index.html` - Home page content
- `about.html` - Company info
- `contact.html` - Contact details

### Update Booking Settings
Edit `js/booking.js`:
```javascript
const TAX_RATE = 0.10; // Change tax rate here
```

### Change Pagination
Edit `js/tours.js`:
```javascript
const itemsPerPage = 6; // Tours per page
```

---

## Testing

### Manual Testing Checklist
- [ ] All links work correctly
- [ ] All forms submit properly
- [ ] Images load without errors
- [ ] Responsive design works on mobile
- [ ] Booking calculation is correct
- [ ] Search and filters work
- [ ] No console errors (F12 → Console)

### Browser Testing
Test in:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Mobile Testing
1. Open DevTools (F12)
2. Click device toggle (Ctrl+Shift+M)
3. Test all pages
4. Check touch interactions

---

## Deployment

### To GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/tours-and-travels
git push -u origin main
```

### To Netlify (Easiest)
1. Push code to GitHub
2. Go to netlify.com
3. Click "New site from Git"
4. Select repository
5. Deploy!

### To Traditional Hosting
1. Get FTP credentials from hosting provider
2. Upload files via FTP
3. Test website
4. Setup SSL certificate
5. Configure domain

See `DEPLOYMENT.md` for detailed instructions.

---

## Troubleshooting

### Website doesn't load
- Check file paths are correct
- Verify all files are uploaded
- Check browser console for errors (F12)

### Images not showing
- Verify image URLs are correct
- Check image files exist
- Try different image format

### Forms not working
- Check browser console for errors
- Verify form field IDs are correct
- Test in different browser

### Tours not loading
- Verify `data/tours.json` is valid JSON
- Check file path: should be `data/tours.json`
- Open DevTools Network tab to see if file loads

---

## Performance Tips

### Images
- Use compressed images (under 200KB each)
- Use JPEG for photos, PNG for graphics
- Consider WebP format for smaller files

### Code
- Minify CSS/JavaScript for production
- Remove unused code
- Lazy load images below fold

### Server
- Enable GZIP compression
- Set browser cache headers
- Use CDN for assets

### Monitoring
- Use Google PageSpeed Insights
- Monitor with Google Analytics
- Test with Lighthouse

---

## Support & Help

### Documentation
- `README.md` - Full documentation
- `DEPLOYMENT.md` - Deployment guide
- Inline code comments - See `js/` files

### Learning Resources
- [Bootstrap Docs](https://getbootstrap.com/docs/5.3/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [MDN Web Docs](https://developer.mozilla.org)
- [JavaScript.info](https://javascript.info)

---

## Next Steps

1. ✅ **Customize** - Update colors, content, images
2. ✅ **Test** - Test all functionality
3. ✅ **Deploy** - Upload to web host
4. ✅ **Promote** - Share with audience
5. ✅ **Maintain** - Keep content updated

---

## License

This project is licensed under the MIT License - feel free to use it for personal or commercial projects.

---

**Happy Developing! 🚀**

For more information, see `README.md` and `DEPLOYMENT.md`
