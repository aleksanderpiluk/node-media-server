import { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../../../../shared/core/base-controller.js';
import { ImageStorageService } from '../../services/image-storage/image-storage.service.js';
import { AddImageDto } from './add-image.dto.js';
import { AddImageUseCase } from './add-image.use-case.js';
import { ImageBlob } from '../../domain/image-blob.js';
import { ValidationError } from '../../../../shared/error/validation.error.js';
import fastifyMultipart from '@fastify/multipart';

export class AddImageController extends BaseController {
    constructor(
        private imageStorageService: ImageStorageService,
        private useCase: AddImageUseCase
    ) {
        super();
    }

    async execute(request: FastifyRequest, reply: FastifyReply) {
        try {
            const body = await this.parseBody(request);
            const { id } = await this.createAndSaveBlob(body);

            const dto: AddImageDto = {
                blob: id,
                group: this.parseGroupField(body),
            };
            const response = await this.useCase.execute(dto);

            return this.ok(reply, response);
        } catch (err) {
            return this.handleError(reply, err);
        }
    }

    private async parseBody(request: FastifyRequest) {
        const body = await request.file();

        if (!body)
            throw new ValidationError('File not detected in request body.');

        if (body.fieldname !== 'file')
            throw new ValidationError(
                'Body field with file must be called `file`.'
            );

        return body;
    }

    private parseGroupField(body: fastifyMultipart.MultipartFile) {
        const field = body.fields.group;

        const isInvalid =
            !field || Array.isArray(field) || field.type !== 'field';
        if (isInvalid)
            throw new ValidationError('Body field `group` is invalid.');

        return field.value;
    }

    private async createAndSaveBlob(body: fastifyMultipart.MultipartFile) {
        const blob = ImageBlob.create(body);
        await this.imageStorageService.save(blob);

        return blob;
    }
}
