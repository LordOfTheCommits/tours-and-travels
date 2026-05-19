/* ============================================
   BOOKING PAGE JAVASCRIPT - Tours & Travels
   ============================================ */

const TAX_RATE = 0.10; // 10% tax
let selectedTour = null;
let selectedTourPrice = 0;
let pendingBookingData = null;

/**
 * Initialize booking page
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Wait for tours data to be loaded from main.js
    await waitForToursData();

    // Now initialize booking page
    populateTourSelect();
    setupBookingForm();
    checkForPreSelectedTour();

    // Initialize date picker
    const today = new Date().toISOString().split('T')[0];
    const tourDateInput = document.getElementById('tourDate');
    if (tourDateInput) {
        tourDateInput.setAttribute('min', today);
        tourDateInput.addEventListener('change', updateBookingSummary);
    }

    // Update summary initially
    updateBookingSummary();

    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener('click', (event) => {
            event.preventDefault();
            completeBookingPayment();
        });
    }

    const copyModalBtn = document.getElementById('copyUpiModalBtn');
    if (copyModalBtn) {
        copyModalBtn.addEventListener('click', () => {
            const upiId = '9903773940';
            if (!navigator.clipboard) {
                alert('Clipboard access is not supported. Please copy the UPI ID manually: ' + upiId);
                return;
            }
            navigator.clipboard.writeText(upiId).then(() => {
                copyModalBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyModalBtn.textContent = 'Copy UPI ID';
                }, 1800);
            }).catch(() => {
                alert('Unable to copy UPI ID. Please copy it manually: ' + upiId);
            });
        });
    }

    const paymentModalEl = document.getElementById('bookingPaymentModal');
    if (paymentModalEl) {
        paymentModalEl.addEventListener('show.bs.modal', () => {
            if (pendingBookingData) {
                populateBookingPaymentModal(pendingBookingData);
            }
        });
    }
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
 * Populate tour selection dropdown
 */
function populateTourSelect() {
    const tourSelect = document.getElementById('tourSelect');

    // Clear existing options except the first one
    while (tourSelect.options.length > 1) {
        tourSelect.remove(1);
    }

    // Check if allTours is available
    if (typeof allTours === 'undefined' || allTours.length === 0) {
        console.error('Tours data not available');
        tourSelect.innerHTML = '<option value="">Unable to load tours. Please refresh the page.</option>';
        return;
    }

    allTours.forEach(tour => {
        const option = document.createElement('option');
        option.value = tour.id;
        option.textContent = `${tour.name} (${tour.location}) - ₹${tour.price.toLocaleString('en-IN')}`;
        option.dataset.price = tour.price;
        tourSelect.appendChild(option);
    });

    // Tour selection change listener
    tourSelect.addEventListener('change', () => {
        if (tourSelect.selectedIndex > 0) {
            selectedTourPrice = parseInt(tourSelect.options[tourSelect.selectedIndex].dataset.price);
        }
        updateBookingSummary();
    });
}

/**
 * Setup booking form listeners
 */
function setupBookingForm() {
    const numTravelers = document.getElementById('numTravelers');
    const form = document.getElementById('bookingForm');

    // Update passenger name fields when number changes
    numTravelers.addEventListener('change', () => {
        generatePassengerFields();
        updateBookingSummary();
    });

    // Update summary when travelers input value changes (for arrow keys)
    numTravelers.addEventListener('input', () => {
        updateBookingSummary();
    });

    // Form submission
    form.addEventListener('submit', handleBookingSubmit);

    // Initialize passenger fields
    generatePassengerFields();
    updateBookingSummary();
}

/**
 * Generate passenger name input fields
 */
