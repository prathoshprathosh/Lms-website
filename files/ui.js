// ========================================
// MODAL MANAGEMENT
// ========================================

const modals = {
    viewLeadModal: document.getElementById('viewLeadModal'),
    addLeadModal: document.getElementById('addLeadModal'),
    editLeadModal: document.getElementById('editLeadModal')
};

function openModal(modalId) {
    const modal = modals[modalId];
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = modals[modalId];
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Add Lead Button
const addLeadBtn = document.getElementById('addLeadBtn');
if (addLeadBtn) {
    addLeadBtn.addEventListener('click', () => {
        openModal('addLeadModal');
    });
}

// View Lead Buttons
const viewButtons = document.querySelectorAll('.view-btn');
viewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const leadName = btn.getAttribute('data-lead-name');
        const company = btn.getAttribute('data-company');
        const email = btn.getAttribute('data-email');
        const phone = btn.getAttribute('data-phone');
        const status = btn.getAttribute('data-status');
        
        document.getElementById('viewLeadName').textContent = leadName || '—';
        document.getElementById('viewLeadCompany').textContent = company || '—';
        document.getElementById('viewLeadEmail').textContent = email || '—';
        document.getElementById('viewLeadPhone').textContent = phone || '—';
        document.getElementById('viewLeadStatus').textContent = status || '—';
        
        openModal('viewLeadModal');
    });
});

// Edit Lead Buttons
const editButtons = document.querySelectorAll('.edit-btn');
editButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const leadName = btn.getAttribute('data-lead-name');
        const nameInput = document.getElementById('editLeadName');
        if (nameInput) {
            nameInput.value = leadName || '';
        }
        openModal('editLeadModal');
    });
});

// Close Modal Buttons
const closeButtons = document.querySelectorAll('.modal-close, [data-modal]');
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        if (modalId) {
            closeModal(modalId);
        } else {
            const modalOverlay = btn.closest('.modal-overlay');
            if (modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// Close modal on overlay click
Object.values(modals).forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        Object.values(modals).forEach(modal => {
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// ========================================
// SIDEBAR TOGGLE
// ========================================

const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('expanded');
    });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && sidebar.classList.contains('expanded')) {
            sidebar.classList.remove('expanded');
        }
    }
});

// ========================================
// BUTTON INTERACTIONS
// ========================================

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    const rect = button.getBoundingClientRect();
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.classList.add('ripple');
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
}

// Apply ripple effect to primary buttons
const primaryButtons = document.querySelectorAll('.btn-primary');
primaryButtons.forEach(btn => {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', createRipple);
});

// Add ripple styles
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// SEARCH FUNCTIONALITY (UI ONLY)
// ========================================

const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.style.transition = 'all 0.2s ease';
    });
    
    searchInput.addEventListener('input', (e) => {
        // UI feedback only - no actual search
        if (e.target.value.length > 0) {
            searchInput.style.fontWeight = '500';
        } else {
            searchInput.style.fontWeight = '400';
        }
    });
}

// ========================================
// TABLE ROW HOVER EFFECTS
// ========================================

const tableRows = document.querySelectorAll('.leads-table tbody tr');
tableRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.style.transform = 'translateX(2px)';
    });
    
    row.addEventListener('mouseleave', () => {
        row.style.transform = 'translateX(0)';
    });
});

// ========================================
// KPI CARD INTERACTIONS
// ========================================

const kpiCards = document.querySelectorAll('.kpi-card');
kpiCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.borderColor = 'var(--primary)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.borderColor = 'var(--border-color)';
    });
});

// ========================================
// NOTIFICATION BELL ANIMATION
// ========================================

const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
    setInterval(() => {
        const badge = notificationBtn.querySelector('.notification-badge');
        if (badge) {
            badge.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                badge.style.animation = '';
            }, 1000);
        }
    }, 5000);
}

const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(pulseStyle);

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});