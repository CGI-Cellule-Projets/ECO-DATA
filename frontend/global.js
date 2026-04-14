// === GLOBAL UI INTERACTIONS ===
// This script runs on every page to handle the header and sidebar footer

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Notification Bell
    const notificationBtn = document.querySelector('.notification');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            alert('🔔 All clear! No new environmental alerts for Marrakech at this time.');
        });
    }

    // 2. Language Selector
    const languageBtn = document.querySelector('.language');
    if (languageBtn) {
        languageBtn.style.cursor = 'pointer'; // Make it look clickable
        languageBtn.addEventListener('click', () => {
            alert('🌐 Internationalization (French/Arabic/English) will be connected to the backend soon.');
        });
    }

    // 3. User Profile / Avatar
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.style.cursor = 'pointer';
        userProfile.addEventListener('click', (e) => {
            // Prevent the language button from triggering this if clicked accidentally
            if(e.target.closest('.language')) return; 
            alert('👤 Admin Profile: Manage API keys and team access levels here.');
        });
    }

    // 4. Settings & Logout Links
    const settingsLink = document.querySelector('a[href="settings.html"]');
    if (settingsLink) {
        settingsLink.addEventListener('click', (event) => {
            event.preventDefault(); // Stops the browser from loading a broken 404 page
            alert('⚙️ Sensor configuration and dashboard preferences panel is under construction.');
        });
    }

    const logoutLink = document.querySelector('a[href="logout.html"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault(); // Stops the browser from loading a broken 404 page
            alert('👋 Securely logging out. Redirecting to authentication gateway...');
            // In a real app, you would do: window.location.href = "login.html";
        });
    }
});