function generatePassengerFields() {
    const numTravelers = parseInt(document.getElementById('numTravelers').value);
    const container = document.getElementById('passengerNames');
    container.innerHTML = '';

    if (numTravelers > 1) {
        const heading = document.createElement('h6');
        heading.className = 'fw-bold mt-3 mb-3';
        heading.textContent = 'Passenger Details';
        container.appendChild(heading);

        for (let i = 1; i < numTravelers; i++) {
            const row = document.createElement('div');
            row.className = 'row g-2 mb-3';
            row.innerHTML = `
                <div class="col-md-6">
                    <label for="passengerFirstName${i}" class="form-label small">Passenger ${i + 1} - First Name</label>
                    <input type="text" class="form-control form-control-sm" id="passengerFirstName${i}" placeholder="First Name">
                </div>
                <div class="col-md-6">
                    <label for="passengerLastName${i}" class="form-label small">Passenger ${i + 1} - Last Name</label>
                    <input type="text" class="form-control form-control-sm" id="passengerLastName${i}" placeholder="Last Name">
                </div>
            `;
            container.appendChild(row);
        }
    }
}

/**
 * Check if a tour was pre-selected via URL parameter
 */
function checkForPreSelectedTour() {
    const params = getQueryParams();
    if (params.tour) {
        const tourSelect = document.getElementById('tourSelect');
        tourSelect.value = params.tour;
        tourSelect.dispatchEvent(new Event('change'));
    }
}

/**
 * Update booking summary with current selections
 */
function updateBookingSummary() {
    const tourId = document.getElementById('tourSelect').value;
    const numTravelers = parseInt(document.getElementById('numTravelers').value);

    if (!tourId) {
        document.getElementById('bookingSummary').innerHTML = '<p class="text-muted">Select a tour to see pricing</p>';
        return;
    }

    const tour = getTourById(tourId);
    if (!tour) return;

    const subtotal = tour.price * numTravelers;
    const taxes = subtotal * TAX_RATE;
    const total = subtotal + taxes;

    const summaryHTML = `
        <p class="mb-2"><strong>${tour.name}</strong></p>
        <p class="text-muted small mb-3">${tour.location} • ${tour.duration}</p>
        
        <div class="tour-details mb-3 pb-3 border-bottom">
            <p class="mb-1"><small class="text-muted">Tour Price: ₹${tour.price.toLocaleString('en-IN')}</small></p>
            <p class="mb-1"><small class="text-muted">Number of Travelers: ${numTravelers}</small></p>
            ${document.getElementById('tourDate').value ? `
                <p class="mb-0"><small class="text-muted">Travel Date: ${formatDate(document.getElementById('tourDate').value)}</small></p>
            ` : ''}
        </div>
    `;

    document.getElementById('bookingSummary').innerHTML = summaryHTML;

    // Update total
    document.getElementById('subtotal').textContent = subtotal.toLocaleString();
    document.getElementById('taxes').textContent = Math.round(taxes).toLocaleString();
    document.getElementById('totalPrice').textContent = Math.round(total).toLocaleString();
}

/**
 * Validate phone number format
 */
function validatePhone(phone) {
    return isValidPhone(phone);
}

/**
 * Collect booking form data
 */
function getBookingData() {
    const tourId = document.getElementById('tourSelect').value;
    const tour = getTourById(tourId);

    if (!tour) return null;

    const numTravelers = parseInt(document.getElementById('numTravelers').value);
    const passengers = [];

    // Primary passenger
    passengers.push({
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        isPrimary: true
    });

    // Additional passengers
    for (let i = 1; i < numTravelers; i++) {
        const firstName = document.getElementById(`passengerFirstName${i}`).value.trim();
        const lastName = document.getElementById(`passengerLastName${i}`).value.trim();

        // Only add passenger if both names are provided
        if (firstName && lastName) {
            passengers.push({
                firstName: firstName,
                lastName: lastName,
                isPrimary: false
            });
        }
    }

    const subtotal = tour.price * numTravelers;
    const taxes = Math.round(subtotal * TAX_RATE);

    return {
        tour: tour,
        tourDate: document.getElementById('tourDate').value,
        numTravelers: numTravelers,
        passengers: passengers,
        specialRequests: document.getElementById('specialRequests').value,
        subtotal: subtotal,
        taxes: taxes,
        total: subtotal + taxes,
        bookingId: generateId(),
        bookingDate: new Date().toISOString()
    };
}

/**
 * Validate booking form
 */
