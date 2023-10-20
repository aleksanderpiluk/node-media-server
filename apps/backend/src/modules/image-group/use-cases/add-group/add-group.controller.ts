import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../../../../shared/core/base-controller.js';
import { AddGroupUseCase } from './add-group.use-case.js';
import { Guard } from '../../../../shared/core/guard.js';
import { ValidationError } from '../../../../shared/error/validation.error.js';

export class AddGroupController extends BaseController {
    constructor(private useCase: AddGroupUseCase) {
        super();
    }

    async execute(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { name } = this.parseBody(request);

            const response = await this.useCase.execute({
                name,
            });

            return this.ok(reply, response);
        } catch (err) {
            return this.handleError(reply, err);
        }
    }

    private parseBody(request: FastifyRequest) {
        if (!Guard.ensureObject(request.body))
            throw new ValidationError('Invalid request body type. Make sure request body is a proper JSON object.');

        return request.body;
    }
}
