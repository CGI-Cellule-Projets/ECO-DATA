// === 1. CONFIGURATION (The Magic Toggle) ===
const CONFIG = {
    // Keep this TRUE while you design the frontend. 
    // Change to FALSE when the FastAPI backend is ready!
    useMockData: true, 
    apiEndpoint: 'http://localhost:8000/api/v1/air-quality/compare'
};

// === 2. MOCK DATABASE (Only used if useMockData is true) ===
const ecoDatabase = {
    'London': [42, 58, 31, 29],
    'Paris': [55, 65, 45, 38],
    'Marrakech': [28, 40, 22, 55],
    'Tokyo': [60, 72, 50, 42]
};

// === 3. CHART INITIALIZATION (Remains exactly the same) ===
const ctxCompare = document.getElementById('compareChart').getContext('2d');
const compareChart = new Chart(ctxCompare, {
    type: 'bar',
    data: {
        labels: ['PM2.5', 'PM10', 'NO2', 'O3 (Ozone)'],
        datasets: [
            { label: 'City A', data: [0,0,0,0], backgroundColor: '#2ecc71', borderRadius: 4 },
            { label: 'City B', data: [0,0,0,0], backgroundColor: '#34495e', borderRadius: 4 }
        ]
    },
    // ... (Keep your existing options exactly as they were) ...
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { tooltip: { backgroundColor: '#34495e', padding: 12 } },
        scales: {
            y: { beginAtZero: true, suggestedMax: 100, grid: { drawBorder: false } },
            x: { grid: { display: false, drawBorder: false } }
        }
    }
});

// === 4. THE "DATA FETCHER" (Backend-Ready Architecture) ===
// This function mimics a backend call. It works whether the backend exists or not.
async function fetchComparisonData(cityA, cityB) {
    if (CONFIG.useMockData) {
        // MOCK MODE: Simulate a real network delay (500ms) so your UI loading states work
        console.log(`[MOCK API] Fetching data for ${cityA} vs ${cityB}...`);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    [cityA]: ecoDatabase[cityA],
                    [cityB]: ecoDatabase[cityB]
                });
            }, 500);
        });
    } else {
        // PRODUCTION MODE: Calls your actual MySQL/FastAPI backend
        console.log(`[REAL API] Fetching data from server...`);
        const response = await fetch(`${CONFIG.apiEndpoint}?cityA=${cityA}&cityB=${cityB}`);
        if (!response.ok) throw new Error("Backend connection failed");
        return await response.json();
    }
}

// === 5. UI INTERACTION LOGIC ===
async function updateComparison() {
    const cityA = document.getElementById('cityA').value;
    const cityB = document.getElementById('cityB').value;

    try {
        // 1. Await the data (doesn't matter if it comes from the mock or the real API!)
        const data = await fetchComparisonData(cityA, cityB);

        // 2. Inject the data into the chart
        compareChart.data.datasets[0].label = cityA;
        compareChart.data.datasets[0].data = data[cityA];

        compareChart.data.datasets[1].label = cityB;
        compareChart.data.datasets[1].data = data[cityB];

        // 3. Animate the changes
        compareChart.update();

    } catch (error) {
        console.error("Data loading error:", error);
    }
}

// Add event listeners and run once on load
document.getElementById('cityA').addEventListener('change', updateComparison);
document.getElementById('cityB').addEventListener('change', updateComparison);
updateComparison();