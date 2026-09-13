

document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.game-image img').forEach(function(image) {
        image.addEventListener('error', function() {
            const placeholder = document.createElement('span');
            placeholder.className = 'cover-placeholder';
            placeholder.textContent = image.closest('.game-entry').querySelector('h3').textContent;
            image.replaceWith(placeholder);
        }, { once: true });
    });

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        document.body.style.backgroundPositionY = 
            -(scrolled * parallaxSpeed) + 'px';
    });

    const gameEntries = document.querySelectorAll('.game-entry');
    
    gameEntries.forEach((entry, index) => {
        entry.style.animationDelay = `${index * 0.2}s`;

        entry.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
        });

        entry.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        });
    });

    const easterEggs = document.querySelectorAll('.easter-egg');

    document.getElementById('secret1').addEventListener('click', function(e) {
        e.stopPropagation();
        this.style.background = 'radial-gradient(circle, #ffcc00 25%, transparent 26%, transparent 75%, #ffcc00 76%, #ffcc00), radial-gradient(circle, #ffcc00 25%, transparent 26%, transparent 75%, #ffcc00 76%, #ffcc00)';
        this.style.backgroundSize = '20px 20px';
        this.style.opacity = '1';
        
        setTimeout(() => {
            alert('🌟 YOU FOUND THE TRIFORCE! 🌟\n\nThe secret to mastering Hyrule is courage, wisdom, and power in equal measure!');
        }, 300);
    });

    document.getElementById('secret2').addEventListener('click', function(e) {
        e.stopPropagation();
        this.style.background = '#800080';
        this.style.borderRadius = '5px';
        
        setTimeout(() => {
            alert('🏰 HYRULE CASTLE SECRET! 🏰\n\n"It\'s dangerous to go alone! Take this..."');
        }, 300);
    });

    document.getElementById('secret3').addEventListener('click', function(e) {
        e.stopPropagation();
        this.style.background = '#8B0000';
        this.style.borderRadius = '8px';
        
        setTimeout(() => {
            alert('🐉 GANON\'S LAIR FOUND! 🐉\n\n"Never give up! The light will always return!"');
        }, 300);
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const decadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease-out';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.decade').forEach(decade => {
        decadeObserver.observe(decade);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown') {
            window.scrollBy(0, 300);
        } else if (e.key === 'ArrowUp') {
            window.scrollBy(0, -300);
        }
    });

    console.log('%c ❤️  The Legend of Zelda Timeline Archive ', 'background: #6ccbeb; color: #333; padding: 10px; font-family: monospace;');
    console.log('%c "Do not give up! The light will always return!" ', 'background: #ffcc00; color: #333; padding: 5px; font-family: monospace;');

    let cursorFramePending = false;
    let latestCursorPosition = null;

    document.addEventListener('mousemove', function(e) {
        latestCursorPosition = { x: e.clientX, y: e.clientY };

        if (cursorFramePending) {
            return;
        }

        cursorFramePending = true;
        requestAnimationFrame(function() {
            const position = latestCursorPosition;
            cursorFramePending = false;

            if (!position) {
                return;
            }

            const cursor = document.createElement('div');
            cursor.style.position = 'fixed';
            cursor.style.left = `${position.x}px`;
            cursor.style.top = `${position.y}px`;
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.border = '2px solid var(--primary-color)';
            cursor.style.borderRadius = '50%';
            cursor.style.pointerEvents = 'none';
            cursor.style.transform = 'translate(-50%, -50%)';
            cursor.style.willChange = 'opacity, transform';
            cursor.style.zIndex = '9999';

            document.body.appendChild(cursor);

            setTimeout(() => {
                cursor.style.opacity = '0';
                cursor.style.transform = 'translate(-50%, -50%) scale(0.6)';
            }, 10);

            setTimeout(() => {
                cursor.remove();
            }, 500);
        });
    });
});
