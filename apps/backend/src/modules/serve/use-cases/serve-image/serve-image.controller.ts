import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../../../../shared/core/base-controller.js';
import { ServeImageUseCase } from './serve-image.use-case.js';
import { ImageStorageService } from '../../../image/services/image-storage/image-storage.service.js';
import { ImageTransformerService } from '../../services/image-transformer/image-transformer.service.js';
import { AcceptImageFormat } from '../../domain/accept-image-format.js';

export class ServeImageController extends BaseController {
    constructor(
        private useCase: ServeImageUseCase,
        private storage: ImageStorageService,
        private transformer: ImageTransformerService
    ) {
        super();
    }

    async execute(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { imageId, variant } = this.parseParams(request);

            const { blob, variant: variantDto } = await this.useCase.execute({
                imageId,
                variant,
            });

            const format = AcceptImageFormat.create(request.headers.accept).format;

            const stream = await this.storage.get(blob);
            const transformed = await this.transformer.transform(stream, variantDto, format);

            return reply.status(200).header('Content-Type', format).send(transformed);
        } catch (err) {
            return this.handleError(reply, err);
        }
    }
}
