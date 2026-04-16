// === 1. CONFIGURATION (The Environment Toggle) ===
const CONFIG = {
    // Keep TRUE while building frontend. Switch to FALSE when FastAPI is live.
    useMockData: true, 
    apiEndpoint: 'http://localhost:8000/api/v1/dashboard/summary'
};

// === 2. INITIALIZE CHART (Empty state, waiting for data) ===
const ctx = document.getElementById('aqiChart').getContext('2d');
let gradient = ctx.createLinearGradient(0, 0, 0, 300);
gradient.addColorStop(0, 'rgba(46, 204, 113, 0.4)');
gradient.addColorStop(1, 'rgba(46, 204, 113, 0.0)');

const aqiChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Will be populated by the API
        datasets: [{
            label: 'Average AQI',
            data: [], // Will be populated by the API
            borderColor: '#2ecc71',
            backgroundColor: gradient,
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#2ecc71',
            pointRadius: 4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true, suggestedMax: 100, grid: { color: '#f0f0f0', drawBorder: false } },
            x: { grid: { display: false, drawBorder: false } }
        }
    }
});

// === 3. INITIALIZE MAP (Base layer only) ===
const map = L.map('map').setView([20.0, 0.0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// We need an array to keep track of map markers so we can clear them when filters change
let currentMapMarkers = []; 

// === 4. THE "DATA FETCHER" (Backend-Ready Architecture) ===
async function fetchDashboardData(cityQuery, timeFilter, pollutantFilter) {
    if (CONFIG.useMockData) {
        console.log(`[MOCK API] Fetching data for City: ${cityQuery}, Time: ${timeFilter}, Pollutant: ${pollutantFilter}...`);
        return new Promise(resolve => {
            setTimeout(() => {
                // Simulate the JSON structure your FastAPI server will eventually return
                resolve({
                    chart: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        // Generate a random array just so the chart moves when you click filters
                        dataPoints: Array.from({length: 7}, () => Math.floor(Math.random() * 60) + 20) 
                    },
                    map: [
                        { lat: 31.6295, lng: -7.9811, aqi: 42, name: 'Marrakech' },
                        { lat: 51.5074, lng: -0.1278, aqi: 55, name: 'London' },
                        { lat: 48.8566, lng: 2.3522, aqi: 68, name: 'Paris' },
                        { lat: 35.6762, lng: 139.6503, aqi: 85, name: 'Tokyo' }
                    ]
                });
            }, 600); // 600ms simulated network delay
        });
    } else {
        console.log(`[REAL API] Fetching from server...`);
        // Build the query string based on your UI filters
        const queryParams = new URLSearchParams({
            city: cityQuery,
            time: timeFilter,
            pollutant: pollutantFilter
        });
        
        const response = await fetch(`${CONFIG.apiEndpoint}?${queryParams}`);
        if (!response.ok) throw new Error("Backend connection failed");
        return await response.json();
    }
}

// === 5. UI INTERACTION & UPDATE LOGIC ===
async function updateDashboard() {
    // 1. Grab the current values from your HTML filter bar
    const cityInput = document.querySelector('.filter-input').value || "Global";
    const filterSelects = document.querySelectorAll('.filter-select');
    
    // Grab the values to send to the API
    const timeValue = filterSelects[0].value;
    const pollutantValue = filterSelects[1].value;
    
    // Grab the actual readable text from the dropdowns to update the UI labels
    const timeName = filterSelects[0].options[filterSelects[0].selectedIndex].text;
    const pollutantName = filterSelects[1].options[filterSelects[1].selectedIndex].text;

    // UPDATE THE TITLE TEXT HERE
    document.getElementById('chart-title-text').innerText = `Air Quality Trend (${timeName})`;

    try {
        // 2. Fetch the data (Mock or Real)
        const data = await fetchDashboardData(cityInput, timeValue, pollutantValue);

        // 3. Update the Chart
        aqiChart.data.labels = data.chart.labels;
        aqiChart.data.datasets[0].data = data.chart.dataPoints;
        aqiChart.data.datasets[0].label = pollutantName;
        aqiChart.update();

        // 4. Update the Map
        // First, remove old markers
        currentMapMarkers.forEach(marker => map.removeLayer(marker));
        currentMapMarkers = []; 

        // Then, add new markers based on the API response
        data.map.forEach(location => {
            // Change color based on AQI severity
            const markerColor = location.aqi > 60 ? '#e74c3c' : '#2ecc71'; 
            
            const marker = L.circleMarker([location.lat, location.lng], { 
                color: markerColor, 
                radius: 8 
            }).bindPopup(`<b>${location.name}</b><br>AQI: ${location.aqi}`);
            
            marker.addTo(map);
            currentMapMarkers.push(marker);
        });

    } catch (error) {
        console.error("Dashboard data loading error:", error);
    }
}

// === 6. EVENT LISTENERS ===
// Trigger the update whenever a filter is changed
document.querySelector('.filter-input').addEventListener('change', updateDashboard);
document.querySelectorAll('.filter-select')[0].addEventListener('change', updateDashboard);
document.querySelectorAll('.filter-select')[1].addEventListener('change', updateDashboard);

// Run once immediately when the page loads to populate the initial data
updateDashboard();