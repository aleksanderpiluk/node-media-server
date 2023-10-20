import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import { App } from './app.js';
import { Logger } from './shared/infra/logger/logger.js';

export class Bootstrap {
    private readonly logger = new Logger(Bootstrap.name);

    private readonly clusterMode = process.env.CLUSTER === '1' || process.env.CLUSTER === 'true';

    run() {
        if (this.clusterMode && cluster.isPrimary) {
            this.runClusterWorkers();
        } else {
            this.logger.info('Running app instance...');
            new App();
        }
    }

    private runClusterWorkers() {
        this.logger.info('Starting cluster workers...');

        const numCPUs = availableParallelism();
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        cluster.on('exit', (worker, code, signal) => {
            this.logger.warn('Worker died.');
        });
    }
}
