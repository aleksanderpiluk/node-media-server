import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../../../../shared/core/base-controller.js';
import { GetVariantUseCase } from './get-variant.use-case.js';

export class GetVariantController extends BaseController {
    constructor(private useCase: GetVariantUseCase) {
        super();
    }

    async execute(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { groupId: id, variant: name } = this.parseParams(request);

            const response = await this.useCase.execute({ id, name });

            return this.ok(reply, response);
        } catch (err) {
            return this.handleError(reply, err);
        }
    }
}
