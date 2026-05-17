# Tours & Travels Website

A modern, responsive tours and travels booking website built with HTML5, CSS3, Bootstrap 5, and Vanilla JavaScript.

## 📁 Project Structure

```
tours-and-travels/
├── index.html              # Home page with hero section and featured tours
├── about.html              # About page with company info and mission
├── tours.html              # Tours catalog with filters and search
├── tour-details.html       # Individual tour details page
├── booking.html            # Booking form for reservations
├── contact.html            # Contact form and location
├── css/
│   ├── style.css          # Main stylesheet with custom components
│   └── responsive.css     # Media queries for all device sizes
├── js/
│   ├── main.js            # Core functionality and navbar logic
│   ├── utils.js           # Utility functions (formatting, filtering, etc)
│   ├── tours.js           # Tours page filtering and pagination
│   └── booking.js         # Booking form validation and submission
├── data/
│   └── tours.json         # Tour packages database (10 sample tours)
└── README.md              # This file
```

## ✨ Features

### Pages
- **Home Page** - Hero section, featured tours, testimonials, call-to-action
- **About Page** - Company story, mission, vision, why choose us, statistics
- **Tours Catalog** - Browse all tours with advanced filtering and search
- **Tour Details** - Full tour information, itinerary, reviews, booking button
- **Booking Form** - Multi-passenger booking with validation and calculation
- **Contact Page** - Contact form, embedded map, location information

### Core Features
- 📱 **Fully Responsive** - Works on mobile (320px), tablet (768px), and desktop (1920px)
- 🔍 **Advanced Search** - Search by tour name or location
- 🎯 **Smart Filters** - Filter by location, price range, and duration
- 💰 **Dynamic Pricing** - Real-time price calculation with taxes
- ✅ **Form Validation** - Client-side validation for all forms
- 📊 **Pagination** - Browse tours across multiple pages
- 🎨 **Modern Design** - Clean, minimalist UI with smooth animations
- ⚡ **Fast Loading** - Optimized assets and efficient code
- 🔐 **Data Security** - Form validation and secure handling

## 🚀 Quick Start

### 1. Open Website
Simply open `index.html` in your web browser. No server or installation required!

```bash
# On Windows:
start index.html

# On macOS:
open index.html

# On Linux:
xdg-open index.html
```

### 2. Using Live Server (Recommended)
If you have VS Code with Live Server extension:
1. Right-click on `index.html`
2. Select "Open with Live Server"
3. Automatically opens at `http://localhost:5500`

### 3. Using Python Server
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```
Then visit `http://localhost:8000`

## 📦 Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with Flexbox and Grid
- **Bootstrap 5** - Responsive grid system and components
- **JavaScript (Vanilla)** - No frameworks, pure JS
- **Font Awesome** - Icon library for UI elements
- **Google Fonts** - Typography via CDN

## 🎨 Design System

### Color Palette
- **Primary**: `#0d6efd` (Bootstrap Blue)
- **Secondary**: `#6c757d` (Gray)
- **Success**: `#198754` (Green)
- **Warning**: `#ffc107` (Yellow)
- **Danger**: `#dc3545` (Red)
- **Text Dark**: `#2c3e50`
- **Text Muted**: `#7f8c8d`
- **Background**: `#ffffff` and `#f8f9fa`

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, sans-serif
- **Headings**: Font Weight 600 (Bold)
- **Body**: Font Weight 400 (Regular)
- **Line Height**: 1.6

## 📋 Sample Data

The website includes 10 sample tour packages:
1. Paris City Tour (France) - $1,200 / 5 days
2. Tokyo Adventure (Japan) - $1,850 / 7 days
3. Bali Beach Escape (Indonesia) - $950 / 6 days
4. New York Metropolis (USA) - $1,100 / 4 days
5. Swiss Alps Explorer (Switzerland) - $2,100 / 8 days
6. Dubai Luxury Experience (UAE) - $1,650 / 5 days
7. Barcelona Mediterranean (Spain) - $890 / 4 days
8. London Heritage Tour (UK) - $1,050 / 5 days
9. Greece Island Hopping (Greece) - $1,450 / 7 days
10. Thailand Cultural Journey (Thailand) - $850 / 6 days

## 🔧 How to Customize

### Add More Tours
Edit `data/tours.json` and add tour objects:
```json
{
  "id": 11,
  "name": "Your Tour Name",
  "location": "Location",
  "duration": "X days",
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

### Change Color Scheme
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* ... other colors ... */
}
```

### Update Contact Information
Update footer and contact page with your details in HTML files.

### Add Your Logo
Replace placeholder logo in navbar with your image:
```html
<a class="navbar-brand fw-bold" href="index.html">
    <img src="path/to/your/logo.png" alt="Logo" height="40">
</a>
```

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 575px (max-width: 480px)
- **Tablet**: 576px - 991px (max-width: 768px)
- **Desktop**: 992px - 1199px (max-width: 1199px)
- **Large Desktop**: 1200px+ (max-width: none)

## ✅ Testing Checklist

- [ ] Test all navigation links work
- [ ] Test responsive design on mobile (DevTools: 375px width)
- [ ] Test responsive design on tablet (DevTools: 768px width)
- [ ] Test filter functionality on tours page
- [ ] Test search functionality
- [ ] Test booking form validation
- [ ] Test contact form
- [ ] Test smooth scrolling
- [ ] Test keyboard navigation
- [ ] Test in different browsers (Chrome, Firefox, Safari, Edge)

## 🔗 External Resources

- **Bootstrap 5**: https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css
- **Font Awesome Icons**: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css
- **Placeholder Images**: https://via.placeholder.com

## 📝 Notes

- All data is stored locally in `data/tours.json`
- No backend server is required
- Booking data is stored in browser's localStorage
- Forms do not send emails by default (can be integrated with services like EmailJS or FormSubmit)
- Images use placeholder URLs (replace with your own images)

## 🚀 Next Steps / Future Enhancements

1. **Backend Integration** - Connect to a server for persistent data storage
2. **Payment Integration** - Add Stripe, PayPal, or other payment processors
3. **Email Notifications** - Integrate EmailJS or SendGrid for confirmations
4. **User Accounts** - Add login/registration system
5. **Reviews & Ratings** - Allow users to leave reviews
6. **Wishlist Feature** - Save favorite tours
7. **Admin Dashboard** - Manage tours and bookings
8. **Multi-language Support** - Add translations for different languages
9. **SEO Optimization** - Improve search engine visibility
10. **Analytics** - Track user behavior with Google Analytics

## 📄 License

This project is free to use for personal and commercial purposes.

## 👨‍💻 Author

Created with ❤️ for travel enthusiasts

---

**Last Updated**: May 2026
**Version**: 1.0
