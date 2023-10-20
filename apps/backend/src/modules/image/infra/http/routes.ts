import { FastifyInstance } from 'fastify';
import { listImagesController } from '../../use-cases/list-images/index.js';
import { addImageController } from '../../use-cases/add-image/index.js';
import multipart from '@fastify/multipart';
import { getImageController } from '../../use-cases/get-image/index.js';
import { deleteImageController } from '../../use-cases/delete-image/index.js';

export default async function (fastify: FastifyInstance) {
    const maxFileSize = 10 * 1024 * 1024;

    fastify.register(multipart, {
        limits: {
            fileSize: maxFileSize,
        },
    });

    fastify.get('/', (req, rep) => listImagesController.execute(req, rep));

    fastify.post('/', (req, rep) => addImageController.execute(req, rep));

    fastify.get('/:imageId', (req, rep) => getImageController.execute(req, rep));

    fastify.delete('/:imageId', (req, rep) => deleteImageController.execute(req, rep));
}
