// Async module loading
console.log('Async module might execute before HTML parsing');

// DOM might not be available yet
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    app.innerHTML += '<br>Loaded via async module';
});
