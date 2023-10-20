import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../../../../shared/core/base-controller.js';
import { DeleteGroupUseCase } from './delete-group.use-case.js';

export class DeleteGroupController extends BaseController {
    constructor(private useCase: DeleteGroupUseCase) {
        super();
    }

    async execute(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { groupId: id } = this.parseParams(request);

            await this.useCase.execute({ id });

            return this.ok(reply);
        } catch (err) {
            return this.handleError(reply, err);
        }
    }
}
