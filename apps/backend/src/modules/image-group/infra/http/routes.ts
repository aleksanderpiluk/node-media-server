import { FastifyInstance } from 'fastify';
import { listGroupsController } from '../../use-cases/list-groups/index.js';
import { addGroupController } from '../../use-cases/add-group/index.js';
import { deleteGroupController } from '../../use-cases/delete-group/index.js';
import { addVariantController } from '../../use-cases/add-variant/index.js';
import { getGroupController } from '../../use-cases/get-group/index.js';
import { getVariantController } from '../../use-cases/get-variant/index.js';
import { deleteVariantController } from '../../use-cases/delete-variant/index.js';
import { listVariantsController } from '../../use-cases/list-variants/index.js';

export default async function (fastify: FastifyInstance) {
    fastify.get(
        '/',
        (req, rep) => listGroupsController.execute(req, rep)
    );

    fastify.post(
        '/',
        (req, rep) => addGroupController.execute(req, rep)
    );



    fastify.get(
        '/:groupId',
        (req, rep) => getGroupController.execute(req, rep)
    );

    fastify.delete(
        '/:groupId',
        (req, rep) => deleteGroupController.execute(req, rep)
    );



    fastify.get(
        '/:groupId/variant',
        (req, rep) => listVariantsController.execute(req, rep)
    );

    fastify.post(
        '/:groupId/variant',
        (req, rep) => addVariantController.execute(req, rep)
    );



    fastify.get(
        '/:groupId/variant/:variant',
        (req, rep) => getVariantController.execute(req, rep)
    );

    fastify.delete(
        '/:groupId/variant/:variant',
        (req, rep) => deleteVariantController.execute(req, rep)
    );
}