// ===== INIT & SCROLL LOGIC =====
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Dark Mode from Storage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    // 2. Start Scroll Observer
    setupScrollAnimations();
});

// ===== SMOOTH SCROLL TO CONTENT =====
function scrollToContent() {
    document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
}

// ===== DARK MODE TOGGLE =====
const toggleBtn = document.getElementById('darkModeToggle');
toggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ===== TAB LOGIC =====
function openTab(tabId, btn) {
    // Hide all
    document.querySelectorAll('.tab-content').forEach(c => {
        c.style.display = 'none';
        c.classList.remove('active'); 
    });
    
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    // Show selected
    const selectedSection = document.getElementById(tabId);
    selectedSection.style.display = 'block';
    
    // Small timeout to allow display:block to apply before adding class (for animation)
    setTimeout(() => {
        selectedSection.classList.add('active');
        // Re-trigger scroll animations for the new tab content
        setupScrollAnimations(); 
    }, 10);

    btn.classList.add('active');
}

// ===== RECIPE ACCORDION =====
function toggleRecipe(btn) {
    const dropdown = btn.nextElementSibling;
    dropdown.classList.toggle('open');
    btn.textContent = dropdown.classList.contains('open') ? "Hide Recipe" : "View Recipe";
}

// ===== FLIP CARD LOGIC (THE SURPRISE) =====
document.querySelectorAll('.flip-card-container').forEach(container => {
    container.addEventListener('click', function(e) {
        // Don't flip if clicking the Play Audio button specifically
        if (e.target.classList.contains('play-audio-btn')) return;

        const card = this.querySelector('.flip-card');
        card.classList.toggle('flipped');
        
        // Auto-play video if flipped to back
        const video = card.querySelector('video');
        if (card.classList.contains('flipped') && video) {
            video.play();
        } else if (video) {
            video.pause();
        }
    });
});

// ===== AUDIO LOGIC =====
document.querySelectorAll('.play-audio-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card flip
        const audioSrc = btn.getAttribute('data-audio');
        if(audioSrc) {
            new Audio(audioSrc).play();
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}