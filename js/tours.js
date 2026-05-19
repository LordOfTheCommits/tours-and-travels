/* ============================================
   TOURS PAGE JAVASCRIPT - Tours & Travels
   ============================================ */

const itemsPerPage = 6;
let currentPage = 1;
let filteredTours = [];

/**
 * Initialize tours page
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Wait for tours data to be loaded
    await waitForToursData();

    populateFilters();
    updatePriceDisplay();
    displayTours();
    setupFilterListeners();
});

/**
 * Wait for tours data to be available
 */
function waitForToursData() {
    return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            if (typeof allTours !== 'undefined' && allTours.length > 0) {
                clearInterval(checkInterval);
                resolve();
            }
        }, 100);

        // Timeout after 5 seconds
        setTimeout(() => {
            clearInterval(checkInterval);
            resolve();
        }, 5000);
    });
}

/**
 * Populate filter dropdowns with unique values
 */
function populateFilters() {
    // Populate location filter with all unique tour locations from the data
    const locations = getUniqueLocations();
    const locationSelect = document.getElementById('locationFilter');

    // Sort locations alphabetically
    const sortedLocations = locations.sort();

    sortedLocations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationSelect.appendChild(option);
    });

    // Populate duration filter
    const durations = getUniqueDurations();
    const durationSelect = document.getElementById('durationFilter');
    durations.forEach(duration => {
        const option = document.createElement('option');
        option.value = duration;
        option.textContent = duration;
        durationSelect.appendChild(option);
    });
}

/**
 * Setup filter event listeners
 */
function setupFilterListeners() {
    const searchInput = document.getElementById('searchInput');
    const locationFilter = document.getElementById('locationFilter');
    const priceFilter = document.getElementById('priceFilter');
    const durationFilter = document.getElementById('durationFilter');
    const resetBtn = document.getElementById('resetFilters');

    // Debounced search
    searchInput.addEventListener('input', debounce(() => {
        currentPage = 1;
        displayTours();
    }, 300));

    // Filter changes
    locationFilter.addEventListener('change', () => {
        currentPage = 1;
        displayTours();
    });

    priceFilter.addEventListener('change', () => {
        updatePriceDisplay();
        currentPage = 1;
        displayTours();
    });

    durationFilter.addEventListener('change', () => {
        currentPage = 1;
        displayTours();
    });

    // Reset filters
    resetBtn.addEventListener('click', resetFilters);
}

/**
 * Update price display as slider changes
 */
function updatePriceDisplay() {
    const maxPrice = document.getElementById('priceFilter').value;
    document.getElementById('priceValue').textContent = `₹0 - ₹${parseInt(maxPrice).toLocaleString()}`;
}

/**
 * Get current filter values
 */
function getFilterValues() {
    return {
        search: document.getElementById('searchInput').value,
        location: document.getElementById('locationFilter').value,
        maxPrice: parseInt(document.getElementById('priceFilter').value),
        duration: document.getElementById('durationFilter').value
    };
}

/**
 * Filter tours based on current filter values
 */
function applyFilters() {
    const filters = getFilterValues();
    filteredTours = filterTours(allTours, filters);
    return filteredTours;
}

/**
 * Display tours with pagination
 */
