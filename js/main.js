/* ============================================
   MAIN JAVASCRIPT - Tours & Travels
   ============================================ */

// Store tours data globally
let allTours = [];

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Load tours data
    await loadToursData();

    // Set active nav link
    setActiveNavLink();

    // Load featured tours on home page
    const featuredContainer = document.getElementById('featuredToursContainer');
    if (featuredContainer) {
        displayFeaturedTours();
    }
});

/**
 * Load tours data from JSON file
 */
async function loadToursData() {
    try {
        const response = await fetch('data/tours.json');
        const data = await response.json();
        allTours = data.tours;
        console.log('Tours data loaded:', allTours.length, 'tours');
    } catch (error) {
        console.error('Error loading tours data:', error);
    }
}

/**
 * Display featured tours on home page
 */
function displayFeaturedTours() {
    const container = document.getElementById('featuredToursContainer');
    if (!container || allTours.length === 0) return;

    // Get first 3 tours as featured
    const featured = allTours.slice(0, 3);

    const toursHTML = featured.map(tour => `
        <div class="col-lg-4 col-md-6">
            <div class="card tour-card border-0 shadow-sm">
                <img src="${tour.image}" class="card-img-top" alt="${tour.name}" style="height: 250px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${tour.name}</h5>
                    <p class="card-text text-muted"><small>${tour.location} • ${tour.duration}</small></p>
                    <div class="mb-3">
                        ${generateStars(tour.rating)}
                        <span class="ms-2 small fw-bold">${tour.rating} (${tour.reviews})</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-primary">$${tour.price.toLocaleString()}</span>
                        <span class="badge bg-primary">Featured</span>
                    </div>
                    <a href="tour-details.html?id=${tour.id}" class="btn btn-outline-primary btn-sm w-100 mt-3">View Details</a>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = toursHTML;
}

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Add smooth scrolling to anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

/**
 * Mobile menu collapse on link click
 */
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbar = document.querySelector('.navbar-collapse');
        if (navbar.classList.contains('show')) {
            const toggler = document.querySelector('.navbar-toggler');
            toggler.click();
        }
    });
});

/**
 * Sticky navbar shadow on scroll
 */
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 10) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

/**
 * Form validation
 */
function enableFormValidation(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
}

// Enable form validation on all forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        if (!this.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.classList.add('was-validated');
    });
});

/**
 * Initialize Bootstrap tooltips and popovers
 */
document.addEventListener('DOMContentLoaded', () => {
    // Tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});

/**
 * Handle back button
 */
function goBack() {
    window.history.back();
}

/**
 * Check if tour exists
 */
function tourExists(tourId) {
    return allTours.some(tour => tour.id == tourId);
}

/**
 * Get tour by ID
 */
function getTourById(tourId) {
    return allTours.find(tour => tour.id == tourId);
}

/**
 * Get tours by location
 */
function getToursByLocation(location) {
    return allTours.filter(tour => tour.location === location);
}

/**
 * Get unique locations
 */
function getUniqueLocations() {
    return [...new Set(allTours.map(tour => tour.location))];
}

/**
 * Get unique durations
 */
function getUniqueDurations() {
    return [...new Set(allTours.map(tour => tour.duration))];
}

/**
 * Get maximum price
 */
function getMaxPrice() {
    return Math.max(...allTours.map(tour => tour.price));
}

/**
 * Get average rating
 */
function getAverageRating() {
    const total = allTours.reduce((sum, tour) => sum + tour.rating, 0);
    return (total / allTours.length).toFixed(1);
}

/**
 * Log analytics
 */
function logPageView() {
    const pageData = {
        page: window.location.pathname,
        title: document.title,
        timestamp: new Date().toISOString()
    };
    console.log('Page view:', pageData);
    // In production, send to analytics service
}

// Log page view on load
document.addEventListener('DOMContentLoaded', logPageView);

/**
 * Handle 404 errors
 */
window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
});

/**
 * Prevent form double submission
 */
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function () {
        const buttons = this.querySelectorAll('button[type="submit"]');
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
        });
    });
});

/**
 * Add keyboard shortcuts
 */
document.addEventListener('keydown', (event) => {
    // Ctrl/Cmd + F to focus search
    if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            event.preventDefault();
            searchInput.focus();
        }
    }

    // Escape to close dropdowns
    if (event.key === 'Escape') {
        const dropdowns = document.querySelectorAll('.dropdown-menu.show');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }
});

/**
 * Handle online/offline status
 */
window.addEventListener('online', () => {
    showToast('You are back online!', 'success');
});

window.addEventListener('offline', () => {
    showToast('You are offline. Some features may not work.', 'warning');
});

/**
 * Initialize on page load
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Tours & Travels website initialized');
    });
} else {
    console.log('Tours & Travels website initialized');
}
