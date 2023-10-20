import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../../../../shared/core/base-controller.js';
import { GetGroupUseCase } from './get-group.use-case.js';

export class GetGroupController extends BaseController {
    constructor(private useCase: GetGroupUseCase) {
        super();
    }

    async execute(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { groupId: id } = this.parseParams(request);

            const response = await this.useCase.execute({ id });

            return this.ok(reply, response);
        } catch (err) {
            return this.handleError(reply, err);
        }
    }
}
