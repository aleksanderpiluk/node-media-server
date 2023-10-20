import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../../../../shared/core/base-controller.js';
import { ListImagesUseCase } from './list-images.use-case.js';

export class ListImagesController extends BaseController {
    constructor(private useCase: ListImagesUseCase) {
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
