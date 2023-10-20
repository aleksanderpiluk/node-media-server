import { Bootstrap } from './bootstrap.js';
import arg from 'arg';
import { config } from 'dotenv';

// Parse args from CLI
const args = arg({
    '--config': [String],
});

// Parse .env files from args
args['--config']?.forEach((path) => {
    config({ path, override: true });
});

// Bootstrap application
const bootstrap = new Bootstrap();
bootstrap.run();
