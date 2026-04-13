// 1. Target the canvas we created in the HTML
const ctx = document.getElementById('aqiChart').getContext('2d');

// 2. Create a smooth gradient fill under the line
let gradient = ctx.createLinearGradient(0, 0, 0, 300);
gradient.addColorStop(0, 'rgba(46, 204, 113, 0.4)');
gradient.addColorStop(1, 'rgba(46, 204, 113, 0.0)');

// 3. Configure and render the chart
const aqiChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Average AQI',
            data: [42, 48, 75, 82, 56, 45, 38],
            borderColor: '#2ecc71',
            backgroundColor: gradient,
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#2ecc71',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#34495e',
                titleFont: { size: 13 },
                bodyFont: { size: 14, weight: 'bold' },
                padding: 12,
                displayColors: false,
                callbacks: {
                    label: function(context) { return context.parsed.y + ' AQI'; }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 100,
                grid: { color: '#f0f0f0', drawBorder: false },
                ticks: { color: '#7f8c8d', padding: 10 }
            },
            x: {
                grid: { display: false, drawBorder: false },
                ticks: { color: '#7f8c8d', padding: 10 }
            }
        }
    }
});

// === INITIALIZE INTERACTIVE MAP ===
// Creates the map and centers it. [Latitude, Longitude], Zoom Level
const map = L.map('map').setView([20.0, 0.0], 2);

// Loads the map tiles (the actual images of the world)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a few sample "Air Quality" markers to show how it works
// You can replace these with real database coordinates later!
L.circleMarker([40.7128, -74.0060], { color: 'orange', radius: 8 }).addTo(map).bindPopup('New York: Moderate AQI');
L.circleMarker([51.5074, -0.1278], { color: '#2ecc71', radius: 8 }).addTo(map).bindPopup('London: Good AQI');
L.circleMarker([31.6295, -7.9811], { color: '#2ecc71', radius: 8 }).addTo(map).bindPopup('Marrakech: Good AQI');
L.circleMarker([35.6762, 139.6503], { color: 'red', radius: 8 }).addTo(map).bindPopup('Tokyo: Unhealthy AQI');