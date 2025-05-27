// Complex HTTP client implementation
export class HttpClient {
    constructor() {
        this.baseUrl = 'https://api.example.com';
        this.timeout = 5000;
        this.retries = 3;
    }

    async get(url) {
        return this.withRetry(() => 
            fetch(this.baseUrl + url, {
                timeout: this.timeout
            })
        );
    }

    async post(url, data) {
        return this.withRetry(() =>
            fetch(this.baseUrl + url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: this.timeout
            })
        );
    }

    private async withRetry(operation) {
        let lastError;
        
        for (let i = 0; i < this.retries; i++) {
            try {
                return await operation();
            } catch (error) {
                lastError = error;
                await new Promise(resolve => 
                    setTimeout(resolve, Math.pow(2, i) * 1000)
                );
            }
        }
        
        throw lastError;
    }
}
