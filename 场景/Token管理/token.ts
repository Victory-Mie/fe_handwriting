class TokenManager {
    private token: string | undefined;
    private expirationTime: number | undefined;
    private isRefreshing: boolean = false;
    private refreshQueue: ((token: string | null, error?: Error) => void)[] = [];

    private async fetchNewToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.2) {
                    reject(new Error('Failed to fetch new token'));
                } else {
                    resolve('new_token_' + Date.now());
                }
            }, 1000);
        });
    }

    async getToken(): Promise<string> {
        if (this.isTokenValid()) {
            return this.token!;
        }
        if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
                this.refreshQueue.push((token, error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(token!);
                    }
                });
            });
        }
        await this.refresh();
        if (!this.token) {
            throw new Error('Failed to get a valid token after refresh');
        }
        return this.token;
    }

    getTokenSync(): string | undefined {
        if (this.isTokenValid()) {
            return this.token;
        }
        return undefined;
    }

    async refresh(): Promise<void> {
        if (this.isRefreshing) {
            return;
        }
        this.isRefreshing = true;
        try {
            const newToken = await this.fetchNewToken();
            this.token = newToken;
            this.expirationTime = Date.now() + 3600000;
            this.refreshQueue.forEach(resolve => resolve(newToken));
            this.refreshQueue = [];
        } catch (error) {
            console.error('Token refresh failed:', error);
            this.refreshQueue.forEach(reject => reject(null, error as Error));
            this.refreshQueue = [];
        } finally {
            this.isRefreshing = false;
        }
    }

    private isTokenValid(): boolean {
        return this.token !== undefined && this.expirationTime !== undefined && Date.now() < this.expirationTime;
    }
}

// 使用 CommonJS 方式导出
module.exports = TokenManager;

// 运行示例
const tokenManager = new TokenManager();

const requests = Array.from({ length: 5 }, () =>
    tokenManager.getToken().then(token => {
        console.log('Received token:', token);
    }).catch(error => {
        console.error('Error getting token:', error);
    })
);

Promise.all(requests).then(() => {
    console.log('All requests completed');
});
