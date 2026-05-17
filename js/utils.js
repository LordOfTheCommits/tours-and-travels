/* ============================================
   UTILITY FUNCTIONS - Tours & Travels
   ============================================ */

/**
 * Currency Formatter
 * Formats number to currency string
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

/**
 * Date Formatter
 * Formats date to readable format
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

/**
 * Generate Star Rating HTML
 * Creates star rating display
 */
function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += `<i class="fas fa-star ${i < Math.floor(rating) ? 'text-warning' : 'text-light'}"></i>`;
    }
    return stars;
}

/**
 * Filter Array by Multiple Properties
 * Filters tours based on multiple criteria
 */
function filterTours(tours, filters) {
    return tours.filter(tour => {
        const matchesLocation = !filters.location || tour.location.toLowerCase().includes(filters.location.toLowerCase());
        const matchesPrice = !filters.maxPrice || tour.price <= filters.maxPrice;
        const matchesDuration = !filters.duration || tour.duration.includes(filters.duration);
        const matchesSearch = !filters.search ||
            tour.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            tour.location.toLowerCase().includes(filters.search.toLowerCase());

        return matchesLocation && matchesPrice && matchesDuration && matchesSearch;
    });
}

/**
 * Validate Email
 * Simple email validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate Phone Number
 * Accepts various phone number formats
 */
function isValidPhone(phone) {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Debounce Function
 * Prevents function from firing too frequently
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Local Storage Manager
 * Safely manages localStorage operations
 */
const StorageManager = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    },

    get: (key, defaultValue = null) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error('Storage error:', error);
            return defaultValue;
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    },

    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }
};

/**
 * Show Toast Notification
 * Displays temporary notification
 */
function showToast(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

/**
 * Get URL Query Parameters
 * Extracts query parameters from URL
 */
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');

    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });

    return params;
}

/**
 * Pagination Helper
 * Creates pagination array
 */
function getPaginationArray(currentPage, totalPages, maxButtons = 5) {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
        startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return pages;
}

/**
 * Calculate Days Between Dates
 * Returns number of days between two dates
 */
function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((new Date(date1) - new Date(date2)) / oneDay));
}

/**
 * Sort Array by Property
 * Sorts array by specified property
 */
function sortBy(array, property, order = 'asc') {
    return [...array].sort((a, b) => {
        if (order === 'asc') {
            return a[property] > b[property] ? 1 : a[property] < b[property] ? -1 : 0;
        } else {
            return a[property] < b[property] ? 1 : a[property] > b[property] ? -1 : 0;
        }
    });
}

/**
 * Group Array by Property
 * Groups array items by specified property
 */
function groupBy(array, property) {
    return array.reduce((grouped, item) => {
        const key = item[property];
        grouped[key] = grouped[key] || [];
        grouped[key].push(item);
        return grouped;
    }, {});
}

/**
 * Unique Array Values
 * Returns array with duplicate values removed
 */
function getUnique(array, property) {
    return [...new Set(array.map(item => item[property]))];
}

/**
 * Calculate Discount
 * Returns discounted price
 */
function calculateDiscount(originalPrice, discountPercent) {
    return originalPrice - (originalPrice * discountPercent / 100);
}

/**
 * Format Time Duration
 * Converts hours to readable format
 */
function formatDuration(days) {
    if (days < 1) {
        const hours = Math.floor(days * 24);
        return `${hours} hours`;
    }
    return `${days} days`;
}

/**
 * Check if Email Already Exists
 * Checks for duplicate emails in array
 */
function emailExists(email, emailArray) {
    return emailArray.some(e => e.toLowerCase() === email.toLowerCase());
}

/**
 * Fade In Animation
 * Animates element fade in
 */
function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    element.style.transition = `opacity ${duration}ms ease`;

    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
}

/**
 * Fade Out Animation
 * Animates element fade out
 */
function fadeOut(element, duration = 300) {
    element.style.opacity = '1';
    element.style.transition = `opacity ${duration}ms ease`;

    element.style.opacity = '0';
    setTimeout(() => {
        element.style.display = 'none';
    }, duration);
}

/**
 * Scroll To Element
 * Smoothly scrolls to specified element
 */
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Generate Random ID
 * Creates unique random identifier
 */
function generateId() {
    return 'id_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Check if Device is Mobile
 * Returns true if device is mobile
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Copy to Clipboard
 * Copies text to clipboard
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Copy failed:', err);
        showToast('Failed to copy', 'danger');
    });
}
