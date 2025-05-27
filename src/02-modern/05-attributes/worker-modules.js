// Worker modules example

// Create a module worker
const worker = new Worker('./worker.js', {
    type: 'module',
    credentials: 'same-origin'
});

// Create a shared worker with module support
const sharedWorker = new SharedWorker('./shared.js', {
    type: 'module',
    credentials: 'same-origin'
});

// Create a worklet
await CSS.paintWorklet.addModule('./paint.js');

// Listen for worker messages
worker.addEventListener('message', (event) => {
    console.log('Worker message:', event.data);
});

// Listen for shared worker messages
sharedWorker.port.addEventListener('message', (event) => {
    console.log('Shared worker message:', event.data);
});
sharedWorker.port.start();

// Worker modules provide:
// 1. ESM syntax in workers
// 2. Proper dependency management
// 3. Module scoping
// 4. Better error handling
// 5. Cross-origin security

// Export worker instances
export { worker, sharedWorker };
