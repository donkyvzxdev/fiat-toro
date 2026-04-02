/* ================================================
   FIAT TORO 2025 - macOS-style Animations
   Liquid glass theme interactions
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    initNavigation();
    initRevealAnimations();
    initParallaxEffects();
    initColorPicker();
    initSmoothScroll();
    initMouseInteractions();
    initPageTransitions();
    initScrollProgress();
});

/* ================================================
   NAVIGATION
   ================================================ */
function initNavigation() {
    const nav = document.querySelector('.glass-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Scroll effect for navigation
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Active link based on scroll position
    const observerOptions = {
        rootMargin: '-20% 0px -80% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
    
    // Magnetic effect for nav logo
    const logo = document.querySelector('.nav-logo');
    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'scale(1.05)';
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'scale(1)';
    });
}

/* ================================================
   REVEAL ON SCROLL
   ================================================ */
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    reveals.forEach(el => revealObserver.observe(el));
    
    // Staggered animation for grid items
    const grids = document.querySelectorAll('.features-grid, .tech-grid, .interior-features');
    
    grids.forEach(grid => {
        const items = grid.querySelectorAll('.feature-card, .tech-card, .interior-item');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}

/* ================================================
   PARALLAX EFFECTS
   ================================================ */
function initParallaxEffects() {
    const blobs = document.querySelectorAll('.blob');
    const truck = document.querySelector('.truck-svg');
    const hero = document.querySelector('.hero');
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;
                const heroHeight = hero.offsetHeight;
                
                // Parallax for blobs
                blobs.forEach((blob, index) => {
                    const speed = 0.05 + (index * 0.02);
                    blob.style.transform = `translateY(${scrollY * speed}px)`;
                });
                
                // Subtle truck movement
                if (truck && scrollY < heroHeight) {
                    const progress = scrollY / heroHeight;
                    truck.style.transform = `translateY(${progress * 50}px) scale(${1 - progress * 0.1})`;
                    truck.style.opacity = 1 - progress;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Mouse parallax for hero content
    const heroContent = document.querySelector('.hero-content');
    
    document.addEventListener('mousemove', (e) => {
        if (!heroContent) return;
        
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) / centerX * 10;
        const moveY = (clientY - centerY) / centerY * 10;
        
        heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

/* ================================================
   COLOR PICKER
   ================================================ */
function initColorPicker() {
    const colorBtns = document.querySelectorAll('.color-btn');
    const colorName = document.querySelector('.color-name');
    
    const colorNames = {
        preto: 'Preto Metálico',
        branco: 'Branco Sólido',
        vermelho: 'Vermelho',
        azul: 'Azul Metálico',
        cinza: 'Cinza Grafite'
    };
    
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            colorBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            
            // Animate color name change
            const color = btn.dataset.color;
            colorName.style.opacity = '0';
            
            setTimeout(() => {
                colorName.textContent = colorNames[color];
                colorName.style.opacity = '1';
            }, 200);
            
            // Add ripple effect
            createRipple(btn);
        });
        
        // Hover effect
        btn.addEventListener('mouseenter', () => {
            const preview = btn.querySelector('.color-preview');
            preview.style.transform = 'scale(1.2)';
        });
        
        btn.addEventListener('mouseleave', () => {
            const preview = btn.querySelector('.color-preview');
            preview.style.transform = 'scale(1)';
        });
    });
}

function createRipple(element) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(41, 151, 255, 0.4) 0%, transparent 70%);
        border-radius: 50%;
        animation: rippleEffect 0.6s ease-out forwards;
        pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ================================================
   SMOOTH SCROLL
   ================================================ */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navHeight = 56;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jump
                history.pushState(null, null, href);
            }
        });
    });
}

/* ================================================
   MOUSE INTERACTIONS
   ================================================ */
function initMouseInteractions() {
    // 3D tilt effect for glass cards
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
    
    function handleTilt(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    }
    
    function resetTilt() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
    
    // Spotlight effect for buttons
    const buttons = document.querySelectorAll('.btn-mac');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            btn.style.setProperty('--mouse-x', `${x}px`);
            btn.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* ================================================
   PAGE TRANSITIONS
   ================================================ */
function initPageTransitions() {
    // Fade in on load
    document.body.style.opacity = '0';
    
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    });
    
    // Exit animations
    const links = document.querySelectorAll('a:not([href^="#"])');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.hostname === window.location.hostname) {
                document.body.style.transition = 'opacity 0.3s ease';
                document.body.style.opacity = '0';
            }
        });
    });
}

/* ================================================
   SCROLL PROGRESS
   ================================================ */
function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 56px;
        left: 0;
        width: 0%;
        height: 2px;
        background: linear-gradient(90deg, #2997ff, #bf5af2, #5eead4);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = `${progress}%`;
    });
}

/* ================================================
   ADDITIONAL EFFECTS
   ================================================ */

// Cursor follower effect (optional)
const cursorFollower = () => {
    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(41, 151, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease, opacity 0.3s ease;
        display: none;
    `;
    document.body.appendChild(follower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Check if device supports hover (not mobile)
    if (window.matchMedia('(hover: hover)').matches) {
        follower.style.display = 'block';
        
        const animate = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            follower.style.left = `${followerX - 10}px`;
            follower.style.top = `${followerY - 10}px`;
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Hide on click
        document.addEventListener('mousedown', () => {
            follower.style.transform = 'scale(0.5)';
        });
        
        document.addEventListener('mouseup', () => {
            follower.style.transform = 'scale(1)';
        });
    }
};

// Uncomment to enable cursor follower
// cursorFollower();

// Lazy loading images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Intersection observer for stats counter animation
const animateCounters = () => {
    const counters = document.querySelectorAll('.spec-value');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        const match = text.match(/(\d+)/);
        
        if (match) {
            const target = parseInt(match[0]);
            const suffix = text.replace(match[0], '');
            let current = 0;
            const duration = 2000;
            const step = target / (duration / 16);
            
            const counterObj = { value: 0 };
            
            const animate = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(animate);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            const counterObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    animate();
                    counterObserver.unobserve(counter);
                }
            });
            
            counterObserver.observe(counter);
        }
    });
};

// Run on load
window.addEventListener('load', () => {
    animateCounters();
    lazyLoadImages();
});

// Touch feedback for mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    const addTouchFeedback = () => {
        document.querySelectorAll('.btn-mac, .nav-link, .color-btn').forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            el.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    };
    
    addTouchFeedback();
}

// Performance optimization - will-change
const optimizeAnimations = () => {
    const animatedElements = document.querySelectorAll('.hero, .truck-svg, .blob');
    
    animatedElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
    });
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            animatedElements.forEach(el => {
                el.style.willChange = 'auto';
            });
        }, 2000);
    });
};

optimizeAnimations();

/* ================================================
   CONSOLE easter egg
   ================================================ */
console.log(`
  🚗 Fiat Toro 2025 - Website
  ✨ Built with macOS-inspired design
  
  Design: Liquid glass theme
  Animations: Smooth & performant
  Made with 💙
`);