import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../../../../shared/core/base-controller.js';
import { GetImageUseCase } from './get-image.use-case.js';

export class GetImageController extends BaseController {
    constructor(private useCase: GetImageUseCase) {
        super();
    }

    async execute(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { imageId: id } = this.parseParams(request);

            const response = await this.useCase.execute({ id });

            return this.ok(reply, response);
        } catch (err) {
            return this.handleError(reply, err);
        }
    }
}
