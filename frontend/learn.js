// 1. The Database of Articles
const articleDatabase = {
    "Understanding Air Pollution": `
        <img src="smokestacks.jpg" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
        <p>Air pollution is one of the world's largest health and environmental threats. It occurs when harmful or excessive quantities of substances are introduced into Earth's atmosphere.</p>
        <h3>The Major Culprits</h3>
        <ul>
            <li><strong>Particulate Matter (PM2.5 & PM10):</strong> Tiny particles from construction, fires, and vehicles.</li>
            <li><strong>Nitrogen Dioxide (NO2):</strong> A highly reactive gas primarily from burning fuel.</li>
        </ul>
    `,
    "Effects on Your Health": `
        <p>The World Health Organization (WHO) estimates that millions of deaths worldwide are linked to ambient air pollution every year.</p>
        <h3>Short-term vs Long-term Exposure</h3>
        <ul>
            <li><strong>Respiratory System:</strong> Chronic exposure leads to asthma and decreased lung function.</li>
            <li><strong>Cardiovascular System:</strong> Fine particles can enter the bloodstream, causing strokes.</li>
        </ul>
    `,
    "What you can do": `
        <p>While systemic change requires government action, individual choices collectively make a massive difference in local air quality.</p>
        <h3>Daily Actionable Steps</h3>
        <ul>
            <li><strong>Optimize Transportation:</strong> Walk, cycle, or use public transport whenever possible.</li>
            <li><strong>Energy Efficiency:</strong> Turn off lights and use energy-efficient appliances.</li>
        </ul>
    `
};

// 2. Grab the elements from the HTML
const gridView = document.getElementById('grid-view');
const articleView = document.getElementById('article-view');
const backBtn = document.getElementById('back-btn');
const articleTitle = document.getElementById('article-title');
const articleBody = document.getElementById('article-body');
const readMoreButtons = document.querySelectorAll('.read-more-btn');

// 3. When a user clicks "Read More"
readMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Find out which card they clicked
        const cardTitle = this.closest('.card-content').querySelector('h3').innerText;
        
        // Put the title and the text into the Article View
        articleTitle.innerText = cardTitle;
        articleBody.innerHTML = articleDatabase[cardTitle];
        
        // Hide the grid, show the article
        gridView.style.display = 'none';
        articleView.style.display = 'block';
    });
});

// 4. When a user clicks "Back to Topics"
backBtn.addEventListener('click', () => {
    // Hide the article, show the grid again
    articleView.style.display = 'none';
    gridView.style.display = 'block';
});