import { Logger } from './shared/infra/logger/logger.js';

export class App {
    private logger;
    constructor() {
        this.logger = new Logger(App.name);

        this.init();
    }

    private async init() {
        await import('./shared/infra/mongoose/connection.js');
        this.logger.info('Database connection established.');

        await import('./shared/infra/http/app.js');
    }


}