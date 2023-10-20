import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import groupRouter from '../../../modules/image-group/infra/http/routes.js';
import imageRouter from '../../../modules/image/infra/http/routes.js';
import serveRouter from '../../../modules/serve/infra/http/routes.js';
import { Logger } from '../logger/logger.js';
import { resolve } from 'path';
import { createRequire } from 'module';

const logger = new Logger('HTTP');

const app = fastify({
    logger,
});

if (process.env.NODE_ENV === 'production') {
    const require = createRequire(import.meta.url);

    const root = resolve(require.resolve('dashboard/package.json'), '..', 'dist/dashboard');
    app.register(async (instance) => {
        instance.register(fastifyStatic, {
            root,
            prefix: '/dashboard/',
            wildcard: false,
        });

        instance.setNotFoundHandler(async (request, reply) => {
            return reply.status(200).sendFile('index.html');
        });
    });
}

app.register(groupRouter, { prefix: '/group' });
app.register(imageRouter, { prefix: '/image' });
app.register(serveRouter, { prefix: '/serve' });

await app.listen({
    host: process.env.SERVER_HOST ? process.env.SERVER_HOST : 'localhost',
    port: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000,
});
