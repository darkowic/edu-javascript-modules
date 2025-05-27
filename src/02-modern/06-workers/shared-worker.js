// Shared Worker with ES Modules
import { calculatePrimes } from './math.js';
import { formatResult } from './format.js';

const connections = new Set();

// Handle connections from multiple tabs/windows
self.onconnect = function(e) {
    const port = e.ports[0];
    connections.add(port);
    
    port.onmessage = async function(e) {
        const { id, start, end } = e.data;
        
        try {
            const primes = await calculatePrimes(start, end);
            const result = formatResult(primes);
            
            // Send result to the requesting port
            port.postMessage({
                id,
                type: 'success',
                data: result
            });
            
            // Notify other connections about the calculation
            broadcastExcept(port, {
                type: 'notification',
                message: `Calculation completed: ${result.summary}`
            });
        } catch (error) {
            port.postMessage({
                id,
                type: 'error',
                error: error.message
            });
        }
    };
    
    port.onmessageerror = function(e) {
        console.error('Message error:', e);
    };
    
    port.start();
};

function broadcastExcept(excludePort, message) {
    for (const port of connections) {
        if (port !== excludePort) {
            port.postMessage(message);
        }
    }
}
