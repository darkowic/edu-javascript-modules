// Deferred module loading
console.log('Deferred module executed after HTML parsing');

// DOM is guaranteed to be available
const app = document.getElementById('app');
app.innerHTML = 'Loaded via deferred module';
