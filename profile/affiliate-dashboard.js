// Theme Toggle
function toggleTheme() {
    document.querySelector('.affiliate-dashboard-body').classList.toggle('dark-mode');
    anime({
        targets: '.affiliate-dashboard-wrapper',
        scale: [0.98, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
}

// Initialize Charts
const ctx = document.getElementById('revenueChart').getContext('2d');
const revenueChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [{
            label: 'Doanh Thu 2023',
            data: [12, 19, 3, 5, 2, 3, 7, 8, 9, 10, 15, 16],
            borderColor: '#0066ff',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Biểu Đồ Doanh Thu Năm 2023'
            }
        }
    }
});

// Animation Effects
anime({
    targets: '.aff-stat-card',
    translateY: [20, 0],
    opacity: [0, 1],
    delay: anime.stagger(100),
    duration: 800,
    easing: 'easeOutElastic(1, .8)'
});

// Additional JavaScript functionality...