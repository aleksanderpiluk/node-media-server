import { FastifyInstance } from 'fastify';
import { serveImageController } from '../../use-cases/serve-image/index.js';

export default async function (fastify: FastifyInstance) {
    fastify.get('/image/:imageId/:variant', (req, rep) => serveImageController.execute(req, rep));
}