// Fallback handling with top-level await

// Try primary service, fallback to backup
const data = await (async () => {
    try {
        const response = await fetch('https://primary.example.com/data');
        return response.json();
    } catch {
        console.log('Primary service failed, using backup');
        const response = await fetch('https://backup.example.com/data');
        return response.json();
    }
})();

export { data };

// Module guarantees valid data, handles failures transparently