function displayTours() {
    applyFilters();

    const container = document.getElementById('toursContainer');
    const noResults = document.getElementById('noResults');
    const paginationContainer = document.getElementById('paginationContainer');

    if (filteredTours.length === 0) {
        container.innerHTML = '';
        noResults.style.display = 'block';
        paginationContainer.style.display = 'none';
        return;
    }

    noResults.style.display = 'none';

    // Calculate pagination
    const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const toursToDisplay = filteredTours.slice(startIndex, endIndex);

    // Create tour cards
    const toursHTML = toursToDisplay.map(tour => `
        <div class="col-lg-4 col-md-6">
            <div class="card tour-card border-0 shadow-sm">
                <div class="position-relative overflow-hidden" style="height: 250px;">
                    <img src="${tour.image}" class="card-img-top w-100 h-100" alt="${tour.name}" style="object-fit: cover;">
                    <div class="position-absolute top-0 end-0 m-3">
                        <span class="badge bg-danger">${tour.id % 2 === 0 ? 'Special' : 'Hot'}</span>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title fw-bold">${tour.name}</h5>
                    <p class="card-text text-muted small mb-3">
                        <i class="fas fa-map-marker-alt me-1"></i>${tour.location}
                    </p>
                    
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="tour-rating">
                            ${generateStars(tour.rating)}
                            <span class="ms-2 small fw-bold">${tour.rating}</span>
                        </div>
                        <span class="badge bg-secondary">${tour.reviews} reviews</span>
                    </div>
                    
                    <div class="tour-details mb-3">
                        <small class="text-muted d-block mb-1">
                            <i class="fas fa-calendar me-1"></i>Duration: ${tour.duration}
                        </small>
                        <small class="text-muted d-block">
                            <i class="fas fa-users me-1"></i>Group size: up to ${tour.maxGroupSize}
                        </small>
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-primary fs-5">₹${tour.price.toLocaleString('en-IN')}</span>
                        <span class="text-muted small">per person</span>
                    </div>
                    
                    <div class="d-grid gap-2 mt-3">
                        <a href="tour-details.html?id=${tour.id}" class="btn btn-primary btn-sm">View Details</a>
                        <a href="booking.html?tour=${tour.id}" class="btn btn-outline-primary btn-sm">Book Now</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = toursHTML;

    // Display pagination
    if (totalPages > 1) {
        displayPagination(totalPages);
        paginationContainer.style.display = 'block';
    } else {
        paginationContainer.style.display = 'none';
    }
}

/**
 * Display pagination buttons
 */
function displayPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const pages = getPaginationArray(currentPage, totalPages);

    // Previous button
    const prevBtn = document.createElement('li');
    prevBtn.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${Math.max(1, currentPage - 1)}); return false;">Previous</a>`;
    pagination.appendChild(prevBtn);

    // Page numbers
    pages.forEach(page => {
        const li = document.createElement('li');
        li.className = `page-item ${page === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${page}); return false;">${page}</a>`;
        pagination.appendChild(li);
    });

    // Next button
    const nextBtn = document.createElement('li');
    nextBtn.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextBtn.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${Math.min(totalPages, currentPage + 1)}); return false;">Next</a>`;
    pagination.appendChild(nextBtn);
}

/**
 * Go to specific page
 */
function goToPage(page) {
    currentPage = page;
    displayTours();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Reset all filters
 */
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('locationFilter').value = '';
    document.getElementById('priceFilter').value = '50000';
    document.getElementById('durationFilter').value = '';
    document.getElementById('priceValue').textContent = '₹0 - ₹50,000';

    currentPage = 1;
    displayTours();
    showToast('Filters reset', 'info');
}

/**
 * Sort tours by price (low to high)
 */
function sortByPriceLow() {
    filteredTours = sortBy(filteredTours, 'price', 'asc');
    currentPage = 1;
    displayTours();
}

/**
 * Sort tours by price (high to low)
 */
function sortByPriceHigh() {
    filteredTours = sortBy(filteredTours, 'price', 'desc');
    currentPage = 1;
    displayTours();
}

/**
 * Sort tours by rating
 */
function sortByRating() {
    filteredTours = sortBy(filteredTours, 'rating', 'desc');
    currentPage = 1;
    displayTours();
}

/**
 * Sort tours by popularity (reviews count)
 */
function sortByPopularity() {
    filteredTours = sortBy(filteredTours, 'reviews', 'desc');
    currentPage = 1;
    displayTours();
}

/**
 * Toggle view between grid and list
 */
function toggleView(view) {
    const container = document.getElementById('toursContainer');

    if (view === 'grid') {
        container.className = 'row g-4';
        container.querySelectorAll('.col-lg-4').forEach(col => {
            col.className = 'col-lg-4 col-md-6';
        });
    } else if (view === 'list') {
        container.className = 'row g-2';
        container.querySelectorAll('.col-lg-4').forEach(col => {
            col.className = 'col-12';
        });
    }
}

/**
 * Export filtered tours as JSON
 */
function exportToJSON() {
    const dataStr = JSON.stringify(filteredTours, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'filtered-tours.json';
    link.click();
    URL.revokeObjectURL(url);
}

/**
 * Print tour list
 */
function printTours() {
    window.print();
}

/**
 * Handle hero search button click
 */
document.addEventListener('DOMContentLoaded', () => {
    const heroSearchBtn = document.getElementById('heroSearchBtn');
    if (heroSearchBtn) {
        heroSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                currentPage = 1;
                displayTours();
            }
        });
    }

    // Handle reset filters from empty state
    const resetFromEmptyBtn = document.getElementById('resetFiltersFromEmpty');
    if (resetFromEmptyBtn) {
        resetFromEmptyBtn.addEventListener('click', () => {
            resetFilters();
        });
    }
});