function validateBookingForm() {
    const form = document.getElementById('bookingForm');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    // Trim email and phone values before validation
    emailInput.value = emailInput.value.trim();
    phoneInput.value = phoneInput.value.trim();

    // Check form validity
    if (!form.checkValidity()) {
        return false;
    }

    // Validate email
    const email = emailInput.value;
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'danger');
        return false;
    }

    // Validate phone
    const phone = document.getElementById('phone').value;
    if (!validatePhone(phone)) {
        showToast('Please enter a valid phone number', 'danger');
        return false;
    }

    // Validate tour is selected
    if (!document.getElementById('tourSelect').value) {
        showToast('Please select a tour', 'danger');
        return false;
    }

    // Validate date is selected
    if (!document.getElementById('tourDate').value) {
        showToast('Please select a travel date', 'danger');
        return false;
    }

    // Validate all passengers have names
    const numTravelers = parseInt(document.getElementById('numTravelers').value);
    for (let i = 1; i < numTravelers; i++) {
        const firstName = document.getElementById(`passengerFirstName${i}`).value;
        const lastName = document.getElementById(`passengerLastName${i}`).value;

        if (!firstName || !lastName) {
            showToast(`Please enter full name for passenger ${i + 1}`, 'danger');
            return false;
        }
    }

    return true;
}

/**
 * Handle booking form submission
 */
function handleBookingSubmit(e) {
    e.preventDefault();

    if (!validateBookingForm()) {
        return;
    }

    const bookingData = getBookingData();

    if (!bookingData) {
        showToast('Unable to create booking. Please try again.', 'danger');
        return;
    }

    // Store booking in localStorage
    StorageManager.set('currentBooking', bookingData);

    // Open payment modal with UPI QR and booking details
    pendingBookingData = bookingData;
    openBookingPaymentModal(bookingData);

    // Log booking
    console.log('Booking created:', bookingData);
}

/**
 * Open the payment modal and populate booking details
 */
function openBookingPaymentModal(bookingData) {
    pendingBookingData = bookingData;
    populateBookingPaymentModal(bookingData);
    const bookingModalEl = document.getElementById('bookingPaymentModal');
    if (!bookingModalEl) return;
    const modal = bootstrap.Modal.getOrCreateInstance(bookingModalEl);
    modal.show();
}

/**
 * Populate booking payment modal content
 */
function populateBookingPaymentModal(bookingData) {
    document.getElementById('bookingModalTourNamePayment').textContent = bookingData.tour.name;
    document.getElementById('bookingModalTourInfoPayment').textContent = `${bookingData.tour.location} • ${bookingData.tour.duration}`;
    document.getElementById('bookingModalOrderId').textContent = bookingData.bookingId;
    document.getElementById('bookingModalDate').textContent = formatDate(bookingData.bookingDate);
    document.getElementById('bookingModalPassengersPayment').textContent = bookingData.numTravelers;
    document.getElementById('bookingModalAmountPayment').textContent = '₹1.00';
    document.getElementById('bookingModalTotal').textContent = '₹1.00';
    document.getElementById('bookingModalSpecialRequests').textContent = bookingData.specialRequests || 'None';
    document.getElementById('bookingModalTourNameReceipt').textContent = bookingData.tour.name;
    document.getElementById('bookingModalTourInfoReceipt').textContent = `${bookingData.tour.location} • ${bookingData.tour.duration}`;
    document.getElementById('bookingModalPassengersReceipt').textContent = bookingData.numTravelers;
    document.getElementById('bookingModalTotal').textContent = '₹1.00';

    const paymentStep = document.getElementById('bookingPaymentStep');
    const receiptStep = document.getElementById('bookingReceiptStep');
    if (paymentStep && receiptStep) {
        paymentStep.classList.remove('d-none');
        receiptStep.classList.add('d-none');
    }
    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
    if (confirmPaymentBtn) {
        confirmPaymentBtn.textContent = 'I Paid ₹1';
        confirmPaymentBtn.disabled = false;
    }
}

/**
 * Switch payment modal to receipt view after payment
 */
