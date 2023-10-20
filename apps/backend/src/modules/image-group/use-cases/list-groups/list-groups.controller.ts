import { FastifyReply, FastifyRequest } from 'fastify';
import { ListGroupsUseCase } from './list-groups.use-case.js';
import { BaseController } from '../../../../shared/core/base-controller.js';

export class ListGroupsController extends BaseController {
    constructor(private useCase: ListGroupsUseCase) {
        super();
    }

    async execute(request: FastifyRequest, reply: FastifyReply) {
        try {
            const response = await this.useCase.execute();

            return this.ok(reply, response);
        } catch (err) {
            return this.handleError(reply, err);
        }
    }
}
