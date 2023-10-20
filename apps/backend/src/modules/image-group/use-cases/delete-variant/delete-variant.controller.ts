import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../../../../shared/core/base-controller.js';
import { DeleteVariantUseCase } from './delete-variant.use-case.js';

export class DeleteVariantController extends BaseController {
    constructor(private useCase: DeleteVariantUseCase) {
        super();
    }

    async execute(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { groupId: id, variant: name } = this.parseParams(request);

            await this.useCase.execute({ id, name });

            return this.ok(reply);
        } catch (err) {
            return this.handleError(reply, err);
        }
    }
}
