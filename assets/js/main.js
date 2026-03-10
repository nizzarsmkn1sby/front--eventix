// main.js - Eventix Frontend JS

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('open');
        }
    });
}

// Ticket quantity buttons
document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const numEl = btn.closest('.ticket-qty')?.querySelector('.qty-num');
        if (!numEl) return;
        let qty = parseInt(numEl.textContent) || 1;
        if (btn.dataset.action === 'plus') qty = Math.min(qty + 1, 10);
        if (btn.dataset.action === 'minus') qty = Math.max(qty - 1, 1);
        numEl.textContent = qty;
        updateTotal(qty);
    });
});

function updateTotal(qty) {
    const priceEl = document.querySelector('.price-per-ticket');
    const totalEl = document.querySelector('#totalPrice');
    const adminEl = document.querySelector('#adminFee');
    const grandEl = document.querySelector('#grandTotal');
    if (!priceEl || !totalEl) return;
    const price = parseInt(priceEl.dataset.price) || 0;
    const adminFee = Math.round(price * 0.03);
    const subtotal = price * qty;
    const grand = subtotal + adminFee;
    totalEl.textContent = 'Rp ' + grand.toLocaleString('id-ID');
    if (adminEl) adminEl.textContent = 'Rp ' + adminFee.toLocaleString('id-ID');
    if (grandEl) grandEl.textContent = 'Rp ' + grand.toLocaleString('id-ID');
}

// Payment option highlight
document.querySelectorAll('.payment-option').forEach(opt => {
    const radio = opt.querySelector('input[type="radio"]');
    if (radio) {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            radio.checked = true;
        });
    }
});

// Active nav link
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});

// Admin sidebar toggle (mobile)
const adminToggle = document.getElementById('adminSidebarToggle');
const adminSidebar = document.querySelector('.admin-sidebar');
if (adminToggle && adminSidebar) {
    adminToggle.addEventListener('click', () => {
        adminSidebar.classList.toggle('open');
    });
}

// Smooth entrance animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0 });

document.querySelectorAll('.event-card, .feature-card, .stat-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
    observer.observe(el);
});

// File upload preview
const fileInput = document.getElementById('bannerUpload');
const fileLabel = document.querySelector('.file-upload-area');
if (fileInput && fileLabel) {
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileLabel.innerHTML = `<div class="file-upload-icon">✅</div><strong>${file.name}</strong><br><small>${(file.size / 1024).toFixed(1)} KB</small>`;
        }
    });
}

console.log('Eventix Frontend Loaded ✅');