function completeBookingPayment() {
    if (!pendingBookingData) {
        showToast('Please complete your booking details first.', 'danger');
        return;
    }

    const paymentStep = document.getElementById('bookingPaymentStep');
    const receiptStep = document.getElementById('bookingReceiptStep');
    if (paymentStep && receiptStep) {
        paymentStep.classList.add('d-none');
        receiptStep.classList.remove('d-none');
    }
    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
    if (confirmPaymentBtn) {
        confirmPaymentBtn.textContent = 'Payment Confirmed';
        confirmPaymentBtn.disabled = true;
    }
}


/**
 * Show booking confirmation
 */
function showBookingConfirmation(bookingData) {
    const form = document.getElementById('bookingForm');

    const confirmHTML = `
        <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Booking Confirmation!</h4>
            <hr>
            <p><strong>Booking ID:</strong> ${bookingData.bookingId}</p>
            <p><strong>Tour:</strong> ${bookingData.tour.name}</p>
            <p><strong>Date:</strong> ${formatDate(bookingData.tourDate)}</p>
            <p><strong>Travelers:</strong> ${bookingData.numTravelers}</p>
            <p class="mb-0"><strong>Total Amount:</strong> ₹${bookingData.total.toLocaleString('en-IN')}</p>
            <hr>
            <p class="mb-0">A confirmation email has been sent to <strong>${bookingData.passengers[0].email}</strong></p>
            <p class="mb-0">Please proceed to payment to complete your booking.</p>
        </div>
        <div class="text-center mt-4">
            <button class="btn btn-primary btn-lg me-2" onclick="window.location.href='tours.html'">Continue Shopping</button>
            <button class="btn btn-secondary btn-lg" onclick="downloadConfirmation('${bookingData.bookingId}')">Download Confirmation</button>
        </div>
    `;

    form.innerHTML = confirmHTML;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Download booking confirmation as PDF (simulated)
 */
function downloadConfirmation(bookingId) {
    const booking = StorageManager.get('currentBooking');
    if (!booking) return;

    let content = `TOURS & TRAVELS - BOOKING CONFIRMATION\n`;
    content += `=====================================\n\n`;
    content += `Booking ID: ${booking.bookingId}\n`;
    content += `Booking Date: ${formatDate(booking.bookingDate)}\n\n`;
    content += `TOUR DETAILS\n`;
    content += `-----------------------------------\n`;
    content += `Tour Name: ${booking.tour.name}\n`;
    content += `Location: ${booking.tour.location}\n`;
    content += `Duration: ${booking.tour.duration}\n`;
    content += `Travel Date: ${formatDate(booking.tourDate)}\n\n`;
    content += `TRAVELER DETAILS\n`;
    content += `-----------------------------------\n`;
    booking.passengers.forEach((p, i) => {
        content += `${i === 0 ? 'Primary ' : ''}Passenger ${i + 1}: ${p.firstName} ${p.lastName}\n`;
    });
    content += `\nTotal Travelers: ${booking.numTravelers}\n\n`;
    content += `PRICING BREAKDOWN\n`;
    content += `-----------------------------------\n`;
    content += `Subtotal: $${booking.subtotal.toLocaleString()}\n`;
    content += `Taxes & Fees: $${booking.taxes.toLocaleString()}\n`;
    content += `TOTAL: $${booking.total.toLocaleString()}\n\n`;
    content += `Special Requests:\n${booking.specialRequests || 'None'}\n\n`;
    content += `Thank you for booking with Tours & Travels!\n`;

    // Create download
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `booking-${booking.bookingId}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showToast('Confirmation downloaded', 'success');
}

/**
 * Clear booking data
 */
function clearBooking() {
    StorageManager.remove('currentBooking');
    document.getElementById('bookingForm').reset();
    document.getElementById('bookingSummary').innerHTML = '<p class="text-muted">Select a tour to see pricing</p>';
}

/**
 * Validate date - cannot select past dates
 */
function initializeDateInput() {
    const today = new Date().toISOString().split('T')[0];
    const tourDateInput = document.getElementById('tourDate');
    if (tourDateInput) {
        tourDateInput.setAttribute('min', today);
        tourDateInput.addEventListener('change', updateBookingSummary);
    }
}
