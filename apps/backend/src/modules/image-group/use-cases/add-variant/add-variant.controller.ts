import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../../../../shared/core/base-controller.js';
import { AddVariantUseCase } from './add-variant.use-case.js';
import { Guard } from '../../../../shared/core/guard.js';
import { ValidationError } from '../../../../shared/error/validation.error.js';

export class AddVariantController extends BaseController {
    constructor(private useCase: AddVariantUseCase) {
        super();
    }

    async execute(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { groupId: id } = this.parseParams(request);
            const { name, width, height, fit } = this.parseBody(request);

            const response = await this.useCase.execute({
                id,
                name,
                width,
                height,
                fit,
            });

            return this.ok(reply, response);
        } catch (err) {
            return this.handleError(reply, err);
        }
    }

    private parseBody(request: FastifyRequest) {
        if (!Guard.ensureObject(request.body)) {
            throw new ValidationError(
                'Invalid request body type. Make sure request body is a proper JSON object.'
            );
        }

        return request.body;
    }
}
