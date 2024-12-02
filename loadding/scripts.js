class PremiumLoader {
    constructor() {
        this.progress = 0;
        this.particles = [];
        this.init();
    }

    init() {
        // Initialize anime.js animations
        anime({
            targets: '.v0_premium_loader_ring',
            scale: [1, 1.1],
            opacity: [0.8, 1],
            easing: 'easeInOutQuad',
            duration: 1500,
            loop: true,
            direction: 'alternate'
        });

        // Create particles
        this.createParticles();
        
        // Start progress animation
        this.updateProgress();
    }

    createParticles() {
        const container = document.querySelector('.v0_premium_loader_content');
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'v0_premium_particle';
            container.appendChild(particle);

            const angle = (Math.random() * Math.PI * 2);
            const radius = 50 + Math.random() * 30;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            anime({
                targets: particle,
                translateX: [x, -x],
                translateY: [y, -y],
                opacity: [0, 1, 0],
                duration: 2000 + Math.random() * 3000,
                loop: true,
                delay: Math.random() * 1000,
                easing: 'easeInOutQuad'
            });
        }
    }

    updateProgress() {
        const progressBar = document.querySelector('.v0_premium_loader_progress_bar');
        const increment = () => {
            if (this.progress < 100) {
                this.progress += Math.random() * 15;
                if (this.progress > 100) this.progress = 100;
                progressBar.style.width = `${this.progress}%`;
                setTimeout(increment, 200 + Math.random() * 300);
            }
        };
        increment();
    }

    show() {
        document.getElementById('v0_premium_loader_wrapper').style.opacity = '1';
        document.getElementById('v0_premium_loader_wrapper').style.visibility = 'visible';
    }

    hide() {
        const wrapper = document.getElementById('v0_premium_loader_wrapper');
        wrapper.style.opacity = '0';
        setTimeout(() => {
            wrapper.style.visibility = 'hidden';
        }, 500);
    }
}

// Initialize loader
const loader = new PremiumLoader();

// Example usage:
// loader.show(); // Show loader
// loader.hide(); // Hide loader