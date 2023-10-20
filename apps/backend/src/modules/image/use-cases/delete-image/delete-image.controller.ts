import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../../../../shared/core/base-controller.js';
import { DeleteImageUseCase } from './delete-image.use-case.js';

export class DeleteImageController extends BaseController {
    constructor(private useCase: DeleteImageUseCase) {
        super();
    }

    async execute(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { imageId: id } = this.parseParams(request);

            await this.useCase.execute({
                id,
            });

            return this.ok(reply);
        } catch (err) {
            return this.handleError(reply, err);
        }
    }
}
